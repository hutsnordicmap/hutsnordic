"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useSyncExternalStore } from "react";
import { heroPoster, heroVideo, type Locale } from "@/app/content";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Full-screen silent loop with nothing written over it: Saimaa from the air, the villa from above,
 * the sauna and the fire. Cut from the owner's own 1080p video. People who ask for less motion get the photo.
 */
export function VideoHero({ locale, next }: { locale: Locale; next: string }) {
  const showVideo = useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia(REDUCED).matches,
    () => false,
  );
  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-lake-deep">
      <Image src={heroPoster.src} alt={heroPoster[locale]} fill priority sizes="100vw" className="object-cover" />
      {showVideo ? (
        <video
          src={heroVideo}
          poster={heroPoster.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <a
        href={next}
        aria-label={locale === "fi" ? "Alas" : "Scroll down"}
        className="absolute bottom-6 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-sm hover:bg-white/10"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
