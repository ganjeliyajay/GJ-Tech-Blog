import { postBySlugAnyLocaleQuery, translationVariantsQuery } from "@/lib/queries";
import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const slug = searchParams.get("slug");
        if (!slug) {
            return NextResponse.json(
                {
                    error: "Slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const article = await client.fetch(postBySlugAnyLocaleQuery, { slug }, { cache: 'no-store' })
        if (!article) {
            return NextResponse.json(
                {
                    variants: [],
                },
                {
                    status: 200,
                }
            );
        }

        if (!article.translationId) {
            return NextResponse.json({
                variants: [],
            });
        }


        const variants = await client.fetch(translationVariantsQuery, { translationId: article.translationId }, { cache: 'no-store' })
        return NextResponse.json({
            variants,
        });

    } catch (error) {
        console.error(
            "Translation lookup error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Unable to load translations.",
            },
            {
                status: 500,
            }
        );
    }
}