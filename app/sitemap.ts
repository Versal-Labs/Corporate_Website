// app/sitemap.ts

import { MetadataRoute } from 'next';
import { client } from '../sanity/versal-labs/lib/client'; // Adjust the import path to your client
import { groq } from 'next-sanity';

// Define the type for the data we'll fetch
type Post = {
  slug: string;
  _updatedAt: string; // The last time the document was updated in Sanity
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://versallabs.lk';

  // 1. Fetch all published posts from Sanity
  const postsQuery = groq`*[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
  }`;
  
  const posts: Post[] = await client.fetch(postsQuery);

  const blogPostUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    priority: 0.8,
  }));

  // 2. Define your static pages
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9 },
    // Add other static pages like /privacy, /terms etc.
    { url: `${baseUrl}/privacy`, lastModified: new Date('2025-08-22'), priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2025-08-22'), priority: 0.7 },
    { url: `${baseUrl}/cookies`, lastModified: new Date('2025-08-22'), priority: 0.7 },
  ];

  // 3. Combine and return all URLs
  return [...staticUrls, ...blogPostUrls];
}