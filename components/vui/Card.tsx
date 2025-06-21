"use client";

import Image, { StaticImageData } from "next/image";
import GIRL from "@/public/BG.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type VuiCardProps = {
  imageSrc: StaticImageData | string;
  imageAlt: string;
  category?: string;
  title?: string;
  description?: React.ReactNode;
};

function VuiCard({
  imageSrc,
  imageAlt,
  category = "Animations / Design / Branding",
  title = "Ideas Made Visuals",
  description = (
    <>
      We help brands break the mold with visuals that do{" "}
      <span className="text-orange-400">more than look good</span> — they tell{" "}
      <span className="text-orange-400">stories, spark</span> interest, and
      drive action.
    </>
  ),
}: VuiCardProps) {
  return (
    <Card className="overflow-hidden border-1 border-gray-500 bg-white/5 backdrop-blur-md w-full h-full">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-1 p-2 flex flex-col justify-between h-full">
        <CardHeader>
          <CardDescription className="text-white/80 text-sm font-medium tracking-wide">
            {category}
          </CardDescription>
        </CardHeader>
        <div className="relative">
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-xl z-0 blur-2xl shadow-2xl shadow-black/30"
            aria-hidden="true"
          />
          <CardContent className="relative z-10 p-4">
            <CardTitle className="text-white text-xl font-bold leading-tight text-shadow-md">
              {title}
            </CardTitle>
            <p className="text-white/90 text-sm leading-relaxed text-shadow-sm mt-2">
              {description}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default function CardShowcase() {
  return (
    <section
      className="relative w-full max-w-xl mx-auto h-[500px] overflow-hidden rounded-3xl"
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
      <div className="absolute inset-24">
        <VuiCard
          imageSrc={GIRL}
          imageAlt="Card background visual, blurred for effect."
        />
      </div>
    </section>
  );
}
