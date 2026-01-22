"use client";

import Link from "next/link";

export default function BeautifulFooterShowcase() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-rose-400 via-fuchsia-500 to-slate-900">
      {/* Amplified artistic overlay gradients for maximum depth */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-purple-900/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-pink-500/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-bl from-amber-300/30 via-transparent to-purple-900/40" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-rose-500/25 via-transparent to-cyan-400/15" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-fuchsia-600/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent" />

      {/* Glaring light effects */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-radial from-pink-400/30 via-pink-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-radial from-amber-300/25 via-amber-300/8 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-72 w-72 rounded-full bg-radial from-violet-500/20 via-violet-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-radial from-cyan-400/15 via-cyan-400/5 to-transparent blur-3xl" />

      {/* Additional glamour layers */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tl from-rose-600/20 via-transparent to-indigo-500/20" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-amber-500/10 to-purple-800/25" />

      {/* Artistic noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,215,0,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(236,72,153,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(139,69,19,0.05) 0%, transparent 50%)`,
        }}
      />

      {/* Large clean background text with artistic glow */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex items-end justify-center">
        <div
          className="select-none font-black text-[8rem] xs:text-[10rem] leading-none tracking-tight sm:text-[15rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem]"
          style={{
            transform: "translateY(15%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,215,0,0.1) 30%, rgba(255,255,255,0.08) 70%, rgba(236,72,153,0.12) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 80px rgba(255,215,0,0.3)) drop-shadow(0 0 120px rgba(236,72,153,0.2))",
          }}
        >
          vyoma
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex min-h-screen flex-col p-10 sm:p-8 md:p-12">
        {/* Header */}
        <header className="mb-8 flex items-start justify-between sm:mb-12">
          <div
            className="font-light text-xl tracking-wide sm:text-2xl"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,215,0,0.4))",
            }}
          >
            vyoma ui
          </div>
        </header>

        {/* Main content area */}
        <main className="flex flex-1 flex-col justify-between">
          {/* Hero section - aligned text block */}
          <section className="mb-8 flex justify-end sm:mb-16">
            <div className="max-w-sm text-left sm:max-w-lg">
              <Link
                className="mb-3 block font-medium text-amber-200/90 text-xs uppercase tracking-wider transition-all duration-300 hover:text-amber-100 sm:mb-4 sm:text-sm"
                href="#contact"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))",
                }}
              >
                Contact us
              </Link>
              <h1 className="font-light text-2xl leading-tight sm:text-4xl lg:text-5xl">
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.3))",
                  }}
                >
                  Partner with a creative team{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  that moves at your speed — and always delivers beyond the
                  brief.
                </span>
              </h1>
            </div>
          </section>

          {/* Middle section - Contact info and navigation on same line */}
          <section className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end sm:gap-8">
            {/* Contact info - left side */}
            <address className="order-2 not-italic sm:order-1">
              <p
                className="mb-1 text-xs uppercase tracking-wider sm:mb-2 sm:text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,215,0,0.8) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Have an idea? Say Hi!
              </p>
              <a
                className="font-light text-lg transition-all duration-300 hover:scale-105 sm:text-xl"
                href="mailto:Hi@vyomaui.com"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,215,0,0.4))",
                }}
              >
                Hi@vyomaui.com
              </a>
            </address>

            {/* Navigation - right side */}
            <nav className="order-1 flex flex-wrap gap-4 sm:order-2 sm:gap-6 lg:gap-12">
              {["Works", "Services", "Process", "Articles"].map((item) => (
                <Link
                  className="font-light text-lg transition-all duration-300 hover:scale-105 sm:text-xl"
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "drop-shadow(0 0 25px rgba(255,215,0,0.6)) drop-shadow(0 0 35px rgba(236,72,153,0.4))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter =
                      "drop-shadow(0 0 15px rgba(255,255,255,0.2))";
                  }}
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))",
                  }}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center sm:text-sm">
          <p
            className="font-light"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Copyright © 2025 vyoma ui
          </p>
          <nav className="flex gap-4 sm:gap-8">
            <Link
              className="font-light transition-all duration-300 hover:scale-105"
              href="#privacy"
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 15px rgba(255,215,0,0.5))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Privacy & Policy
            </Link>
            <Link
              className="font-light transition-all duration-300 hover:scale-105"
              href="#terms"
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 15px rgba(255,215,0,0.5))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Terms & Conditions
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
