"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { business, type Photo, type Locale, ui } from "@/app/content";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Full-screen intro video with nothing written over it (Jeff: like harmala.fi).
 * For now it plays the owner's own YouTube video, muted and looping, scaled to cover the screen.
 * The aerial photo stays on top until the video has had time to start, which hides YouTube's
 * own title flash. When Mika sends the original file, swap the iframe for a plain <video>.
 */
export function VideoHero({ poster, locale }: { poster: Photo; locale: Locale }) {
  const [ready, setReady] = useState(false);
  // Respect people who ask their device for less motion: they get the photo only. The server renders the photo.
  const showVideo = useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia(REDUCED).matches,
    () => false,
  );

  const id = business.youtube;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&start=${business.youtubeStart}`;

  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-forest-deep">
      {showVideo ? (
        <iframe
          src={src}
          title="Elijärven Mökkilomat"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          aria-hidden
          onLoad={() => setTimeout(() => setReady(true), 2800)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100svh,56.25vw)] w-[max(100vw,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      ) : null}
      <Image
        src={poster.lg}
        alt={poster[locale]}
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-[1500ms] ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <a
        href="#mokit"
        aria-label={ui[locale].scroll}
        className="absolute bottom-6 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm hover:bg-white/10"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
