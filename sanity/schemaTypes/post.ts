import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Blog Post",
    type: "document",

    fields: [
        defineField({
            name: "language",
            title: "Language",
            type: "string",
            options: {
                list: [
                    {
                        title: "English",
                        value: "en",
                    },
                    {
                        title: "Gujarati",
                        value: "gu",
                    },
                    {
                        title: "Hindi",
                        value: "hi",
                    },
                ],
                layout: "radio",
            },
            initialValue: "en",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "translationId",
            title: "Translation Group ID",
            description:
                "Use the same Translation Group ID for English, Gujarati and Hindi versions of the same article.",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: 'title'
            }
        }),

        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "string",

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
                ],
            },

            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "image",
            title: "Cover Image",
            type: "image",

            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "author",
            title: "Author",
            type: "object",

            fields: [
                defineField({
                    name: "name",
                    title: "Name",
                    type: "string",
                }),

                defineField({
                    name: "role",
                    title: "Role",
                    type: "string",
                }),

                defineField({
                    name: "avatar",
                    title: "Avatar",
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                }),
            ],
        }),

        defineField({
            name: "date",
            title: "Published Date",
            type: "date",
            initialValue: () => new Date().toISOString().split("T")[0],
        }),

        defineField({
            name: "readingTime",
            title: "Reading Time",
            type: "string",
        }),

        defineField({
            name: "featured",
            title: "Featured Article",
            type: "boolean",
            initialValue: false,
        }),

        defineField({
            name: "trendingRank",
            title: "Trending Rank",
            type: "number",
        }),

        defineField({
            name: "sections",
            title: "Article Sections",
            type: "array",

            of: [
                {
                    type: "object",

                    fields: [
                        defineField({
                            name: "id",
                            title: "Section ID",
                            type: "string",
                        }),

                        defineField({
                            name: "title",
                            title: "Section Title",
                            type: "string",
                        }),

                        defineField({
                            name: "content",
                            title: "Content",
                            type: "array",

                            of: [
                                {
                                    type: "text",
                                },
                            ],
                        }),

                        defineField({
                            name: "bullets",
                            title: "Bullet Points",
                            type: "array",
                            of: [{ type: "string" }],
                        }),

                        defineField({
                            name: "callout",
                            title: "Callout",
                            type: "object",
                            fields: [
                                defineField({
                                    name: "type",
                                    title: "Callout Type",
                                    type: "string",
                                    options: {
                                        list: [
                                            { title: "Tip", value: "tip" },
                                            { title: "Important", value: "important" },
                                            { title: "Note", value: "note" },
                                        ],
                                    },
                                }),
                                defineField({
                                    name: "text",
                                    title: "Callout Text",
                                    type: "text",
                                    rows: 3,
                                }),
                            ],
                        }),

                        defineField({
                            name: "codeSnippet",
                            title: "Code Snippet",
                            type: "object",
                            fields: [
                                defineField({
                                    name: "language",
                                    title: "Language",
                                    type: "string",
                                }),
                                defineField({
                                    name: "filename",
                                    title: "Filename",
                                    type: "string",
                                }),
                                defineField({
                                    name: "code",
                                    title: "Code",
                                    type: "text",
                                    rows: 15,
                                }),
                            ],
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "bullets",
            title: "Bullet Points",
            type: "array",

            of: [
                {
                    type: "string",
                },
            ],
        }),

        defineField({
            name: "callout",
            title: "Callout",
            type: "object",

            fields: [
                defineField({
                    name: "type",
                    title: "Callout Type",
                    type: "string",

                    options: {
                        list: [
                            {
                                title: "Tip",
                                value: "tip",
                            },
                            {
                                title: "Important",
                                value: "important",
                            },
                            {
                                title: "Note",
                                value: "note",
                            },
                        ],
                    },
                }),

                defineField({
                    name: "text",
                    title: "Callout Text",
                    type: "text",
                    rows: 3,
                }),
            ],
        }),

        defineField({
            name: "codeSnippet",
            title: "Code Snippet",
            type: "object",

            fields: [
                defineField({
                    name: "language",
                    title: "Language",
                    type: "string",
                }),

                defineField({
                    name: "filename",
                    title: "Filename",
                    type: "string",
                }),

                defineField({
                    name: "code",
                    title: "Code",
                    type: "text",
                    rows: 15,
                }),
            ],
        }),
    ],
});