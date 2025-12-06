import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json().catch(() => null);

    const actionReference = body?.actionReference ?? "UNKNOWN";
    const actionType = body?.actionType ?? "UNKNOWN";

    const baseScores = {
        TREE_PLANT: 40,
        RECYCLE_SMART_BIN: 18,
        WATER_SAVE: 20,
        ACTIVE_TRANSPORT: 30,
    };

    const estimatedGbits = baseScores[actionType] ?? 10;

    const message =
        "Demo-only response. In production this endpoint would validate the request, apply your scoring rules and persist the eco-action before awarding Gbits.";

    return NextResponse.json({
        data: {
            actionReference,
            actionType,
            estimatedGbits,
            message,
        },
    });
}
