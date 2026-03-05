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
      replyTo: "waitlist@shipstake.trade",
      subject: `New builder on the waitlist`,
      headers: {
        "List-Unsubscribe": "<mailto:waitlist@shipstake.trade?subject=unsubscribe>",
      },
      html: [
        `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">`,
        `<h2 style="margin:0 0 12px">New builder signed up</h2>`,
        `<p style="margin:0 0 8px">Someone just joined the SHIPSTAKE waitlist:</p>`,
        `<p style="margin:0 0 16px;padding:12px;background:#f4f4f5;border-radius:6px">`,
        `<a href="mailto:${email}" style="color:#0d9488;text-decoration:none">${email}</a></p>`,
        `<hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0"/>`,
        `<p style="margin:0;font-size:12px;color:#71717a">`,
        `SHIPSTAKE waitlist notification &middot; <a href="https://shipstake.trade" style="color:#71717a">shipstake.trade</a></p>`,
        `</div>`,
      ].join("\n"),
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
