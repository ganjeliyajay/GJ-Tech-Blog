import { defineField, defineType } from "sanity";

export const blogAutomationTopicType = defineType({
    name: "blogAutomationTopic",
    title: "Blog Automation Topic",
    type: "document",
    fields: [
        defineField({
            name: "topic",
            title: "Topic",
            type: "string",
            validation: (Rule) => Rule.required().min(3),
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Processing", value: "processing" },
                    { title: "Completed", value: "completed" },
                    { title: "Failed", value: "failed" },
                ],
                layout: "radio",
            },
            initialValue: "pending",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "processedAt",
            title: "Processed At",
            type: "datetime",
        }),
        defineField({
            name: "translationId",
            title: "Translation ID",
            type: "string",
        }),
        defineField({
            name: "error",
            title: "Error",
            type: "text",
        }),
    ],
    preview: {
        select: {
            title: "topic",
            status: "status",
            createdAt: "createdAt",
        },
        prepare({ title, status, createdAt }) {
            return {
                title,
                subtitle: `${status ?? "pending"} • ${createdAt ?? ""}`,
            };
        },
    },
});