export const SITE = {
  name: "Hamza Benarfa",
  legalName: "Hamza Benarfa",
  url: process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com",
  description:
    "Independent full-stack developer and DevOps engineer based in Tunisia, focused on SaaS MVPs, custom web platforms, product editors, and production launch infrastructure.",
  email: "contact@benarfa.com",
  phone: "+21622633345",
  location: "Tunisia",
  sameAs: [
    "https://www.linkedin.com/in/hamzabenarfa/",
    "https://github.com/hamzabenarfa",
  ],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Docker",
    "Cloud Infrastructure",
  ],
} as const;
