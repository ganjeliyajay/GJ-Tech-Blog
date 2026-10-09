import { groq } from "@/lib/groq";
import { adminClient } from "./sanity-admin";

export const categories = [
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
] as const;

export type Language = "en" | "gu" | "hi";

export type CalloutType =
    | "tip"
    | "important"
    | "note";

export type BlogSection = {
    id: string;
    title: string;
    content: string[];
    bullets: string[];
    callout: {
        type: CalloutType;
        text: string;
    };
    codeSnippet: {
        language: string;
        filename: string;
        code: string;
    };
};

export type GeneratedBlog = {
    title: string;
    excerpt: string;
    category: (typeof categories)[number];
    tags: string[];
    readingTime: string;
    imagePrompt: string;
    sections: BlogSection[];
};

function normalizeStringArray(
    value: unknown
): string[] {
    if (Array.isArray(value)) {
        return value
            .filter(
                (item): item is string =>
                    typeof item === "string"
            )
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (
        typeof value === "string" &&
        value.trim()
    ) {
        return [value.trim()];
    }

    return [];
}

function normalizeCallout(
    value: unknown
): BlogSection["callout"] {
    if (
        value &&
        typeof value === "object"
    ) {
        const callout = value as {
            type?: string;
            text?: string;
        };

        const type =
            callout.type === "tip" ||
                callout.type === "important" ||
                callout.type === "note"
                ? callout.type
                : "note";

        return {
            type,
            text:
                typeof callout.text === "string"
                    ? callout.text.trim()
                    : "",
        };
    }

    if (
        value === "tip" ||
        value === "important" ||
        value === "note"
    ) {
        return {
            type: value,
            text: "",
        };
    }

    return {
        type: "note",
        text: "",
    };
}

function normalizeCodeSnippet(
    value: unknown
): BlogSection["codeSnippet"] {
    if (
        value &&
        typeof value === "object"
    ) {
        const code = value as {
            language?: string;
            filename?: string;
            code?: string;
        };

        return {
            language:
                typeof code.language === "string"
                    ? code.language.trim()
                    : "",
            filename:
                typeof code.filename === "string"
                    ? code.filename.trim()
                    : "",
            code:
                typeof code.code === "string"
                    ? code.code
                    : "",
        };
    }

    return {
        language: "",
        filename: "",
        code: "",
    };
}

function normalizeBlog(
    rawBlog: any
): GeneratedBlog {
    if (
        !rawBlog ||
        typeof rawBlog !== "object"
    ) {
        throw new Error(
            "AI returned invalid blog data."
        );
    }

    if (
        !rawBlog.title ||
        typeof rawBlog.title !== "string"
    ) {
        throw new Error(
            "Generated blog title is missing."
        );
    }

    if (
        !rawBlog.excerpt ||
        typeof rawBlog.excerpt !== "string"
    ) {
        throw new Error(
            "Generated blog excerpt is missing."
        );
    }

    if (
        !categories.includes(rawBlog.category)
    ) {
        throw new Error(
            `Invalid category generated: ${rawBlog.category}`
        );
    }

    if (
        !Array.isArray(rawBlog.sections) ||
        rawBlog.sections.length === 0
    ) {
        throw new Error(
            "Generated blog sections are missing."
        );
    }

    const sections: BlogSection[] =
        rawBlog.sections.map(
            (section: any, index: number) => ({
                id:
                    typeof section.id === "string" &&
                        section.id.trim()
                        ? section.id.trim()
                        : `section-${index + 1}`,

                title:
                    typeof section.title === "string" &&
                        section.title.trim()
                        ? section.title.trim()
                        : `Section ${index + 1}`,

                content:
                    normalizeStringArray(
                        section.content
                    ),

                bullets:
                    normalizeStringArray(
                        section.bullets
                    ),

                callout:
                    normalizeCallout(
                        section.callout
                    ),

                codeSnippet:
                    normalizeCodeSnippet(
                        section.codeSnippet
                    ),
            })
        );

    const conclusionIndex =
        sections.findIndex(
            (section) =>
                section.title
                    .toLowerCase()
                    .trim() === "conclusion"
        );

    if (
        conclusionIndex !== -1 &&
        conclusionIndex !==
        sections.length - 1
    ) {
        const conclusion =
            sections.splice(
                conclusionIndex,
                1
            )[0];

        sections.push(conclusion);
    }

    return {
        title: rawBlog.title.trim(),

        excerpt: rawBlog.excerpt
            .trim()
            .slice(0, 200),

        category: rawBlog.category,

        tags:
            normalizeStringArray(
                rawBlog.tags
            ),

        readingTime:
            typeof rawBlog.readingTime === "string"
                ? rawBlog.readingTime
                : "5 min read",

        imagePrompt:
            typeof rawBlog.imagePrompt === "string"
                ? rawBlog.imagePrompt
                : "",

        sections,
    };
}

const blogJsonInstruction = `
Return ONLY valid JSON.

The JSON must have exactly these top-level fields:

{
  "title": "string",
  "excerpt": "string",
  "category": "string",
  "tags": ["string"],
  "readingTime": "string",
  "imagePrompt": "string",
  "sections": []
}

Each section MUST be:

{
  "id": "string",
  "title": "string",
  "content": ["string"],
  "bullets": ["string"],
  "callout": {
    "type": "tip",
    "text": "string"
  },
  "codeSnippet": {
    "language": "string",
    "filename": "string",
    "code": "string"
  }
}

content MUST always be an array.

bullets MUST always be an array.

callout MUST always be an object.

codeSnippet MUST always be an object.

The final section MUST be "Conclusion".

A "Key Takeaways" section must appear immediately before Conclusion.

Do not return markdown.

Do not return code fences.

Do not return explanations outside JSON.
`;

export async function generateEnglishBlog(
    topic: string
): Promise<GeneratedBlog> {
    const response =
        await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            reasoning_effort: "low",
            include_reasoning: false,
            temperature: 0.4,
            messages: [
                {
                    role: "system",
                    content: `
You are a senior technical writer for GJ Tech Blog.

Create high-quality technical articles for:

- Beginners
- Students
- Junior developers
- Developers preparing for interviews
- Working developers

Write ONLY in simple, clear English.

Use short sentences.

Explain difficult concepts in simple words.

Prefer practical examples.

Do not invent APIs, libraries, commands,
methods or technical facts.

Do not create fake documentation references.

Use modern and commonly used approaches.

Create 5-8 meaningful sections.

The article must contain:

- A natural introduction
- Main concept
- How it works
- Practical examples
- Important points
- Common mistakes when relevant
- Key Takeaways
- Conclusion

The last section MUST be "Conclusion".

Nothing should come after Conclusion.

Callout types can only be:

tip

important

note

Code should only be included when useful.

If code is not useful:

{
  "language": "",
  "filename": "",
  "code": ""
}

Generate:

- SEO-friendly title
- excerpt <= 200 characters
- 4-8 relevant tags
- valid category
- realistic reading time
- imagePrompt

Allowed categories:

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

${blogJsonInstruction}
`,
                },
                {
                    role: "user",
                    content: `
Create a complete technical blog article about:

${topic}

Make it practical, beginner-friendly and easy to understand.

Use simple English while maintaining technical accuracy.

Focus on useful knowledge that a developer can actually apply.
`,
                },
            ],
            response_format: {
                type: "json_object",
            },
            max_completion_tokens: 16000,
        });

    const content =
        response.choices[0]?.message?.content;

    if (!content) {
        throw new Error(
            "Groq returned an empty response."
        );
    }

    let rawBlog: any;

    try {
        rawBlog = JSON.parse(content);
    } catch {
        console.error(
            "Invalid Groq JSON:",
            content
        );

        throw new Error(
            "Groq returned invalid JSON."
        );
    }

    return normalizeBlog(rawBlog);
}

