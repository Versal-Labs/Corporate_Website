// app/sitemap.ts

import { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { siteConfig } from '@/lib/seo';
import { canonicalBlogSlug } from '@/lib/blog';
import { getPosts, type Post } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const posts: Post[] = await getPosts();

  const blogPostUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${canonicalBlogSlug(post.slug)}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 2. Define your static pages
  const staticUrls = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/products`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/careers`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // 3. Combine and return all URLs
  return [...staticUrls, ...serviceUrls, ...blogPostUrls];
}
