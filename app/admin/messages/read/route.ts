import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase
    .from("contact_requests")
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
