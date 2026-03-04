import { BorderText } from "@/components/ui/border-number";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="container max-w-[var(--container-max-width)] mx-auto px-4 pt-12 pb-4">
      {/* 4-column grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="mb-3 inline-block">
            <img
              src="/brand/shipstake-mark.svg"
              alt="SHIPSTAKE"
              style={{ height: "36px", width: "36px" }}
            />
          </Link>
          <p className="text-sm text-muted-foreground mb-1">{siteConfig.footer.tagline}</p>
          <p className="text-xs text-muted-foreground/60 italic">{siteConfig.footer.subTagline}</p>
        </div>

        {/* Cols 2-4: Link groups */}
        {siteConfig.footer.columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
              {col.heading}
            </h3>
            {col.heading === "Ecosystem" ? (
              <p className="text-xs text-muted-foreground/50 leading-relaxed">
                Your score is composable infrastructure.<br />
                Lending · DAO grants · Job boards · Coming.
              </p>
            ) : (
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
                {"teaser" in col && col.teaser && col.teaser.map((item: string) => (
                  <li key={item} className="text-xs text-muted-foreground/50">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50 mb-4">
        {/* Left: logo + tagline */}
        <div className="flex items-center gap-2">
          <img
            src="/brand/shipstake-mark.svg"
            alt=""
            className="shrink-0"
            style={{ height: "22px", width: "22px" }}
          />
          <span className="text-sm text-muted-foreground/60">
            {siteConfig.footer.tagline}
          </span>
        </div>

        {/* Center: social links */}
        <div className="flex gap-x-3">
          {siteConfig.footer.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              aria-label={link.label}
              rel="noopener noreferrer"
              target="_blank"
              className="flex h-5 w-5 items-center justify-center text-muted-foreground/50 transition-all duration-100 ease-linear hover:text-foreground"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right: network */}
        <span className="text-xs text-muted-foreground/40 font-mono">
          Solana · Devnet → Mainnet
        </span>
      </div>

      {/* Geo note */}
      <p className="text-[10px] text-muted-foreground/40 leading-relaxed max-w-lg mb-4">
        {siteConfig.footer.geoNote}
      </p>

      <BorderText
        text={siteConfig.footer.brandText}
        className="text-[clamp(3rem,15vw,10rem)] overflow-hidden font-mono tracking-tighter font-medium"
      />
    </footer>
  );
}
