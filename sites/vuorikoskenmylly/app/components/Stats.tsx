"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Cookieless visitor stats through the huts.fi analytics worker: no cookies, no personal data.
// Works like huts.fi's own counter: a page counts once the visitor scrolls, taps, clicks or types
// (so bots and accidental opens stay out), and the time spent on a page is sent when they move on
// or leave. Only the live domain sends; previews and localhost stay out of the numbers.
const URL_SITE = "https://stats.huts.fi/e/site";
const MAX_PAGE_MS = 30 * 60 * 1000;

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon?.(URL_SITE, new Blob([body], { type: "text/plain" }))) return;
    fetch(URL_SITE, { method: "POST", body, keepalive: true, headers: { "content-type": "text/plain" } }).catch(() => {});
  } catch {}
}

function device() {
  return window.innerWidth >= 768 ? "desktop" : "mobile";
}

function liveHost() {
  const h = location.hostname;
  return /\.[a-z]{2,}$/.test(h) && !h.endsWith("hutsnordic.fi") && !h.endsWith(".vercel.app");
}

export function Stats({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const engaged = useRef(false);
  const firedPath = useRef<string | null>(null);
  const previousPath = useRef<string | null>(null);
  const enteredAt = useRef(0);
  const exitSentFor = useRef<string | null>(null);
  const navigating = useRef(false);

  // Engagement: any scroll, tap, click or key press.
  useEffect(() => {
    if (!enabled) return;
    const mark = () => {
      engaged.current = true;
    };
    const events = ["scroll", "pointerdown", "touchstart", "keydown", "wheel"] as const;
    events.forEach((e) => window.addEventListener(e, mark, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, mark));
  }, [enabled]);

  // One pageview per page, after engagement.
  useEffect(() => {
    if (!enabled || !liveHost()) return;
    navigating.current = false;
    firedPath.current = null;
    const fire = () => {
      if (firedPath.current === pathname || document.visibilityState === "hidden") return;
      const now = Date.now();
      const prev = previousPath.current;
      let referrerHost = "";
      if (prev == null) {
        try {
          referrerHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
        } catch {}
      }
      send({
        path: pathname,
        referrerHost,
        device: device(),
        ...(prev != null ? { timeOnPreviousMs: Math.min(now - enteredAt.current, MAX_PAGE_MS) } : {}),
      });
      firedPath.current = pathname;
      exitSentFor.current = null;
      previousPath.current = pathname;
      enteredAt.current = now;
      clearInterval(timer);
    };
    const timer = setInterval(() => {
      if (engaged.current) fire();
    }, 250);
    return () => {
      navigating.current = true;
      clearInterval(timer);
    };
  }, [enabled, pathname]);

  // Time on the last page, when the tab is hidden or closed.
  useEffect(() => {
    if (!enabled) return;
    const sendExit = () => {
      const path = firedPath.current;
      if (!path || navigating.current || exitSentFor.current === path) return;
      exitSentFor.current = path;
      send({
        path,
        exit: true,
        timeOnPageMs: Math.min(Math.max(0, Date.now() - enteredAt.current), MAX_PAGE_MS),
        device: device(),
      });
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") sendExit();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", sendExit);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", sendExit);
    };
  }, [enabled]);

  return null;
}
