"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Cookieless visitor stats through the huts.fi analytics worker (one pageview per page, no cookies,
// no personal data). Only the live domain sends; previews and localhost stay out of the numbers.
export function Stats({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!enabled || !/\.[a-z]{2,}$/.test(location.hostname) || location.hostname.endsWith("hutsnordic.fi")) return;
    let referrerHost = "";
    try {
      referrerHost = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {}
    const body = JSON.stringify({
      path: pathname,
      referrerHost,
      device: window.innerWidth >= 768 ? "desktop" : "mobile",
    });
    const url = "https://stats.huts.fi/e/site";
    if (!navigator.sendBeacon?.(url, new Blob([body], { type: "text/plain" }))) {
      fetch(url, { method: "POST", body, keepalive: true, headers: { "content-type": "text/plain" } }).catch(() => {});
    }
  }, [enabled, pathname]);
  return null;
}
