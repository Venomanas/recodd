// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
});

const escapeHtml = (value: unknown) => {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    const { success } = await ratelimit.limit(`contact:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, message, profileId, profileType } = body;

    if (!email || !message || !profileId || !profileType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get environment variables - check both naming conventions
    const supabaseUrl = process.env.SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    console.log("🔍 Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasResendKey: !!resendKey,
      hasReceiverEmail: !!receiverEmail,
    });

    // Check Supabase config
    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Supabase environment variables not found!");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to Database
    console.log("💾 Attempting database insert...");
    const { data: dbData, error: dbError } = await supabase
      .from("contact_requests")
      .insert({
        sender_email: email,
        message: message,
        profile_id: Number(profileId),
        profile_type: profileType,
      })
      .select();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return NextResponse.json(
        { error: "Database error: " + dbError.message },
        { status: 500 }
      );
    }

    console.log("✅ Saved to database:", dbData);

    // Send Email (optional)
    if (resendKey && receiverEmail) {
      try {
        console.log("📧 Sending email...");
        const resend = new Resend(resendKey);
        const resendFrom =
          process.env.RESEND_FROM_EMAIL || "Recodd <noreply@recodd.com>";

        await resend.emails.send({
          from: resendFrom,
          to: receiverEmail,
          replyTo: email,
          subject: `New ${escapeHtml(String(profileType))} contact request`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>New Contact Request</h2>
              <p><strong>From:</strong> ${escapeHtml(email)}</p>
              <p><strong>Profile:</strong> ${escapeHtml(
                profileType
              )} (ID: ${escapeHtml(profileId)})</p>
              <hr style="margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #4F46E5;">${escapeHtml(
                message
              )}</p>
            </div>
          `,
        });
        console.log("✅ Email sent successfully");
      } catch (emailError) {
        console.error("⚠️ Email failed (but DB saved):", emailError);
      }
    } else {
      console.log("⚠️ Email service not configured, skipping...");
    }

    return NextResponse.json({
      success: true,
      message: "Contact request submitted successfully",
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return NextResponse.json(
      {
        error:
          "Server error: " +
          (error instanceof Error ? error.message : "Unknown"),
      },
      { status: 500 }
    );
  }
}
