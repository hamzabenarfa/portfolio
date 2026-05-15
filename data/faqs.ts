export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    question: "Who do you work best with?",
    answer:
      "Founders building MVPs, agencies that need a reliable full-stack partner, small businesses launching SaaS or internal platforms, and teams that need frontend, backend, and deployment handled by one person. I'm not the right fit for basic landing pages, pixel-only design work, or projects without a clear scope or budget.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Next.js, TypeScript, React, and React Native on the frontend. Node, NestJS, PostgreSQL, and Prisma on the backend. I optimize for the boring, well-supported choices that ship fast and don't break in two years.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work remotely across timezones — most of my clients are in Europe and North America. I overlap with EU mornings and US mornings comfortably.",
  },
  {
    question: "How do you handle communication?",
    answer:
      "Weekly demos, async daily updates in Slack or your tool of choice, and a shared Notion/Linear for everything else. No surprises, no week-long radio silence.",
  },
  {
    question: "Can you handle frontend AND backend?",
    answer:
      "Yes — that's the whole point. I take ownership of the full stack so founders aren't coordinating between two contractors. For larger work I plug into existing teams as a senior IC.",
  },
];
