# GJ Tech Blog — Project Documentation

> A modern developer-focused blog built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Sanity CMS.

Repository: https://github.com/ganjeliyajay/GJ-Tech-Blog  
Live site: https://gj-tech-blog.vercel.app/

---

## 1. Project Overview

**GJ Tech** is a modern developer blog/publication focused on practical tutorials, technical guides, programming concepts, and modern web-development topics.

The project uses:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Sanity CMS
- GROQ queries
- Framer Motion
- Lucide React
- Next.js metadata/SEO
- Vercel deployment

The public site is designed to separate the **frontend presentation layer** from the **content management layer**. Blog content is stored in Sanity and fetched from the Next.js application through GROQ queries.

---

# 2. Current Project Stack

| Technology | Purpose |
|---|---|
| Next.js 16.3.5 | Application framework |
| React 19.2.8 | UI |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styling |
| Sanity 6.15.0 | CMS |
| next-sanity 13.3.4 | Sanity integration |
| @sanity/image-url | Sanity image handling |
| Framer Motion 13.4.0 | Animations |
| Lucide React | Icons |
| clsx | Conditional class names |
| tailwind-merge | Tailwind class merging |
| ESLint 9 | Code quality |
| Vercel | Deployment |

The package configuration currently exposes the following scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# 3. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │      Sanity CMS     │
                    │                     │
                    │ Blog Posts          │
                    │ Authors             │
                    │ Images              │
                    └──────────┬──────────┘
                               │
                         GROQ Queries
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │                     │
                    │ App Router          │
                    │ Server Components   │
                    │ Components          │
                    │ SEO / Metadata      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      GJ Tech        │
                    │    Public Website   │
                    └─────────────────────┘
```

---

# 4. Repository Structure

The repository currently contains the following major areas:

```text
GJ-Tech-Blog/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── Global/
│   ├── HomePage/
│   ├── BlogDetails/
│   └── ...
│
├── context/
│
├── lib/
│   ├── sanity.ts
│   ├── queries.ts
│   └── ...
│
├── public/
│
├── sanity/
│   └── schemaTypes/
│       ├── post.ts
│       └── author.ts
│
├── types/
│
├── next.config.ts
├── sanity.cli.ts
├── sanity.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

> The exact component list can grow as new pages/features are added. Keep this documentation updated when the architecture changes.

---

# 5. Main Homepage Flow

The homepage is implemented in:

```text
app/page.tsx
```

The homepage currently renders:

```text
Hero
↓
Tech Stack Strip
↓
Featured Article
↓
Category Section
↓
Trending Articles
↓
Developer Topics
↓
Author Section
↓
Newsletter
```

The homepage fetches the featured article, all posts, and author data in parallel.

Conceptually:

```text
Sanity
  │
  ├── featuredArticleQuery
  ├── postsQuery
  └── authorQuery
          │
          ▼
      Home Page
```

The page currently uses:

```ts
export const dynamic = "force-dynamic";
export const revalidate = 0;
```

and Sanity requests use:

```ts
cache: "no-store"
```

This means content is fetched dynamically rather than relying on a long-lived static cache.

---

# 6. Sanity CMS

Sanity is the content management system for GJ Tech.

The Sanity Studio is configured with:

```text
basePath: /studio
```

Therefore the CMS is intended to be accessible from:

```text
/studio
```

The Sanity configuration uses:

```text
sanity.config.ts
```

and registers:

```text
postType
authorType
```

---

# 7. Sanity Environment Variables

The project expects:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
```

The project should not hard-code these values into source files.

The Sanity client validates that both variables exist before creating the client.

Example:

```ts
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
```

---

# 8. Sanity Client

The Sanity client is located at:

```text
lib/sanity.ts
```

Current configuration concept:

```ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-19",
  useCdn: false,
});
```

Important:

- `projectId` comes from environment variables.
- `dataset` comes from environment variables.
- `useCdn: false` is currently used.
- Keep the API version consistent unless there is a reason to upgrade it.

---

# 9. Post Schema

The primary blog content schema is:

```text
sanity/schemaTypes/post.ts
```

The document type is:

```text
post
```

The schema currently contains these top-level fields:

```text
title
slug
excerpt
category
tags
image
author
date
readingTime
featured
trendingRank
sections
bullets
callout
codeSnippet
```

---

# 10. Post Field Reference

## title

Type:

```text
string
```

Required.

Example:

```text
React.js Performance Optimization: Practical Techniques for Faster Apps
```

---

## slug

Type:

```text
slug
```

Generated from:

```text
title
```

Example:

```text
react-js-performance-optimization
```

---

## excerpt

Type:

```text
text
```

Maximum:

```text
200 characters
```

Purpose:

- Homepage previews
- Article cards
- SEO/content summaries
- Search results

---

## category

Type:

```text
string
```

Allowed values:

```text
JavaScript
React
Next.js
TypeScript
Node.js
MongoDB
MERN
AI
UI/UX
Git
Career
```

When creating a post, always select one of these existing categories unless the schema is intentionally updated.

---

## tags

Type:

```text
array of strings
```

Example:

```text
React.js
Performance
Optimization
JavaScript
Frontend
```

---

## image

Type:

```text
image
```

Hotspot is enabled.

The frontend resolves the image URL through:

```groq
"image": image.asset->url
```

---

# 11. Author Object

Each post can contain:

```text
author
```

with:

```text
name
role
avatar
```

Example:

```text
Name:
Ganjeliya Jay

