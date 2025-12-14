import { freelancers } from "@/lib/recodd/mockData";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        data: freelancers,
        count: freelancers.length,
    });
}