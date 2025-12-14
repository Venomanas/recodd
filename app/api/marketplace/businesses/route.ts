import { businesses } from "@/lib/recodd/mockData";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        data: businesses,
        count: businesses.length,
    });
}

//UI no longer owns data You can swap mockData → DB later without touching UI