export async function translateBlog(
    blog: GeneratedBlog,
    language: "gu" | "hi"
): Promise<GeneratedBlog> {
    const languageName =
        language === "gu" ? "Gujarati" : "Hindi";

    const response =
        await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            reasoning_effort: "low",
            include_reasoning: false,
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: `
You are a professional technical translator for GJ Tech Blog.

Translate the provided English technical article into ${languageName}.

IMPORTANT TRANSLATION RULES:

1. Translate the TITLE into ${languageName}.
2. Translate the EXCERPT into ${languageName}.
3. The title and excerpt MUST NOT remain identical to the English source unless a technical term genuinely has no natural translation.
4. Translate all normal article content into ${languageName}.
5. Translate all section titles naturally into ${languageName}.
6. Translate all bullet-point text naturally into ${languageName}.
7. Translate callout.text naturally into ${languageName}.
8. Keep the exact technical meaning.
9. Do not add new information.
10. Do not remove information.
11. Keep the same number of sections.
12. Keep the same section order.
13. Keep the same section IDs.
14. Keep the same category exactly as the English article.
15. Keep the same tags conceptually.
16. Keep readingTime unchanged.
17. Keep imagePrompt unchanged.

TECHNICAL TERMS:

Keep technical terms in English when that is natural for developers.

Examples:

React
Next.js
JavaScript
TypeScript
Node.js
API
Server Component
props
state
hooks
async
await
component
function
interface
generics
conditional types

Do not leave the entire title or excerpt in English just because it contains technical terms.

Example:

English:
"Advanced TypeScript Generics and Conditional Types"

Gujarati:
"Advanced TypeScript Generics અને Conditional Types"

Hindi:
"Advanced TypeScript Generics और Conditional Types"

Translate the natural-language parts while preserving important technical terminology.

CODE RULES:

18. NEVER translate programming code.
19. NEVER modify programming code.
20. NEVER change code logic.
21. NEVER translate filenames.
22. Preserve language, filename and code exactly.
23. Preserve the exact codeSnippet structure.

STRUCTURE RULES:

24. Keep "Key Takeaways" conceptually immediately before Conclusion.
25. Preserve callout types exactly:

tip
important
note

26. Only translate callout.text.
27. Return the complete translated blog object.
28. Return ONLY valid JSON.
29. Do not return markdown.
30. Do not return explanations outside JSON.

VERY IMPORTANT:

The following fields MUST be translated:

- title
- excerpt
- section titles
- section content
- section bullets
- callout text

The following fields MUST remain controlled by the English master:

- category
- tags conceptually
- readingTime
- imagePrompt
- section IDs
- code language
- code filename
- code

${blogJsonInstruction}
`,
                },
                {
                    role: "user",
                    content: `
Translate this complete English article into ${languageName}.

DO NOT COPY THE ENGLISH TITLE OR ENGLISH EXCERPT.

The title and excerpt are part of the content and MUST be translated.

Translate naturally for Indian developers while keeping technical programming terminology in English where appropriate.

English article:

${JSON.stringify(blog)}
`,
                },
            ],
            response_format: {
                type: "json_object",
            },
            max_completion_tokens: 16000,
        });

    const content =
        response.choices[0]?.message?.content;

    if (!content) {
        throw new Error(
            `Groq returned an empty ${languageName} translation.`
        );
    }

    let rawTranslation: any;

    try {
        rawTranslation = JSON.parse(content);
    } catch {
        console.error(
            `Invalid ${languageName} JSON:`,
            content
        );

        throw new Error(
            `Groq returned invalid ${languageName} JSON.`
        );
    }

    const translated =
        normalizeBlog(rawTranslation);

    if (
        !translated.title ||
        translated.title.trim() === blog.title.trim()
    ) {
        console.warn(
            `${languageName} title appears to be unchanged from English.`
        );
    }

    if (
        !translated.excerpt ||
        translated.excerpt.trim() === blog.excerpt.trim()
    ) {
        console.warn(
            `${languageName} excerpt appears to be unchanged from English.`
        );
    }

    translated.category =
        blog.category;

    translated.readingTime =
        blog.readingTime;

    translated.imagePrompt =
        blog.imagePrompt;

    translated.tags =
        blog.tags;

    translated.sections =
        translated.sections.map(
            (section, index) => ({
                ...section,
                codeSnippet:
                    blog.sections[index]?.codeSnippet ?? {
                        language: "",
                        filename: "",
                        code: "",
                    },
            })
        );

    return translated;
}

