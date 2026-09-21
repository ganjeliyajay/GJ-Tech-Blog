import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,

    author {
      name,
      role,
      "avatar": avatar.asset->url
    },

    date,
    readingTime,
    "image": image.asset->url,
    featured,
    trendingRank,

    sections[] {
      id,
      title,
      content,

      bullets[],

      callout {
        type,
        text
      },

      codeSnippet {
        language,
        filename,
        code
      }
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,

    author {
      name,
      role,
      "avatar": avatar.asset->url
    },

    date,
    readingTime,
    "image": image.asset->url,
    featured,
    trendingRank,

    sections[] {
      id,
      title,
      content,

      bullets[],

      callout {
        type,
        text
      },

      codeSnippet {
        language,
        filename,
        code
      }
    }
  }
`;

export const featuredArticleQuery = groq`
  *[
    _type == "post" &&
    featured == true
  ]
  | order(date desc)[0] {
    "id": _id,
    title,
    "image": image.asset->url,
    "slug": slug.current,
    tags,
    readingTime,

    author {
      name,
      role,
      "avatar": avatar.asset->url
    },

    category,
    date,
    excerpt
  }
`;

export const categoriesQuery = groq`
  array::unique(
    *[
      _type == "post" &&
      defined(category)
    ].category
  )
`;

export const authorQuery = groq`
  *[_type == "author"][0] {
    "id": _id,
    name,
    role,
    bio,
    "avatar": avatar.asset->url,
    skills,

    socials {
      github,
      linkedin,
      twitter,
      instagram,
      portfolio
    }
  }
`;

export const searchPostsQuery = groq`
  *[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,
    readingTime,
    date,
    "image": image.asset->url,

    sections[] {
      title,
      content
    }
  }
`;