import { cn } from "@/lib/utils";
import { ALL_SKILLS, JOB_TITLES, jsonLd, PERSON_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "@/lib/seo";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Header } from "./components/header/index";
import { SmoothScroll } from "./components/smooth-scroll";
import "./globals.css";

const CAL_EMBED_SCRIPT = `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "15min", {origin:"https://app.cal.com"});
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#AD46FF"},"dark":{"cal-brand":"#AD46FF"}},"hideEventTypeDetails":false,"layout":"month_view"});
`;

const franie = localFont({
  src: [
    {
      path: "../public/fonts/Franie-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Franie-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Franie-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const TITLE_DEFAULT =
  "Kumud Waykole | Full Stack Software Developer — React, Next.js & Node.js";
const DESCRIPTION =
  "Kumud Waykole is a Full Stack Software Developer specializing in React, Next.js, Node.js and TypeScript — building scalable, secure, high-performance web applications from system design to production deployment.";
const OG_IMAGE = {
  url: "/images/open_graph.webp",
  width: 2048,
  height: 1143,
  alt: "Kumud Waykole — Full Stack Developer Portfolio",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Full Stack Developer",
    "Full Stack Software Developer",
    "MERN Stack Developer",
    "Full Stack Web Developer",
    "React Developer",
    "React.js Developer",
    "Next.js Developer",
    "Next.js Full Stack Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Software Developer",
    "Software Engineer",
    "Full Stack Engineer",
    "Backend Engineer",
    "Prisma",
    "Tailwind CSS",
    "Express.js",
    "Web Application Developer",
    "REST API Development",
    "System Design",
    "Software Architecture",
    "Scalable Web Applications",
    "Clean Architecture",
    "Microservices",
    "PostgreSQL",
    "Redis",
    "Docker",
    "CI/CD",
    "Database Optimization",
    "Performance Optimization",
    "Server Components",
    "Full Stack Developer Portfolio",
    "Kumud Waykole",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Full Stack Software Developer",
      alternateName: [...JOB_TITLES],
      description: DESCRIPTION,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      email: "mailto:kumudwaykole1@gmail.com",
      worksFor: { "@type": "Organization", name: "SourceCatch Konnect" },
      sameAs: [
        "https://github.com/kumudwaykole",
        "https://www.linkedin.com/in/kumud-waykole",
      ],
      knowsAbout: ALL_SKILLS,
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationLocation: { "@type": "Country", name: "India" },
        skills: ALL_SKILLS.join(", "),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", franie.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(SITE_SCHEMA) }}
        />
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
