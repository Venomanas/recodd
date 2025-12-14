import { freelancers } from "@/lib/recodd/mockData";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const profile = freelancers.find(f => f.id === Number(params.id));

  if (!profile) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }
  return NextResponse.json(profile);
}
