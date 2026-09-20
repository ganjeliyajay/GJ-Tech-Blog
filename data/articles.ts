import { Article, TechnologyTopic } from "@/types/blog";

export const AUTHOR_INFO = {
  name: "Ganjeliya Jay",
  role: "Full-Stack Software Engineer & Tech Writer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "I'm Ganjeliya Jay, a developer interested in building modern web applications and sharing what I learn along the way. Obsessed with clean code, developer experience, and performant web systems.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com"
  },
  skills: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Git", "System Design"]
};

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "building-modern-web-applications-with-nextjs",
    title: "Building Modern Web Applications with Next.js App Router",
    excerpt: "A practical guide to building scalable, resilient applications using the Next.js App Router, React Server Components, and streaming architectures.",
    category: "Next.js",
    tags: ["Next.js", "React", "Server Components", "Full Stack", "Web Performance"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 18, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trendingRank: 1,
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "The landscape of web development has undergone a tectonic shift with the advent of Next.js and the App Router. By bringing React Server Components (RSC) into the mainstream, modern web engineering has eliminated the historic trade-off between rich interactivity and instantaneous initial page loads.",
          "In this guide, we break down how to design a production-grade architecture that leverages nested layouts, incremental streaming, and server actions to deliver sub-second time-to-interactive experiences."
        ]
      },
      {
        id: "understanding-app-router",
        title: "Understanding the App Router Philosophy",
        content: [
          "Unlike the traditional Pages router where every file inside `pages/` corresponds to a complete client-bundled route, the App Router operates on a server-first mental model. Every component inside the `app/` directory is treated as a React Server Component by default.",
          "This fundamentally reduces the client JavaScript payload because heavy dependencies (such as date formatters, markdown parsers, and database ORMs) remain strictly on the server and are never shipped down to the user's browser."
        ],
        callout: {
          type: "tip",
          text: "Server Components execute exclusively on the server during request time or build time. They cannot use browser APIs like window or localStorage, nor client hooks like useState or useEffect."
        }
      },
      {
        id: "server-components-in-action",
        title: "Server Components & Streaming in Action",
        content: [
          "One of the strongest advantages of the App Router is fine-grained Suspense boundaries. Instead of blocking the entire route until all database calls finish, you can stream partial UI skeletons while asynchronous data fetches complete.",
          "Here is how a real-world server component streams data cleanly without client waterfall overhead:"
        ],
        codeSnippet: {
          language: "tsx",
          filename: "app/dashboard/page.tsx",
          code: `import { Suspense } from 'react';
import AnalyticsSummary from '@/components/AnalyticsSummary';
import RecentTransactions from '@/components/RecentTransactions';
import MetricsSkeleton from '@/components/MetricsSkeleton';

export default async function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">Engineering Metrics</h1>
        <p className="text-sm text-slate-400">Live operational telemetry across production clusters.</p>
      </header>

      {/* Immediate render of cached high-level metrics */}
      <Suspense fallback={<MetricsSkeleton count={4} />}>
        <AnalyticsSummary />
      </Suspense>

      {/* Streamed independent database query */}
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-slate-900/60" />}>
        <RecentTransactions limit={10} />
      </Suspense>
    </div>
  );
}`
        }
      },
      {
        id: "server-actions-and-mutations",
        title: "Handling Mutations with Server Actions",
        content: [
          "Mutations previously required dedicated API route endpoints (`/api/feedback`), boilerplate fetch handlers, and manual state serialization. With Server Actions, asynchronous functions can be executed directly on the server triggered by native form submissions or button handlers."
        ],
        bullets: [
          "Progressive enhancement: Forms submit reliably even if client JavaScript is still hydrating.",
          "Revalidation primitives: Seamlessly refresh cached server data via revalidatePath() or revalidateTag().",
          "Automatic CSRF mitigation: Built-in request validation tokens ensure endpoint safety."
        ]
      },
      {
        id: "best-practices",
        title: "Best Practices for Scale",
        content: [
          "Push the client boundary down: Keep the root of your component trees as Server Components. Only designate leaf components that strictly require user interaction with the 'use client' directive.",
          "Avoid prop drilling server state: Fetch data directly where it is consumed. Next.js automatically dedupes native fetch requests within the same render lifecycle."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "The Next.js App Router is more than just a routing convention; it is an evolution toward a hybrid client-server continuum. Embracing this architecture unlocks unmatched rendering performance, leaner client bundles, and unprecedented developer productivity."
        ]
      }
    ]
  },
  {
    id: "art-2",
    slug: "understanding-javascript-closures-like-a-pro",
    title: "Understanding JavaScript Closures Like a Pro",
    excerpt: "Dive deep into execution contexts, lexical scoping, memory heaps, and real-world patterns that demystify closures once and for all.",
    category: "JavaScript",
    tags: ["JavaScript", "Core Concepts", "Computer Science", "Performance"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 15, 2026",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80",
    trendingRank: 2,
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Ask five developers to explain JavaScript closures, and you will likely receive five vague references to 'functions inside functions'. While technically correct, this definition fails to capture why closures exist, how the V8 engine manages them in memory, and how to harness them effectively.",
          "A closure is not an esoteric trick; it is the fundamental mechanism that allows JavaScript to support first-class functions and lexical scope."
        ]
      },
      {
        id: "what-is-a-closure",
        title: "What is a Closure?",
        content: [
          "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In JavaScript, closures give an inner function access to its outer function's scope even after the outer function has finished executing.",
          "When a function returns another function, the returned function retains a reference pointer to the variables declared in the outer execution context."
        ],
        callout: {
          type: "note",
          text: "Closures are created at function creation time, not at function invocation time."
        }
      },
      {
        id: "how-closures-work",
        title: "How Closures Work Under the Hood",
        content: [
          "When JavaScript code executes, the engine creates an Execution Context containing a Variable Environment and an Outer Lexical Environment Reference (Scope Chain).",
          "Normally, when a function execution terminates, its local stack frame is popped. However, if an inner function maintains a reference to any variable in that environment, the V8 engine allocates those variables in the Heap rather than the Call Stack, preventing the Garbage Collector from freeing them."
        ]
      },
      {
        id: "practical-code-example",
        title: "Practical Code Example: Rate Limiter & State Store",
        content: [
          "Here is an authentic implementation of a closure-based token bucket rate limiter commonly used in API clients:"
        ],
        codeSnippet: {
          language: "javascript",
          filename: "rateLimiter.js",
          code: `function createRateLimiter(maxTokens, refillRateMs) {
  let tokens = maxTokens;
  let lastRefill = Date.now();

  return function attemptRequest(actionName) {
    const now = Date.now();
    const elapsed = now - lastRefill;

    // Replenish tokens based on elapsed duration
    if (elapsed >= refillRateMs) {
      const addedTokens = Math.floor(elapsed / refillRateMs);
      tokens = Math.min(maxTokens, tokens + addedTokens);
      lastRefill = now;
    }

    if (tokens > 0) {
      tokens--;
      console.log(\`[ALLOWED] \${actionName} processed. Remaining tokens: \${tokens}\`);
      return true;
    }

    console.warn(\`[THROTTLED] \${actionName} blocked. Try again shortly.\`);
    return false;
  };
}

// Usage instance
const apiLimiter = createRateLimiter(3, 1000);
apiLimiter("FETCH_DATA"); // ALLOWED
apiLimiter("FETCH_DATA"); // ALLOWED
apiLimiter("FETCH_DATA"); // ALLOWED
apiLimiter("FETCH_DATA"); // THROTTLED`
        }
      },
      {
        id: "common-use-cases",
        title: "Common Real-World Use Cases",
        content: [
          "Closures power many critical programming paradigms in modern JavaScript frameworks:"
        ],
        bullets: [
          "Data Privacy & Encapsulation: Creating private variables in modules and factory functions before the arrival of native class private fields (#).",
          "Function Currying & Partial Application: Generating specialized functions by pre-filling configuration parameters.",
          "Memoization: Caching computational results between function calls using an enclosed dictionary.",
          "React Hooks: Both useState and useEffect rely internally on closures linked to a fiber's memoizedState array."
        ]
      },
      {
        id: "common-mistakes",
        title: "Common Mistakes & Pitfalls",
        content: [
          "Accidental Memory Leaks: Enclosing large objects or DOM references inside long-lived callbacks (like window event listeners or setInterval) keeps the entire closure chain in memory indefinitely.",
          "The Stale Closure Bug: In React components, capturing state or props in a useCallback or useEffect without specifying the appropriate dependency list causes the callback to read stale variable values."
        ]
      },
      {
        id: "best-practices",
        title: "Best Practices",
        content: [
          "Clean up event listeners and intervals when they are no longer required to free closure scope chains.",
          "Do not create excessive closures inside tight loops if a pure function or shared prototype method can achieve the same result with zero heap allocations."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Mastering closures transforms how you write JavaScript. Far from a theoretical interview trivia point, closures are the architectural foundation of module patterns, reactive state engines, and expressive functional code."
        ]
      }
    ]
  },
  {
    id: "art-3",
    slug: "react-19-actions-use-hook-server-components",
    title: "Mastering React 19: Actions, use() Hook & Server Components",
    excerpt: "Explore the new features introduced in React 19, including the useActionState hook, optimistic updates, the versatile use() API, and asset preloading.",
    category: "React",
    tags: ["React", "React 19", "Hooks", "Frontend", "Modern Web"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 12, 2026",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    trendingRank: 3,
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "React 19 marks one of the most transformative releases in React's decade-long history. With built-in Actions, first-class asynchronous transitions, and the multi-purpose `use()` API, React eliminates thousands of lines of boilerplate code once needed for data mutations and optimistic UI states."
        ]
      },
      {
        id: "the-new-actions-paradigm",
        title: "The Actions Paradigm: Beyond Manual useEffect",
        content: [
          "In earlier versions of React, handling an asynchronous form submission required managing three separate pieces of state: pending status, the submitted data, and potential error states. React 19 formalizes this pattern through Actions and `useActionState`."
        ],
        codeSnippet: {
          language: "tsx",
          filename: "UserProfileForm.tsx",
          code: `'use client';

import { useActionState, useOptimistic } from 'react';

async function updateUsername(previousState: { name: string }, formData: FormData) {
  const newName = formData.get('username') as string;
  const res = await fetch('/api/user/profile', {
    method: 'POST',
    body: JSON.stringify({ name: newName }),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return { name: newName };
}

export function ProfileEditor({ currentName }: { currentName: string }) {
  const [state, formAction, isPending] = useActionState(updateUsername, { name: currentName });
  const [optimisticName, setOptimisticName] = useOptimistic(
    state.name,
    (_current, newName: string) => newName
  );

  return (
    <form
      action={async (formData) => {
        const nextName = formData.get('username') as string;
        setOptimisticName(nextName);
        await formAction(formData);
      }}
      className="space-y-4 rounded-xl border border-slate-800 p-6"
    >
      <h3 className="text-lg font-semibold text-white">Display Name: {optimisticName}</h3>
      <input
        name="username"
        defaultValue={state.name}
        placeholder="Enter your handle..."
        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-white"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isPending ? 'Saving changes...' : 'Save Profile'}
      </button>
    </form>
  );
}`
        }
      },
      {
        id: "the-use-api",
        title: "The Versatile use() API",
        content: [
          "Unlike standard hooks that can only be invoked at the top level of a functional component, React 19's `use()` function can be called conditionally inside loops and if-statements to unwrap Promises or consume Context dynamically."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "React 19 unifies state mutations, data fetching, and resource preloading into cohesive, native primitives. Developing with React has never been more expressive or resilient."
        ]
      }
    ]
  },
  {
    id: "art-4",
    slug: "advanced-typescript-generics-and-conditional-types",
    title: "Advanced TypeScript: Generics, Conditional Types & Template Literals",
    excerpt: "Level up your type engineering skills with mapped types, infer keyword patterns, template literal unions, and compile-time type validation.",
    category: "TypeScript",
    tags: ["TypeScript", "Type Systems", "Architecture", "Best Practices"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 09, 2026",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1516116211227-bbc0998f4a74?auto=format&fit=crop&w=1200&q=80",
    trendingRank: 4,
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "TypeScript's true power goes far beyond basic primitive annotations like `: string` and `: number`. As systems grow, maintaining bulletproof type-safety across distributed services requires understanding TypeScript as a Turing-complete compile-time type calculus."
        ]
      },
      {
        id: "conditional-types-and-infer",
        title: "Conditional Types & The infer Keyword",
        content: [
          "Conditional types allow you to express non-uniform type mappings based on whether a type extends another. Combined with the `infer` keyword, you can destructure internal types from functions, promises, or arrays effortlessly."
        ],
        codeSnippet: {
          language: "typescript",
          filename: "typeUtilities.ts",
          code: `// Unwrapping the resolved payload of any asynchronous function
type AsyncReturnType<T extends (...args: any[]) => Promise<any>> = 
  T extends (...args: any[]) => Promise<infer R> ? R : never;

// Transforming camelCase strings into snake_case at compile-time
type CamelToSnake<S extends string> = S extends \`\${infer P1}\${infer P2}\`
  ? P1 extends Uppercase<P1>
    ? \`_\${Lowercase<P1>}\${CamelToSnake<P2>}\`
    : \`\${P1}\${CamelToSnake<P2>}\`
  : S;

type UserProfile = {
  firstName: string;
  lastName: string;
  accountCreationDate: Date;
};

// Strongly-typed event emitter key pattern
type EventRoute = \`on\${Capitalize<'click' | 'hover' | 'focus'>}\`;
// Result: "onClick" | "onHover" | "onFocus"`
        }
      },
      {
        id: "type-safe-builders",
        title: "Type-Safe Builder Pattern",
        content: [
          "By combining generics with phantom type markers, you can enforce compile-time verification that all required configuration properties have been declared before calling `.build()`."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Embracing advanced TypeScript turns bugs that would otherwise manifest as production runtime crashes into friendly compile-time warnings."
        ]
      }
    ]
  },
  {
    id: "art-5",
    slug: "demystifying-nodejs-event-loop-and-libuv",
    title: "Demystifying the Node.js Event Loop & Asynchronous Architecture",
    excerpt: "An engineering breakdown of phases, microtask queues, libuv thread pools, and how to prevent blocking your Node.js server under high concurrency.",
    category: "Node.js",
    tags: ["Node.js", "Backend", "Event Loop", "libuv", "Concurrency"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 06, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    trendingRank: 5,
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Node.js is renowned for its non-blocking, event-driven I/O model. Yet, many backend engineers treat the event loop as a black box. When throughput dips or response latencies spike into multi-second timeouts, understanding the phases of the libuv event loop is the only way to diagnose the bottleneck."
        ]
      },
      {
        id: "event-loop-phases",
        title: "The Six Phases of the Event Loop",
        content: [
          "The event loop operates in a continuous cycle traversing specific queues in strict sequence:"
        ],
        bullets: [
          "Timers Phase: Executes callbacks scheduled by setTimeout() and setInterval().",
          "Pending Callbacks Phase: Executes I/O callbacks deferred from previous loop iterations (e.g. TCP errors).",
          "Idle, Prepare Phase: Internal callbacks used strictly by libuv.",
          "Poll Phase: Retrieves new I/O events and executes their callbacks. The loop blocks here when waiting for incoming socket data.",
          "Check Phase: Executes callbacks invoked via setImmediate().",
          "Close Callbacks Phase: Handles cleanup routines like socket.on('close')."
        ]
      },
      {
        id: "microtask-priority",
        title: "Microtasks: process.nextTick vs Promise.then",
        content: [
          "Crucially, microtasks do not belong to libuv. Instead, they are executed immediately after the current operation completes, regardless of the active event loop phase."
        ],
        codeSnippet: {
          language: "javascript",
          filename: "loopAnalysis.js",
          code: `console.log('1: Synchronous Start');

setTimeout(() => console.log('2: Timers Queue (macrotask)'), 0);
setImmediate(() => console.log('3: Check Queue (setImmediate)'));

Promise.resolve().then(() => console.log('4: Microtask (Promise)'));
process.nextTick(() => console.log('5: Next Tick (High-priority microtask)'));

console.log('6: Synchronous End');

// Expected Output Sequence:
// 1: Synchronous Start
// 6: Synchronous End
// 5: Next Tick (High-priority microtask)
// 4: Microtask (Promise)
// 2: Timers Queue (macrotask)
// 3: Check Queue (setImmediate)`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Never block the main thread. Delegate heavy computational tasks (like cryptographic hashing, image compression, or matrix calculations) to Worker Threads or native C++ addons."
        ]
      }
    ]
  },
  {
    id: "art-6",
    slug: "mongodb-aggregation-pipeline-mastery-high-scale",
    title: "MongoDB Aggregation Pipeline Mastery for High-Scale Apps",
    excerpt: "Construct performant aggregation pipelines using $facet, $lookup, window functions, and index optimization strategies.",
    category: "MongoDB",
    tags: ["MongoDB", "Database", "Backend", "Performance", "NoSQL"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Sep 03, 2026",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Simple `.find()` and `.findOne()` queries can only take an application so far. When you need complex reporting, real-time analytics, faceted navigation, or relational joins across collections, MongoDB's Aggregation Framework is an exceptionally fast, memory-efficient data processing pipeline."
        ]
      },
      {
        id: "pipeline-architecture",
        title: "Structuring High-Performance Pipelines",
        content: [
          "The aggregation pipeline functions like an assembly line: raw documents enter through the first stage, transform sequentially, and exit as a refined summary. Filtering early with index-backed `$match` stages ensures subsequent stages process the minimal required data."
        ],
        codeSnippet: {
          language: "javascript",
          filename: "analyticsPipeline.js",
          code: `db.orders.aggregate([
  // Stage 1: Filter with compound index support
  {
    $match: {
      status: "COMPLETED",
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  // Stage 2: Deconstruct items array for individual calculation
  { $unwind: "$items" },
  // Stage 3: Group by category and compute sales metrics
  {
    $group: {
      _id: "$items.category",
      totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      unitsSold: { $sum: "$items.quantity" },
      averageOrderValue: { $avg: "$totalAmount" }
    }
  },
  // Stage 4: Order by revenue descending
  { $sort: { totalRevenue: -1 } },
  // Stage 5: Project clean output keys
  {
    $project: {
      category: "$_id",
      totalRevenue: { $round: ["$totalRevenue", 2] },
      unitsSold: 1,
      _id: 0
    }
  }
]);`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "By inspecting pipeline execution plans with `explain('executionStats')`, you can identify disk spillages and keep your aggregations running purely in RAM."
        ]
      }
    ]
  },
  {
    id: "art-7",
    slug: "architecting-enterprise-mern-stack-applications",
    title: "Architecting Enterprise MERN Stack Applications with Clean Architecture",
    excerpt: "Design robust, maintainable MERN systems with domain-driven design, centralized validation, decoupled repositories, and JWT refresh token flows.",
    category: "MERN",
    tags: ["MERN", "Architecture", "Full Stack", "Clean Code", "Design Patterns"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 29, 2026",
    readingTime: "11 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Many tutorial projects build MERN applications by packing business logic directly inside Express route controllers and React component files. While manageable for small prototypes, this approach rapidly deteriorates into tightly coupled spaghetti code in enterprise production."
        ]
      },
      {
        id: "onion-architecture",
        title: "Layered Domain Architecture",
        content: [
          "Organize your codebase into clear concentric boundaries: Domain Entities at the core, Use Cases orchestrating business logic, and Infrastructure adapters managing database drivers and HTTP protocol details."
        ],
        bullets: [
          "Domain Layer: Pure TypeScript models and enterprise business rules independent of database schemas.",
          "Application Layer: Use cases defining specific user flows (e.g. RegisterUser, ProcessSubscription).",
          "Interface Adapters: Controllers that translate Express requests into domain inputs, and presenters formatting responses.",
          "Infrastructure Layer: Mongoose models, external Redis caches, and mail transport providers."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Decoupling the MERN stack through clean architectural boundaries ensures your test suite runs in milliseconds without requiring active database connections, while making future framework migrations straightforward."
        ]
      }
    ]
  },
  {
    id: "art-8",
    slug: "integrating-llms-streaming-ai-into-web-apps",
    title: "Integrating Large Language Models & Streaming AI into Modern Web Apps",
    excerpt: "A practical guide to building AI-augmented web interfaces with Server-Sent Events, Vercel AI SDK, vector embeddings, and resilient fallback flows.",
    category: "AI",
    tags: ["AI", "LLM", "Next.js", "Streaming", "Generative AI"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 25, 2026",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Artificial intelligence has evolved from speculative research into an indispensable UX capability. Today's users expect real-time conversational agents, context-aware content generation, and instant code synthesis delivered with zero perceived latency."
        ]
      },
      {
        id: "streaming-fundamentals",
        title: "Why Streaming is Non-Negotiable for AI UX",
        content: [
          "Large language models generate tokens sequentially. If you buffer an entire 500-word response before sending it to the client, the user is left staring at a spinner for 8-15 seconds. By streaming tokens via Server-Sent Events (SSE) or Web Streams, the perceived initial response time collapses to under 400 milliseconds."
        ],
        codeSnippet: {
          language: "tsx",
          filename: "app/api/chat/route.ts",
          code: `import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: 'You are an expert developer assistant inside GJ Tech. Provide clean, secure, and idiomatic TypeScript code.',
    messages,
  });

  return result.toDataStreamResponse();
}`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Building great AI web applications is 20% model prompting and 80% resilient UI engineering: managing token stream buffers, graceful connection retries, and markdown rendering."
        ]
      }
    ]
  },
  {
    id: "art-9",
    slug: "engineering-micro-interactions-and-design-systems",
    title: "The Engineering of Micro-Interactions and Design Systems",
    excerpt: "How to craft bespoke developer interfaces with physics-based spring animations, accessible tokens, and modular Tailwind component architectures.",
    category: "UI/UX",
    tags: ["UI/UX", "Design Systems", "Animation", "CSS", "Tailwind CSS"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 20, 2026",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "What separates an amateur website from an exceptional digital product? The difference rarely lies in raw features; it lives in the nuances of micro-interactions: tactile button feedbacks, smooth layout transitions, and intentional typography scales."
        ]
      },
      {
        id: "spring-physics",
        title: "Spring Physics vs Linear Easing",
        content: [
          "Human eyes are hardwired to observe physical movement in nature. Linear or simplistic ease-in-out bezier curves feel robotic and artificial. In contrast, spring physics simulate physical mass, stiffness, and damping, producing organic motion that feels alive."
        ],
        codeSnippet: {
          language: "tsx",
          filename: "InteractiveBadge.tsx",
          code: `'use client';

import { motion } from 'framer-motion';

export function InteractiveBadge({ label }: { label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
      {label}
    </motion.button>
  );
}`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Invest in micro-animations that deliver feedback rather than distraction. Subtle polish creates trust, keeps users engaged, and establishes your application as a premier piece of software."
        ]
      }
    ]
  },
  {
    id: "art-10",
    slug: "git-rebase-vs-merge-battle-tested-team-workflow",
    title: "Git Rebase vs. Merge: A Battle-Tested Team Workflow Guide",
    excerpt: "Clear up the eternal Git debate. Learn interactive rebasing, clean commit graphs, squash strategies, and how to recover from botched rebase operations with git reflog.",
    category: "Git",
    tags: ["Git", "Version Control", "DevOps", "Collaboration", "Productivity"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 15, 2026",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Few topics spark as much passionate debate in engineering standups as `git merge` versus `git rebase`. Both commands solve the identical high-level challenge: integrating changes from one branch into another. However, their philosophies and impact on commit history could not be more distinct."
        ]
      },
      {
        id: "rebase-mechanics",
        title: "How Rebase Works Under the Hood",
        content: [
          "When you run `git rebase main`, Git finds the common ancestor of your feature branch and `main`. It then temporarily shelves your feature commits, fast-forwards the branch pointer to the tip of `main`, and replays your commits one by one on top."
        ],
        codeSnippet: {
          language: "bash",
          filename: "git-workflow.sh",
          code: `# Sync feature branch cleanly with latest main
git checkout feature/auth-redesign
git fetch origin
git rebase origin/main

# Clean up messy work-in-progress commits into atomic units
git rebase -i HEAD~4

# If things go completely sideways, reflog is your time machine
git reflog
# Locate the commit SHA before the rebase started
git reset --hard HEAD@{3}`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "Adopt a golden rule: Rebase local feature branches before opening a pull request to keep a linear history, but never rebase shared public branches like `main` or `staging`."
        ]
      }
    ]
  },
  {
    id: "art-11",
    slug: "the-senior-developer-playbook-coding-to-influence",
    title: "The Senior Developer Playbook: From Coding to Technical Influence",
    excerpt: "What truly separates a Senior Engineer from a Mid-Level developer? Uncover technical debt trade-offs, architecture RFCs, mentorship, and business alignment.",
    category: "Career",
    tags: ["Career", "Leadership", "Mentorship", "System Design", "Engineering"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 10, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "Early in your engineering career, success is measured almost exclusively by ticket throughput: how many pull requests you merge, how fast you resolve bug reports, and your command of framework syntax.",
          "As you progress toward Senior, Staff, and Principal roles, the metric inverts. Your primary output shifts from writing code to multiplying the effectiveness of the entire engineering organization."
        ]
      },
      {
        id: "core-pillars",
        title: "The Three Pillars of Senior Engineering",
        content: [
          "Real seniority hinges on three interconnected disciplines:"
        ],
        bullets: [
          "Pragmatic Trade-Off Analysis: Understanding that all software design is a compromise between delivery velocity, maintenance overhead, scalability, and developer cognitive load.",
          "Writing Clear RFCs & Design Docs: Aligning stakeholders and uncovering critical edge cases in writing before committing months of engineering implementation.",
          "Force Multiplying: Mentoring junior team members, refining code review cultures, and building internal tooling that eliminates team friction."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "The most valuable engineers aren't those who write the most clever code; they are those who solve the business problem with the simplest, most maintainable system."
        ]
      }
    ]
  },
  {
    id: "art-12",
    slug: "browser-rendering-pipeline-and-high-performance-javascript",
    title: "Mastering the Browser Rendering Pipeline for 60 FPS Web Apps",
    excerpt: "Understand DOM trees, CSSOM recalculation, layout thrashing, composite layers, and how to write buttery-smooth web interactions.",
    category: "JavaScript",
    tags: ["JavaScript", "Performance", "Browsers", "CSSOM", "Web Vitals"],
    author: {
      name: "Ganjeliya Jay",
      role: "Lead Full-Stack Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    date: "Aug 04, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: [
          "At 60 frames per second, a browser has exactly 16.6 milliseconds to process JavaScript events, recalculate styles, calculate box geometries, rasterize pixels, and composite layers to the GPU. If your code exceeds this budget, frames drop, causing stutter and degrading user confidence."
        ]
      },
      {
        id: "critical-rendering-path",
        title: "The Critical Rendering Path",
        content: [
          "Every visual frame goes through five distinct stages:"
        ],
        bullets: [
          "JavaScript: Event handlers, state updates, or animations change the DOM.",
          "Style Calculation: Browser figures out which CSS rules apply to which elements.",
          "Layout (Reflow): The geometry (width, height, coordinates) of every element is calculated.",
          "Paint: Pixels are drawn across multiple layers (borders, text, shadows).",
          "Composite: The GPU stitches individual layers together onto the physical screen."
        ]
      },
      {
        id: "avoiding-layout-thrashing",
        title: "Eliminating Forced Synchronous Layout Thrashing",
        content: [
          "Reading layout properties (like `offsetWidth` or `scrollTop`) immediately after modifying DOM styles forces the browser to recalculate layout prematurely inside the JavaScript execution phase."
        ],
        codeSnippet: {
          language: "javascript",
          filename: "perfOptimization.js",
          code: `// BAD: Forces repeated layout calculations inside a loop
for (let i = 0; i < elements.length; i++) {
  // Reading triggers forced reflow
  const width = container.offsetWidth;
  elements[i].style.width = \`\${width + 10}px\`;
}

// GOOD: Batch reads, then batch writes using requestAnimationFrame
const targetWidth = container.offsetWidth; // Single read
requestAnimationFrame(() => {
  elements.forEach((el) => {
    el.style.width = \`\${targetWidth + 10}px\`; // Batched write
  });
});`
        }
      },
      {
        id: "conclusion",
        title: "Conclusion",
        content: [
          "For maximum performance, animate exclusively with `transform` and `opacity`. These properties skip both Layout and Paint, running directly on the GPU composite thread."
        ]
      }
    ]
  }
];

