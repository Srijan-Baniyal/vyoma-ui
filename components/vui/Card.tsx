"use client";

import Image from "next/image";
import GIRL from "@/public/BG.jpg";

export default function Card() {
  return (
    <section
      className="relative w-full max-w-xl mx-auto h-[800px] overflow-hidden rounded-3xl"
      aria-label="Card: Ideas Made Visuals"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={GIRL}
          alt="Abstract background with a girl, used for card visual design."
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <article
        className="absolute inset-x-24 inset-y-24 rounded-2xl overflow-hidden border-1 border-gray-500 bg-white/5 backdrop-blur-md"
        role="region"
        aria-labelledby="card-title"
      >
        <Image
          src={GIRL}
          alt="Card background visual, blurred for effect."
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-1 p-2 flex flex-col justify-between">
          <header>
            <span className="text-white/80 text-sm font-medium tracking-wide" id="card-category">
              Animations / Design / Branding
            </span>
          </header>
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-xl z-0 blur-2xl shadow-2xl shadow-black/30" aria-hidden="true" />
            <div className="relative z-10 p-4">
              <h3 className="text-white text-xl font-bold leading-tight text-shadow-md" id="card-title">
                Ideas Made Visuals
              </h3>
              <p className="text-white/90 text-sm leading-relaxed text-shadow-sm">
                We help brands break the mold with visuals that do{' '}
                <span className="text-orange-400">more than look good</span> —
                they tell <span className="text-orange-400">stories, spark</span>{' '}
                interest, and drive action.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
