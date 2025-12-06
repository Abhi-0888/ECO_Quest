import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json().catch(() => null);

    if (!body?.email || !body?.message) {
        return NextResponse.json(
            { error: "Missing email or message" },
            { status: 400 }
        );
    }

    // In a real deployment this is where you would:
    // - Send the message to a support inbox or ticketing system
    // - Store context (organisation, use-case) in your CRM
    // - Trigger internal workflows for pilot requests

    return NextResponse.json({
        ok: true,
        received: {
            name: body.name ?? null,
            email: body.email,
            org: body.org ?? null,
        },
        message:
            "Mock-only endpoint: replace this with your own email / ticket integration before going live.",
    });
}