export const CATEGORIES: Article["category"][] = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "MERN",
  "AI",
  "UI/UX",
  "Git",
  "Career",
];

export const TOPICS: TechnologyTopic[] = [
  {
    name: "JavaScript",
    category: "JavaScript",
    description: "Deep dive into execution contexts, closures, event loop, and modern ECMAScript standards.",
    articleCount: 14,
    color: "#f7df1e",
    iconName: "Code2"
  },
  {
    name: "React",
    category: "React",
    description: "Component patterns, React 19 Actions, hooks architecture, and concurrent rendering.",
    articleCount: 18,
    color: "#61dafb",
    iconName: "Atom"
  },
  {
    name: "Next.js",
    category: "Next.js",
    description: "Server Components, App Router patterns, edge runtimes, and incremental streaming.",
    articleCount: 15,
    color: "#ffffff",
    iconName: "Layers"
  },
  {
    name: "TypeScript",
    category: "TypeScript",
    description: "Advanced generic systems, conditional inference, mapped types, and strict validation.",
    articleCount: 11,
    color: "#3178c6",
    iconName: "FileCode"
  },
  {
    name: "Node.js",
    category: "Node.js",
    description: "High-throughput asynchronous servers, libuv internals, streams, and cluster scaling.",
    articleCount: 12,
    color: "#339933",
    iconName: "Server"
  },
  {
    name: "MongoDB",
    category: "MongoDB",
    description: "Document modeling, aggregation pipeline engineering, indexing, and sharded clusters.",
    articleCount: 9,
    color: "#47a248",
    iconName: "Database"
  },
  {
    name: "AI & LLM",
    category: "AI",
    description: "Integrating vector search, streaming completions, agentic workflows, and web models.",
    articleCount: 8,
    color: "#8b5cf6",
    iconName: "Cpu"
  },
  {
    name: "Git & DevOps",
    category: "Git",
    description: "Advanced rebasing strategies, CI/CD automation, atomic commits, and team flow.",
    articleCount: 7,
    color: "#f05032",
    iconName: "GitBranch"
  }
];

export const TECH_STRIP_ITEMS = [
  { name: "JavaScript", icon: "Code2", color: "#f7df1e" },
  { name: "TypeScript", icon: "FileCode", color: "#38bdf8" },
  { name: "React", icon: "Atom", color: "#61dafb" },
  { name: "Next.js", icon: "Layers", color: "#e2e8f0" },
  { name: "Node.js", icon: "Server", color: "#4ade80" },
  { name: "Express", icon: "Terminal", color: "#cbd5e1" },
  { name: "MongoDB", icon: "Database", color: "#22c55e" },
  { name: "Git", icon: "GitBranch", color: "#f97316" },
  { name: "Tailwind", icon: "Palette", color: "#06b6d4" },
  { name: "AI", icon: "Cpu", color: "#a855f7" }
];
