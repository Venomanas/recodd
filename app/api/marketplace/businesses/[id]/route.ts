import { NextResponse } from "next/server";
import { businesses } from "@/lib/recodd/mockData";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const profile = businesses.find(b => b.id === Number(params.id));

  if (!profile) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
