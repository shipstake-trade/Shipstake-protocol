import { siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title") || siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0C0F",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 200, 150, 0.08) 0%, transparent 70%)",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00C896"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 4L7 20" />
              <path d="M11 4L11 20" />
              <path d="M15 4L19 20" />
            </svg>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              SHIPSTAKE
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "56px",
              fontWeight: "700",
              textAlign: "center",
              color: "#fafafa",
              width: "70%",
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
            }}
          >
            {postTitle}
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              fontWeight: "400",
              marginTop: "24px",
              color: "#71717a",
            }}
          >
            Accountability Protocol on Solana
          </div>

          {/* Protocol version */}
          <div
            style={{
              display: "flex",
              fontSize: "12px",
              fontWeight: "400",
              marginTop: "32px",
              color: "#3f3f46",
              fontFamily: "monospace",
            }}
          >
            SHIPSTAKE v0.3 | Solana Devnet | Pre-Audit
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
