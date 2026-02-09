import { groq } from "next-sanity"

// Blog queries
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`

// Blog queries
export const RECENT_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0...3] {
    ...,
    "slug": slug.current,
    mainImage,
    "author": author->{name},
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current,
    }
  }
`

// Portfolio queries
export const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && defined(slug.current)] | order(_createdAt desc)`

export const PORTFOLIO_ITEM_QUERY = groq`*[_type == "portfolio" && slug.current == $slug][0]`

// Product queries
export const PRODUCTS_QUERY = groq`*[_type == "product" && defined(slug.current)] | order(_createdAt desc)`

export const PRODUCT_QUERY = groq`*[_type == "product" && slug.current == $slug][0]`

// Featured content queries
export const FEATURED_PRODUCTS_QUERY = groq`*[_type == "product" && featured == true] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  features,
  technologies,
  category,
  status
}`

export const FEATURED_PORTFOLIO_QUERY = groq`*[_type == "portfolio" && featured == true] | order(_createdAt desc)[0...6]`