Role:
React Developer
```

The avatar is a Sanity image.

---

# 12. Article Sections

The main article body is stored inside:

```text
sections[]
```

Every section contains:

```text
id
title
content[]
bullets[]
callout
codeSnippet
```

This structure is important because the frontend expects article content in this format.

---

# 13. Section Content

The `content` field is:

```text
array of text
```

Therefore one section can contain multiple paragraphs.

Example:

```text
Paragraph 1

Paragraph 2

Paragraph 3
```

In Sanity, each paragraph should be added as a separate array item.

Do not assume `content` is a single string.

---

# 14. Section Callout

Each section can contain:

```text
callout
```

with:

```text
type
text
```

Allowed callout types:

```text
tip
important
note
```

Do not create unsupported values such as:

```text
warning
success
info
```

unless the schema is updated first.

---

# 15. Section Code Snippet

Each section can contain:

```text
codeSnippet
```

with:

```text
language
filename
code
```

Example:

```text
Language:
jsx

Filename:
UserCard.jsx

Code:
const UserCard = () => {
  return <div>User Card</div>;
};
```

---

# 16. Top-Level Bullets / Callout / Code

The schema also contains top-level:

```text
bullets
callout
codeSnippet
```

These are separate from the same fields inside `sections[]`.

Before using them in the frontend, verify that the corresponding UI actually consumes them.

For normal article content, prefer the structured:

```text
sections[]
```

system.

---

# 17. GROQ Query System

The main query file is:

```text
lib/queries.ts
```

It currently contains:

```text
postsQuery
postBySlugQuery
featuredArticleQuery
categoriesQuery
authorQuery
searchPostsQuery
```

---

# 18. postsQuery

Purpose:

Fetch all blog posts ordered by publication date.

Conceptually:

```groq
*[_type == "post"] | order(date desc)
```

It returns:

```text
id
slug
title
excerpt
category
tags
author
date
readingTime
image
featured
trendingRank
sections
```

---

# 19. postBySlugQuery

Purpose:

Fetch one article using its slug.

Example:

```text
/blog/react-js-performance-optimization
```

The query uses:

```groq
*[_type == "post" && slug.current == $slug][0]
```

This is the main query that should be used for an article details page.

---

# 20. featuredArticleQuery

The featured article is selected using:

```groq
featured == true
```

and then:

```groq
| order(date desc)[0]
```

Important:

If multiple posts have:

```text
featured = true
```

the newest featured article is selected.

Recommended content-management rule:

> Keep only the intended homepage article marked as Featured unless multiple featured articles are intentionally supported.

---

# 21. categoriesQuery

This query extracts unique categories from published post documents.

Conceptually:

```groq
array::unique(
  *[
    _type == "post" &&
    defined(category)
  ].category
)
```

This allows category navigation/filtering to be data-driven.

---

# 22. authorQuery

The author query reads the first Sanity document with:

```text
_type == "author"
```

It returns:

```text
id
name
role
bio
avatar
skills
socials
```

Social fields currently include:

```text
github
linkedin
twitter
instagram
portfolio
```

---

# 23. searchPostsQuery

The search query returns lightweight post information for search functionality.

It includes:

```text
id
slug
title
excerpt
category
tags
readingTime
date
image
sections.title
sections.content
```

---

# 24. Homepage Data Flow

Current data flow:

```text
app/page.tsx
       │
       ├── featuredArticleQuery
       │
       ├── postsQuery
       │
       └── authorQuery
              │
              ▼
        Sanity Client
              │
              ▼
        Sanity Dataset
```

After receiving posts:

```text
posts
  │
  ▼
getTopicsFromPosts(posts)
  │
  ▼
