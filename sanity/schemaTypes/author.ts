import { defineField, defineType } from 'sanity';

export const authorType = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 5,
        }),

        defineField({
            name: 'avatar',
            title: 'Avatar',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'socials',
            title: 'Social Links',
            type: 'object',
            fields: [
                defineField({
                    name: 'github',
                    title: 'GitHub',
                    type: 'url',
                }),

                defineField({
                    name: 'linkedin',
                    title: 'LinkedIn',
                    type: 'url',
                }),

                defineField({
                    name: 'twitter',
                    title: 'X / Twitter',
                    type: 'url',
                }),

                defineField({
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                }),
                defineField({
                    name: 'portfolio',
                    title: 'Portfolio',
                    type: 'url',
                }),
            ],
        }),
    ],
});