import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, profileId, profileType } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log("CONTACT REQUEST: ", {
      name,
      email,
      message,
      profileId,
      profileType,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong " },
      { status: 500 }
    );
  }
}
