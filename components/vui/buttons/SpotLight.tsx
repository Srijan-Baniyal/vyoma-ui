"use client";

export function SpotlightButton({ text = "Hover me" }) {
  return (
    <div style={{ transform: "none" }}>
      <button
        className="group relative inline-block cursor-pointer rounded-xl bg-zinc-900 p-px font-semibold text-white leading-6 no-underline shadow-2xl shadow-zinc-900"
        type="button"
      >
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 rounded-xl bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {" "}
          </span>{" "}
        </span>
        <div className="relative z-10 flex items-center space-x-2 rounded-xl bg-gray-950/50 px-6 py-3 ring-1 ring-white/10">
          <span>{text}</span>
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-fuchsia-400/0 via-gray-400/90 to-fuchsia-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
    </div>
  );
}
