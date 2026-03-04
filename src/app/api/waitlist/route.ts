import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Add to Resend Audience (must be awaited — serverless functions exit on response)
  if (process.env.RESEND_AUDIENCE_ID) {
    try {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    } catch (err) {
      console.error("[waitlist] contacts.create error:", err);
    }
  }

  const [confirmResult, notifyResult] = await Promise.all([
    resend.emails.send({
      from: "SHIPSTAKE <waitlist@shipstake.trade>",
      to: email,
      replyTo: "syzy@posteo.net",
      subject: "You're on the SHIPSTAKE waitlist",
      html: `<p>We'll reach out when we're ready to onboard you.</p>`,
    }),
    resend.emails.send({
      from: "SHIPSTAKE Waitlist <waitlist@shipstake.trade>",
      to: "syzy@posteo.net",
      replyTo: email,
      subject: "New waitlist signup — SHIPSTAKE",
      text: `New waitlist signup: ${email}`,
    }),
  ]);

  if (confirmResult.error && notifyResult.error) {
    console.error("[waitlist] Both emails failed:", confirmResult.error, notifyResult.error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  if (confirmResult.error) console.error("[waitlist] Confirmation email failed:", confirmResult.error);
  if (notifyResult.error) console.error("[waitlist] Notification email failed:", notifyResult.error);

  return NextResponse.json({ ok: true });
}
