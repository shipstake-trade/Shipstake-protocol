import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getWaitlistCount(): Promise<number> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId || !process.env.RESEND_API_KEY) return 0;

  try {
    const result = await resend.contacts.list({ audienceId });
    return result.data?.data?.length ?? 0;
  } catch {
    return 0;
  }
}
