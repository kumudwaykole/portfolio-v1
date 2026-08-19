import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Header } from "./components/header/index";
import { SmoothScroll } from "./components/smooth-scroll";
import "./globals.css";

/**
 * Cal.com element-click embed: initializes the "15min" namespace so any
 * element with data-cal-link="kumud-waykole/15min" opens the scheduler
 * overlay on click (see Header/Footer "Let's talk" triggers).
 */
const CAL_EMBED_SCRIPT = `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "15min", {origin:"https://app.cal.com"});
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#AD46FF"},"dark":{"cal-brand":"#AD46FF"}},"hideEventTypeDetails":false,"layout":"month_view"});
`;

/**
 * One typeface for the whole site. Geist carries both the large display
 * headings and the small uppercase labels, so nothing else needs loading —
 * see the font tokens in globals.css, which all resolve back to this.
 */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio and selected work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geist.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        <Script id="cal-embed" strategy="afterInteractive">
          {CAL_EMBED_SCRIPT}
        </Script>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