Developer Topics
```

---

# 25. SEO and Metadata

Global metadata is configured in:

```text
app/layout.tsx
```

Current site identity:

```text
GJ Tech — Developer Blog
```

Default description:

```text
GJ Tech is a developer publication featuring practical tutorials, insights, and guides on React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs, and modern web development.
```

The project also configures:

```text
Open Graph
Twitter Card
Robots
Keywords
Author
Publisher
Application name
Icons
```

---

# 26. Fonts

The project currently uses:

```text
Inter
JetBrains Mono
```

Inter is used for normal interface text.

JetBrains Mono is used for code/monospace content.

CSS variables:

```text
--font-inter
--font-mono
```

---

# 27. Global Layout

The root layout contains:

```text
ToastProvider
Navbar
Page Content
Footer
```

Conceptually:

```tsx
<ToastProvider>
  <Navbar />

  {children}

  <Footer />
</ToastProvider>
```

This means global UI such as navigation, footer, and toast notifications is available across the application.

---

# 28. Theme

The root HTML currently uses:

```text
dark
```

and the application supports dark-themed styling through Tailwind classes.

Example pattern:

```text
bg-white
dark:bg-[#080c14]
```

When adding new UI, maintain the existing light/dark styling system rather than introducing an unrelated theme.

---

# 29. Animations

The project includes:

```text
framer-motion
```

Use animations intentionally.

Recommended approach:

- Hero entrance animations
- Article card hover effects
- Section reveal animations
- Smooth UI transitions
- Small interaction feedback

Avoid excessive animations that reduce readability or accessibility.

---

# 30. Icons

The project uses:

```text
lucide-react
```

When adding icons:

```tsx
import { Search } from "lucide-react";
```

Use icons that actually exist in the installed Lucide version.

Avoid importing icons from other icon libraries unless there is a clear project-level reason.

---

# 31. Toast System

The project contains:

```text
context/ToastContext
```

The root layout wraps the application with:

```tsx
<ToastProvider>
```

Use the existing toast system for user-facing feedback rather than creating many different inline notification systems.

Examples:

```text
Success
Error
Warning
Information
```

---

# 32. Creating a New Blog Post

Recommended workflow:

### Step 1 — Open Studio

Open:

```text
/studio
```

### Step 2 — Create Blog Post

Create a new:

```text
Blog Post
```

### Step 3 — Fill Metadata

Fill:

```text
Title
Slug
Excerpt
Category
Tags
Cover Image
Author
Date
Reading Time
Featured
Trending Rank
```

### Step 4 — Add Article Sections

For each section:

```text
Section ID
Section Title
Content
Bullet Points
Callout
Code Snippet
```

### Step 5 — Publish

Publish the document in Sanity.

### Step 6 — Verify

Open the public blog and verify:

```text
Homepage
Category
Trending
Search
Article Details
Images
Code blocks
Callouts
```

---

# 33. Example Post Creation Checklist

```text
[ ] Title added
[ ] Slug generated
[ ] Excerpt <= 200 characters
[ ] Valid category selected
[ ] Tags added
[ ] Cover image uploaded
[ ] Author added
[ ] Date selected
[ ] Reading time added
[ ] Featured status checked
[ ] Trending rank checked
[ ] Sections created
[ ] Section content added
[ ] Bullets added
[ ] Callout type is tip/important/note
[ ] Code language added
[ ] Filename added
[ ] Code added
[ ] Post published
[ ] Public article tested
```

---

# 34. Local Development Setup

Clone the repository:

```bash
git clone https://github.com/ganjeliyajay/GJ-Tech-Blog.git
```

Move into the project:

```bash
cd GJ-Tech-Blog
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env.local
```

Add required environment variables.

Example:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
```

Then start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 35. Production Build

Before deployment:

```bash
npm run lint
```

Then:

```bash
npm run build
```

If the build succeeds:

```bash
npm start
```

---

# 36. Vercel Deployment

The current production deployment is associated with:

```text
https://gj-tech-blog.vercel.app/
```

Recommended deployment flow:

```text
GitHub
   ↓
Vercel
   ↓
Next.js Build
   ↓
Production
```

Environment variables must be configured in Vercel.

At minimum, configure the same Sanity variables used locally:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

After changing environment variables, trigger a new deployment.

---

# 37. Git Workflow

Recommended workflow:

```bash
git status
```

Review changes:

```bash
git diff
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: add new blog article"
```

Push:

```bash
git push origin main
```

---

# 38. Recommended Commit Convention

Use simple conventional-style commits:

```text
feat: add blog article
fix: resolve article rendering issue
style: improve article card UI
refactor: simplify Sanity query
perf: optimize image loading
docs: update project documentation
chore: update dependencies
```

---

# 39. Adding a New Category

Do not simply type an arbitrary category in Sanity.

First update the category list in:

```text
sanity/schemaTypes/post.ts
```

Example:

```ts
options: {
  list: [
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
    "New Category",
  ],
}
```

Then deploy/update Sanity Studio.

---

# 40. Adding a New Callout Type

Current allowed values are:

```text
tip
important
note
```

If a new type is required, update both:

```text
sanity/schemaTypes/post.ts
```

and the frontend rendering logic.

For example:

```text
warning
success
info
```

should not be added only from the CMS side without updating the frontend.

---

# 41. Image Handling

Sanity images are stored as assets.

The GROQ queries convert the asset reference into a URL:

```groq
"image": image.asset->url
```

Author avatars use:

```groq
"avatar": avatar.asset->url
```

When adding image support:

- Keep images optimized.
- Use descriptive alt text where the frontend supports it.
- Avoid unnecessarily huge images.
- Preserve the existing Sanity image workflow.

---

# 42. Search Architecture

The project has a dedicated:

```text
searchPostsQuery
```

The search system can use:

```text
title
excerpt
category
tags
sections
```

When improving search:

1. Fetch only fields needed for search.
2. Avoid downloading unnecessary code snippets.
3. Keep search results lightweight.
4. Debounce client-side search input if requests are triggered interactively.
5. Preserve the existing search UI.

---

# 43. Performance Guidelines

When modifying this project:

### Prefer Server Components

Use Server Components by default.

Only add:

```tsx
"use client";
```

when client-side state, browser APIs, event handlers, or client-only libraries are required.

### Avoid unnecessary fetching

Use focused GROQ queries.

### Avoid unnecessary re-renders

Keep state local when possible.

### Optimize images

Use appropriate dimensions and lazy loading where appropriate.

### Avoid unnecessary animation

Animation should support the interface rather than distract from content.

---

# 44. Security Guidelines

Never commit:

```text
.env
.env.local
API keys
Sanity tokens
private credentials
service-role keys
passwords
```

Use environment variables.

If a secret is accidentally exposed:

1. Rotate the secret.
2. Remove it from the source.
3. Check Git history.
4. Update deployment environment variables.
5. Redeploy.

---

# 45. Common Sanity Problems

## Problem: Missing project ID

Error:

```text
Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.
```

Fix:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
```

Restart the development server.

---

## Problem: Missing dataset

Error:

```text
Missing NEXT_PUBLIC_SANITY_DATASET environment variable.
```

Fix:

```env
NEXT_PUBLIC_SANITY_DATASET=...
```

Restart Next.js.

---

## Problem: Article not appearing

Check:

```text
[ ] Document is published
[ ] _type is post
[ ] Date exists
[ ] Slug exists
[ ] Image exists if required by UI
[ ] Required fields are populated
```

Then inspect the GROQ query.

---

## Problem: Article page says Not Found

Check:

```text
slug.current
```

and compare it with the URL.

For example:

```text
Sanity:
react-js-performance-optimization

URL:
/blog/react-js-performance-optimization
```

They must match.

---

# 46. Common React / Next.js Problems

## Hydration mismatch

Check:

- Browser-only APIs
- Random values
- Date/time rendering
- Client/server conditional rendering
- Theme state
- Extensions modifying HTML

Avoid rendering different markup on server and client.

---

## Duplicate key warning

Every `.map()` should use a stable unique key:

```tsx
items.map((item) => (
  <Component key={item.id} />
))
```

Avoid:

```tsx
key=""
```

or duplicated values.

---

## Build error from icon imports

Verify the icon exists in the installed:

```text
lucide-react
```

version before importing it.

---

# 47. Content Writing Guidelines

Every article should aim to be:

- Practical
- Technical
- Easy to scan
- Developer-focused
- Based on real implementation
- Supported by examples
- Clear about trade-offs

Recommended article structure:

```text
Introduction
↓
Problem
↓
Concept
↓
Implementation
↓
Code Example
↓
Best Practices
↓
Common Mistakes
↓
Conclusion
```

---

# 48. Blog Content Quality Checklist

Before publishing:

```text
[ ] Title is clear
[ ] Title is not unnecessarily long
[ ] Excerpt is useful
[ ] Category is correct
[ ] Tags are relevant
[ ] Cover image matches the topic
[ ] Introduction explains the problem
[ ] Sections have meaningful headings
[ ] Code examples are valid
[ ] Code filenames are accurate
[ ] No placeholder text
[ ] No broken links
[ ] No spelling errors
[ ] Conclusion summarizes the key lesson
```

---

# 49. Recommended Future Improvements

Potential future improvements for GJ Tech:

## Content

```text
[ ] Draft/published workflow
[ ] Related articles
[ ] Previous/next article navigation
[ ] Reading progress
[ ] Table of contents
[ ] Estimated reading time automation
[ ] Author profile pages
[ ] Category pages
[ ] Tag pages
```

## SEO

```text
[ ] Per-post metadata
[ ] Dynamic Open Graph images
[ ] Article structured data / JSON-LD
[ ] Sitemap
[ ] Robots configuration
[ ] Canonical URLs
[ ] Better internal linking
```

## Performance

```text
[ ] Image optimization review
[ ] Bundle analysis
[ ] Search optimization
[ ] Query optimization
[ ] Caching strategy
[ ] Core Web Vitals monitoring
```

## UX

```text
[ ] Better mobile navigation
[ ] Article table of contents
[ ] Copy-code button
[ ] Code syntax highlighting
[ ] Share article actions
[ ] Reading progress indicator
[ ] Related article recommendations
```

---

# 50. Development Rules for This Project

When adding or modifying features:

### Rule 1

Do not change the existing UI unnecessarily.

### Rule 2

Reuse existing components before creating duplicates.

### Rule 3

Reuse the existing Sanity client.

### Rule 4

Reuse existing GROQ queries when they already satisfy the requirement.

### Rule 5

Do not duplicate Sanity configuration.

### Rule 6

Do not expose secrets.

### Rule 7

Prefer TypeScript types over `any`.

### Rule 8

Use Server Components by default.

### Rule 9

Use `"use client"` only where necessary.

### Rule 10

Run:

```bash
npm run lint
npm run build
```

before pushing major changes.

---

# 51. AI Coding Instructions

When using ChatGPT, Claude, Cursor, Copilot, or another coding assistant on this project, provide this context:

```text
This is the GJ Tech Blog project.

Stack:
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity CMS
- GROQ
- Framer Motion
- Lucide React

Content comes from Sanity.

Do not replace Sanity with another CMS.

Do not redesign existing UI unless explicitly requested.

Reuse existing components and utilities.

Keep the current architecture.

Before modifying code:
1. Inspect the existing implementation.
2. Identify the smallest required change.
3. Preserve existing props and data structures.
4. Preserve responsive behavior.
5. Preserve dark theme support.
6. Avoid unnecessary dependencies.
7. Run lint/build checks after changes.

For blog content, follow the existing post schema:
title
slug
excerpt
category
tags
image
author
date
readingTime
featured
trendingRank
sections
bullets
callout
codeSnippet

For section callouts, only use:
tip
important
note
```

---

# 52. Current Verified Project Facts

The public GitHub repository currently identifies:

```text
Repository:
ganjeliyajay/GJ-Tech-Blog
```

The repository is public and currently contains the major directories:

```text
app
components
context
lib
public
sanity/schemaTypes
types
```

It also contains configuration files including:

```text
package.json
next.config.ts
sanity.cli.ts
sanity.config.ts
postcss.config.mjs
tsconfig.json
eslint.config.mjs
```

The repository currently has a Vercel deployment link associated with:

```text
https://gj-tech-blog.vercel.app/
```

---

# 53. Important Documentation Maintenance Rule

This file should be updated whenever one of these changes:

```text
[ ] New dependency
[ ] New environment variable
[ ] New Sanity schema
[ ] New category
[ ] New query
[ ] New route
[ ] New major component
[ ] Authentication added
[ ] Search architecture changed
[ ] Deployment architecture changed
[ ] Database/backend added
```

The goal is for this document to remain the single source of truth for understanding the GJ Tech Blog project.

---

# 54. Quick Start

For a new developer:

```bash
git clone https://github.com/ganjeliyajay/GJ-Tech-Blog.git

cd GJ-Tech-Blog

npm install

# create .env.local
# add Sanity environment variables

npm run dev
```

Then open:

```text
http://localhost:3000
```

Sanity Studio:

```text
http://localhost:3000/studio
```

Production:

```text
https://gj-tech-blog.vercel.app/
```

---

# 55. Final Project Goal

GJ Tech should evolve into a polished developer publication where:

```text
Sanity
  ↓
Structured technical content
  ↓
Next.js
  ↓
Fast and accessible UI
  ↓
SEO-friendly article pages
  ↓
Developer-focused reading experience
  ↓
Vercel Production
```

The project should remain:

- Maintainable
- Fast
- Responsive
- SEO-friendly
- Content-driven
- Developer-focused
- Easy to extend
- Easy to deploy

---

## Repository

https://github.com/ganjeliyajay/GJ-Tech-Blog

## Production

https://gj-tech-blog.vercel.app/
