"use client";

import { useState } from "react";

const embed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;

/**
 * A photo with a play button. Tapping it loads the owners' YouTube video in place.
 * YouTube Shorts can't play as a clean background (YouTube draws its logo and buttons over them),
 * so with the original file the hero becomes a plain muted <video> instead (see videos.hero.file).
 */
export function TapVideo({ id, title, poster, alt, label, className }: { id: string; title: string; poster: string; alt: string; label?: string; className: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className={className}>
        <iframe src={embed(id)} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      </div>
    );
  }
  return (
    <button type="button" className={className} onClick={() => setOn(true)} aria-label={`Toista video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} />
      {label ? (
        <span className="play">
          <span className="dot" aria-hidden />
          {label}
        </span>
      ) : (
        <span className="dot dot-big" aria-hidden />
      )}
    </button>
  );
}
