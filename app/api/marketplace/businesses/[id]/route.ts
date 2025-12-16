import { NextResponse } from "next/server";
import { businesses } from "@/lib/recodd/mockData";

export async function GET(
  _req: Request, 
  context : { params: Promise <{ id: string }> }
) {

  const {id} = await context.params;

  const numericId = Number(id);
  const profile = businesses.find(b => b.id === numericId);

  if (!profile) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
