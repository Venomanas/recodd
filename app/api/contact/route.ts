import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message, profileId, profileType } = body;

    if (!email || !message || !profileId || !profileType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Recodd <anassayyed000@gmail.com>",
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: email,
      subject: `New ${profileType} contact request`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Request</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Profile:</strong> ${profileType} (ID: ${profileId})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