export const createSanityDraft = async (
    blog: GeneratedBlog,
    language: Language,
    translationId: string,
    slug: string
) => {
    if (!slug) {
        throw new Error(
            `Invalid slug for ${language} blog.`
        );
    }

    const draftId = `drafts.${translationId}-${language}`;

    const draftDocument = {
        _id: draftId,
        _type: "post",
        language,
        translationId,
        title: blog.title,
        slug: {
            _type: "slug",
            current: slug,
        },
        excerpt: blog.excerpt
            .trim()
            .slice(0, 200),
        category: blog.category,
        tags: blog.tags,
        author: {
            name: "Ganjeliya Jay",
            role: "React Developer",
        },
        date: new Date()
            .toISOString()
            .split("T")[0],
        readingTime:
            blog.readingTime,
        featured: false,
        trendingRank: 0,
        sections: blog.sections.map(
            (section, index) => ({
                _type: "object",
                _key:
                    `${section.id}-${index}`,
                id: section.id,
                title: section.title,
                content:
                    section.content,
                bullets:
                    section.bullets,
                callout:
                    section.callout,
                codeSnippet:
                    section.codeSnippet,
            })
        ),
        bullets: [],
        callout: undefined,
        codeSnippet: undefined,
    };

    await adminClient.createOrReplace(
        draftDocument
    );

    return {
        draftId,
        slug,
        language,
        translationId,
        title: blog.title,
    };
};
