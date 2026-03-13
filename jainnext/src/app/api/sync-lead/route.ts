import { NextResponse } from 'next/server';
import { syncLeadWithLsq } from '@/utils/lsq';
import pool from '@/utils/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, mobile, workExp, source, sourceUrl, recaptchaToken } = body;

        // Verify reCAPTCHA
        if (process.env.GOOGLE_RECAPTCHE_SECRET) {
            try {
                const reResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `secret=${process.env.GOOGLE_RECAPTCHE_SECRET}&response=${recaptchaToken}`,
                });
                const reData = await reResponse.json();
                if (!reData.success || reData.score < 0.5) {
                    console.error('reCAPTCHA failed:', reData);
                    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
                }
            } catch (reError) {
                console.error('reCAPTCHA verify error:', reError);
                // Optionally proceed if reCAPTCHA verification fails due to network error
            }
        }

        if (!mobile || !fullName) {
            return NextResponse.json(
                { error: 'Full Name and Mobile are required' },
                { status: 400 }
            );
        }

        // 1. Store in Database using Raw SQL (PostgreSQL)
        try {
            const query = `
                INSERT INTO "Lead" ("fullName", "email", "mobile", "workExp", "source", "updatedAt")
                VALUES ($1, $2, $3, $4, $5, NOW())
                ON CONFLICT ("mobile") 
                DO UPDATE SET 
                    "fullName" = EXCLUDED."fullName",
                    "email" = EXCLUDED."email",
                    "workExp" = EXCLUDED."workExp",
                    "source" = EXCLUDED."source",
                    "updatedAt" = NOW();
            `;
            const values = [fullName, email, mobile, workExp, source];
            await pool.query(query, values);
        } catch (dbError) {
            console.error('Database Error:', dbError);
        }

        // 2. Sync with LeadSquared
        const result = await syncLeadWithLsq({
            fullName,
            email,
            mobile,
            workExp,
            source,
            sourceUrl: sourceUrl || null,
        });

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
