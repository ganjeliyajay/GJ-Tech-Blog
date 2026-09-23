import { groq } from "next-sanity";


export const postsQuery = groq`
  *[
    _type == "post" &&
    language == $locale
  ]
  | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,

    language,
    translationId,

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
  *[
    _type == "post" &&
    slug.current == $slug &&
    language == $locale
  ][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,

    language,
    translationId,

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
    language == $locale &&
    featured == true
  ]
  | order(date desc)[0] {
    "id": _id,
    title,
    "image": image.asset->url,
    "slug": slug.current,
    tags,
    readingTime,

    language,
    translationId,

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
      language == $locale &&
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
  *[
    _type == "post" &&
    language == $locale
  ]
  | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    tags,
    readingTime,
    date,
    "image": image.asset->url,

    language,
    translationId,

    sections[] {
      title,
      content
    }
  }
`;

export const translationVariantsQuery = groq`
  *[
    _type == "post" &&
    translationId == $translationId
  ] {
    "id": _id,
    "slug": slug.current,
    title,
    language,
    translationId
  }
`;
export const postBySlugAnyLocaleQuery = groq`
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    "id": _id,
    "slug": slug.current,
    title,
    language,
    translationId
  }
`;