import { Article, TechnologyTopic } from '@/types/blog';

type PostForTopic = {
  category?: string | null;
};

type TopicMeta = Omit<
  TechnologyTopic,
  'name' | 'category' | 'articleCount'
>;

const topicMeta: Record<string, TopicMeta> = {
  JavaScript: {
    description:
      'Deep dive into execution contexts, closures, event loop, and modern ECMAScript standards.',
    color: '#f7df1e',
    iconName: 'Code2',
  },

  React: {
    description:
      'Component patterns, React 19 Actions, hooks architecture, and concurrent rendering.',
    color: '#61dafb',
    iconName: 'Atom',
  },

  'Next.js': {
    description:
      'Server Components, App Router patterns, edge runtimes, and incremental streaming.',
    color: '#ffffff',
    iconName: 'Layers',
  },

  TypeScript: {
    description:
      'Advanced generic systems, conditional inference, mapped types, and strict validation.',
    color: '#3178c6',
    iconName: 'FileCode',
  },

  'Node.js': {
    description:
      'High-throughput asynchronous servers, libuv internals, streams, and cluster scaling.',
    color: '#339933',
    iconName: 'Server',
  },

  MongoDB: {
    description:
      'Document modeling, aggregation pipeline engineering, indexing, and sharded clusters.',
    color: '#47a248',
    iconName: 'Database',
  },

  AI: {
    description:
      'Integrating vector search, streaming completions, agentic workflows, and web models.',
    color: '#8b5cf6',
    iconName: 'Cpu',
  },

  Git: {
    description:
      'Advanced rebasing strategies, CI/CD automation, atomic commits, and team flow.',
    color: '#f05032',
    iconName: 'GitBranch',
  },
};

export function getTopicsFromPosts(
  posts: PostForTopic[]
): TechnologyTopic[] {
  const categoryCounts = posts.reduce<Record<string, number>>(
    (acc, post) => {
      const category = post.category?.trim();

      if (!category) {
        return acc;
      }

      acc[category] = (acc[category] ?? 0) + 1;

      return acc;
    },
    {}
  );

  return Object.entries(categoryCounts)
    .map(([category, articleCount]) => {
      const meta = topicMeta[category];

      return {
        name: category,
        category: category as Article['category'],
        description:
          meta?.description ??
          `Explore the latest articles, tutorials, and practical guides about ${category}.`,
        articleCount,
        color: meta?.color ?? '#06b6d4',
        iconName: meta?.iconName ?? 'Code2',
      };
    })
    .sort((a, b) => b.articleCount - a.articleCount);
}