"use client";

const TECH = [
  {
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
    url: "https://solana.com",
  },
  {
    name: "Anchor",
    logo: "/brand/anchor.svg",
    url: "https://anchor-lang.com",
  },
  {
    name: "Privy",
    logo: "/brand/privy.svg",
    url: "https://privy.io",
  },
  {
    name: "Helius",
    logo: "https://helius.dev/favicon.ico",
    url: "https://helius.dev",
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png",
    url: "https://vercel.com",
  },
];

export default function BuiltOn() {
  return (
    <section>
      <div className="relative mx-auto container max-w-[var(--container-max-width)]">
        <div className="relative border-x border-t py-8 overflow-hidden bg-[#0a0a0c]">
          {/* Dot grid overlay matching site aesthetic */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #00C896 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            {/* Label */}
            <p className="text-center font-mono text-[0.6rem] tracking-[0.3em] text-slate-600 uppercase mb-7">
              Built on
            </p>

            {/* Logos row */}
            <div className="flex items-center justify-center gap-12 flex-wrap px-6">
              {TECH.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2.5"
                >
                  <div className="h-7 w-16 flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="max-h-7 w-auto grayscale opacity-30
                                 group-hover:grayscale-0 group-hover:opacity-90
                                 transition-all duration-300 ease-out"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="font-mono text-xs text-[#00C896] tracking-wider">${tech.name}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase
                                   text-slate-700 group-hover:text-[#00C896]
                                   transition-colors duration-300">
                    {tech.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
