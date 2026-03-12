import { NextResponse } from 'next/server';
import { syncLeadWithLsq } from '@/utils/lsq';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, mobile, workExp, source, sourceUrl } = body;

        if (!mobile || !fullName) {
            return NextResponse.json(
                { error: 'Full Name and Mobile are required' },
                { status: 400 }
            );
        }

        // 1. Store in Database using Prisma
        try {
            await prisma.lead.upsert({
                where: { mobile: mobile },
                update: {
                    fullName,
                    email,
                    workExp,
                    source,
                },
                create: {
                    fullName,
                    email,
                    mobile,
                    workExp,
                    source,
                },
            });
        } catch (dbError) {
            console.error('Database Error:', dbError);
            // We continue to LSQ even if DB fails, or we could handle it differently
        }

        // 2. Sync with LeadSquared (use sourceUrl for LSQ Source attribute; source is CTA label for DB)
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
