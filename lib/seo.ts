export const SITE_URL = "https://ikumud.com";
export const SITE_NAME = "Kumud Waykole";

/** Stable @id values so JSON-LD nodes across pages reference the same entities. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Used for sitemap `lastModified`; bump when site content meaningfully changes. */
export const SITE_LAST_MODIFIED = new Date("2026-10-10");

/** Serialises JSON-LD safely for inline <script> (prevents `</script>` breakout). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const JOB_TITLES = [
  "Full Stack Software Developer",
  "Software Engineer",
  "Full Stack Engineer",
  "Full Stack Web Developer",
  "Backend Engineer",
  "Frontend Developer",
] as const;

/** Mirrors the core stack shown on the home page. */
export const SKILLS = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "GSAP",
  ],
  Backend: ["Node.js", "Express", "REST APIs", "Medusa.js", "Zod"],
  "Databases & ORM": ["PostgreSQL", "Prisma", "Redis"],
  Payments: ["Razorpay", "Stripe"],
  "DevOps & Tooling": [
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Turborepo",
    "Git",
    "pnpm",
    "Vercel",
    "Jest",
  ],
  Architecture: [
    "System Design",
    "Software Architecture",
    "Database Optimization",
    "Performance Optimization",
    "Monorepo Architecture",
  ],
} as const;

export const ALL_SKILLS: string[] = Object.values(SKILLS).flat();
