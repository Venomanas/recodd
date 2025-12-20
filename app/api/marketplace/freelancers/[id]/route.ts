import { NextResponse } from "next/server";
import { freelancers } from "@/lib/recodd/mockData";

export async function GET(
  _req: Request,
  //`params` is a Promise and must be unwrapped with await or React.use()
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const numericId = Number(id);
  const profile = freelancers.find(f => f.id === numericId);

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
