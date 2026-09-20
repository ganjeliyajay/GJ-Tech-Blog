export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
  bullets?: string[];
  callout?: {
    type: "tip" | "important" | "note";
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category:
  | "JavaScript"
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Node.js"
  | "MongoDB"
  | "MERN"
  | "AI"
  | "UI/UX"
  | "Git"
  | "Career";
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  image: string;
  trendingRank?: number;
  featured?: boolean;
  sections: ArticleSection[];
}

export interface TechnologyTopic {
  name: string;
  category: Article["category"];
  description: string;
  articleCount: number;
  color: string;
  iconName: string;
}

export type CategoryFilter = "All" | Article["category"];


export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    instagram: string | null;
    portfolio: string | null;
  };
}