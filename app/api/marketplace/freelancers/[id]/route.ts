import { NextResponse } from "next/server";
import { freelancers } from "@/lib/recodd/mockData";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const profile = freelancers.find(f => f.id === id);

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
