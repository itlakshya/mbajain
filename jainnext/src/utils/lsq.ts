
type LeadAttribute = { Attribute: string; Value: string };
type LeadRecord = Record<string, string | null>;

const getEnv = () => ({
    host: process.env.LSQ_HOST,
    accessKey: process.env.LSQ_ACCESS_KEY,
    secretKey: process.env.LSQ_SECRET_KEY,
});

const normalizePhoneForLsq = (value?: string | null) => {
    if (!value) return null;
    const digits = String(value).replace(/\D/g, "");
    if (!digits) return null;
    if (digits.length > 10) {
        return digits.slice(-10);
    }
    return digits;
};

const normalizeHost = (host: string) => {
    const trimmed = host.trim();
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const withoutTrailing = withScheme.replace(/\/+$/, "");
    return withoutTrailing.replace(/\/v2$/i, "");
};

/**
 * Lead.Capture without LeadUpdateBehavior so existing leads are updated with new values
 * (e.g. new email for same phone). See:
 * https://apidocs.leadsquared.com/capture-lead — UpdateOnlyEmptyFields only fills blanks.
 */
const buildLeadCaptureUrl = (host: string) => {
    const base = normalizeHost(host);
    return `${base}/v2/LeadManagement.svc/Lead.Capture`;
};

export const sendLeadSquaredCapture = async (
    attributes: LeadAttribute[],
    searchBy: "Phone" | "EmailAddress" = "Phone"
) => {
    const { host, accessKey, secretKey } = getEnv();
    if (process.env.ENABLE_LSQ_SYNC !== "true" || !host || !accessKey || !secretKey) {
        return;
    }

    const url = buildLeadCaptureUrl(host);
    const payload = [...attributes, { Attribute: "SearchBy", Value: searchBy }];
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-LSQ-AccessKey": accessKey,
                "x-LSQ-SecretKey": secretKey
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`LeadSquared capture failed (${res.status}): ${text}`);
        }
        return await res.json();
    } finally {
        clearTimeout(timeout);
    }
};

export const fetchLeadByPhone = async (phone: string): Promise<LeadRecord | null> => {
    const { host, accessKey, secretKey } = getEnv();
    if (process.env.ENABLE_LSQ_SYNC !== "true" || !host || !accessKey || !secretKey) return null;

    const base = normalizeHost(host);
    const url = new URL(`${base}/v2/LeadManagement.svc/RetrieveLeadByPhoneNumber`);
    url.searchParams.set("accessKey", accessKey);
    url.searchParams.set("secretKey", secretKey);
    url.searchParams.set("phone", phone);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            signal: controller.signal
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`LeadSquared retrieve failed (${res.status}): ${text}`);
        }

        const data = (await res.json()) as LeadRecord[];
        if (!Array.isArray(data) || data.length === 0) return null;
        return data[0] || null;
    } finally {
        clearTimeout(timeout);
    }
};

const extractDomain = (url: string) => {
    try {
        const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
        return domain.replace('www.', '');
    } catch {
        return url;
    }
};

export const syncLeadWithLsq = async (params: {
    fullName: string;
    email: string;
    mobile: string;
    workExp: string;
    source: string;
    sourceUrl?: string | null;
}) => {
    const phone = normalizePhoneForLsq(params.mobile);
    if (!phone) throw new Error("Invalid phone number");

    const name = (params.fullName || "").trim();
    const [firstName, ...rest] = name.split(/\s+/);
    const lastName = rest.join(" ").trim();

    const conversionUrl = (params.sourceUrl || "").trim();

    const attributes: LeadAttribute[] = [
        { Attribute: "FirstName", Value: firstName || "" },
        { Attribute: "LastName", Value: lastName || "" },
        { Attribute: "Phone", Value: phone },
        { Attribute: "EmailAddress", Value: params.email || "" },
        { Attribute: "mx_Work_Experience", Value: params.workExp || "" },
        { Attribute: "mx_Conversion_Ref_URL", Value: conversionUrl }
    ].filter(attr => attr.Value !== "");

    if (process.env.ENABLE_LSQ_SYNC !== "true") {
        return;
    }

    try {
        await sendLeadSquaredCapture(attributes, "Phone");
        return { status: "processed" };
    } catch (err) {
        console.error("LeadSquared Sync Error:", err);
        throw err;
    }
};
