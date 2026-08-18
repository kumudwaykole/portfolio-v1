import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "./components/header/index";
import { SmoothScroll } from "./components/smooth-scroll";
import "./globals.css";

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
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
