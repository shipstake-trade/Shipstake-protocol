import { NextResponse } from "next/server";
import { getWaitlistCount } from "@/lib/resend";

export const revalidate = 300; // cache 5 min

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}
