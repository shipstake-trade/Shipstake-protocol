import { Icons } from "@/components/icons";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="container max-w-[var(--container-max-width)] mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50 pt-6">
        {/* Logo + domain */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/brand/shipstake-mark.svg"
            alt="SHIPSTAKE"
            style={{ height: "24px", width: "24px" }}
          />
          <span className="font-mono text-sm text-muted-foreground">shipstake.trade</span>
        </Link>

        {/* X link */}
        <a
          href="https://x.com/shipstake"
          aria-label="SHIPSTAKE on X"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center justify-center h-5 w-5 text-muted-foreground/50 hover:text-foreground transition-colors duration-100"
        >
          <Icons.twitter className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
