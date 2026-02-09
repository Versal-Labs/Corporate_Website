import { client } from "../sanity/versal-labs/lib/client"
import {
  POSTS_QUERY,
  POST_QUERY,
  RECENT_POSTS_QUERY,
  PORTFOLIO_QUERY,
  PORTFOLIO_ITEM_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
  FEATURED_PRODUCTS_QUERY,
  FEATURED_PORTFOLIO_QUERY,
} from "../sanity/versal-labs/lib/queries"


// Check if Sanity is properly configured
const isSanityConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    process.env.NEXT_PUBLIC_SANITY_API_VERSION
  )
}

// Enhanced error handling with retry logic
async function fetchWithRetry<T>(fetchFn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
  try {
    return await fetchFn()
  } catch (error: any) {
    if (retries > 0 && (error?.statusCode === 429 || error?.statusCode >= 500)) {
      console.warn(`Retrying request in ${delay}ms... (${retries} retries left)`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return fetchWithRetry(fetchFn, retries - 1, delay * 2)
    }
    throw error
  }
}

// Blog functions
export async function getPosts() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning empty posts array")
    return []
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return []
  }

  try {
    const data = await fetchWithRetry(() => client.fetch(POSTS_QUERY))
    return data
  } catch (error: any) {
    console.error("Error fetching posts:", error)

    // Check for CORS errors
    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return []
  }
}

export async function getPost(slug: string) {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning null for post")
    return null
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return null
  }

  try {
    const data = await fetchWithRetry(() => client.fetch(POST_QUERY, { slug }))
    return data
  } catch (error: any) {
    console.error("Error fetching post:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return null
  }
}

export async function getRecentPosts() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning empty recent posts array")
    return []
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return []
  }

  try {
    return await fetchWithRetry(() => client.fetch(RECENT_POSTS_QUERY))
  } catch (error: any) {
    console.error("Error fetching recent posts:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return []
  }
}

// Portfolio functions
export async function getPortfolioItems() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning empty portfolio array")
    return []
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return []
  }

  try {
    return await fetchWithRetry(() => client.fetch(PORTFOLIO_QUERY))
  } catch (error: any) {
    console.error("Error fetching portfolio items:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return []
  }
}

export async function getPortfolioItem(slug: string) {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning null for portfolio item")
    return null
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return null
  }

  try {
    return await fetchWithRetry(() => client.fetch(PORTFOLIO_ITEM_QUERY, { slug }))
  } catch (error: any) {
    console.error("Error fetching portfolio item:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return null
  }
}

export async function getFeaturedPortfolio() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning mock portfolio data")
    return []
  }

  if (!client) {
    console.error("Sanity client not initialized, returning mock data")
    return []
  }

  try {
    return await fetchWithRetry(() => client.fetch(FEATURED_PORTFOLIO_QUERY))
  } catch (error: any) {
    console.error("Error fetching featured portfolio:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return []
  }
}

// Product functions
export async function getProducts() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning empty products array")
    return []
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return []
  }

  try {
    return await fetchWithRetry(() => client.fetch(PRODUCTS_QUERY))
  } catch (error: any) {
    console.error("Error fetching products:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return []
  }
}

export async function getProduct(slug: string) {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning null for product")
    return null
  }

  if (!client) {
    console.error("Sanity client not initialized")
    return null
  }

  try {
    return await fetchWithRetry(() => client.fetch(PRODUCT_QUERY, { slug }))
  } catch (error: any) {
    console.error("Error fetching product:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return null
  }
}

export async function getFeaturedProducts() {
  if (!isSanityConfigured()) {
    console.warn("Sanity not configured, returning mock products data")
    return getMockProductsData()
  }

  if (!client) {
    console.error("Sanity client not initialized, returning mock data")
    return getMockProductsData()
  }

  try {
    const data = await fetchWithRetry(() => client.fetch(FEATURED_PRODUCTS_QUERY))
    return data.length > 0 ? data : getMockProductsData()
  } catch (error: any) {
    console.error("Error fetching featured products:", error)

    if (error?.message?.includes("CORS") || error?.message?.includes("Access-Control")) {
      console.error("CORS Error: Make sure your domain is added to Sanity CORS origins")
    }

    return getMockProductsData()
  }
}

// Mock data functions for when Sanity is not configured
function getMockPortfolioData(): PortfolioItem[] {
  return [
    {
      _id: "mock-1",
      title: "E-Commerce Platform",
      slug: { current: "ecommerce-platform" },
      description:
        "A modern e-commerce solution built with Next.js and Stripe integration for seamless online shopping experiences.",
      technologies: ["Next.js", "React", "Stripe", "Tailwind CSS", "PostgreSQL"],
      category: "web",
      status: "completed",
      featured: true,
      completedAt: "2024-01-15",
      content: [],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example/ecommerce",
    },
    {
      _id: "mock-2",
      title: "Mobile Banking App",
      slug: { current: "mobile-banking-app" },
      description:
        "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
      technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric Auth"],
      category: "mobile",
      status: "completed",
      featured: true,
      completedAt: "2023-12-10",
      content: [],
      client: "FinTech Solutions Ltd",
    },
    {
      _id: "mock-3",
      title: "AI Analytics Dashboard",
      slug: { current: "ai-analytics-dashboard" },
      description:
        "Intelligent analytics platform using machine learning to provide business insights and predictive analytics.",
      technologies: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
      category: "ai",
      status: "completed",
      featured: true,
      completedAt: "2024-02-20",
      content: [],
      projectUrl: "https://analytics.example.com",
    },
  ]
}

function getMockProductsData(): Product[] {
  return [
    {
      _id: "mock-product-1",
      title: "Ceylon Wellness",
      slug: { current: "ceylon-wellness" },
      description:
        "A modern mobile app promoting mindfulness and holistic well-being for Sri Lankans. Features guided meditations, health tracking, Ayurvedic tips, and community support in local languages.",
      features: ["Meditation", "Health Tracking", "Ayurvedic Guidance", "Sinhala & Tamil Support"],
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      category: "mobile",
      status: "live",
      featured: true,
      launchDate: "2024-01-01",
      content: [],
      pricing: {
        model: "freemium",
        price: "Free with Premium at $4.99/month",
      },
      productUrl: "https://ceylonwellness.app",
      demoUrl: "https://demo.ceylonwellness.app",
    },
  ]
}

// Types
export interface Post {
  _id: string
  title: string
  slug: string
  author?: {
    name: string
    image?: any
    bio?: any
  }
  mainImage?: any
  categories?: Array<{
    title: string
    slug: string
  }>
  publishedAt?: string
  excerpt?: string
  body: any
  featured?: boolean
  readTime?: number
  tags?: string[]
}

export interface PortfolioItem {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  gallery?: any[]
  description?: string
  content: any
  technologies?: string[]
  category?: string
  client?: string
  projectUrl?: string
  githubUrl?: string
  completedAt?: string
  featured?: boolean
  status?: string
}

export interface Product {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  gallery?: any[]
  description?: string
  content: any
  features?: string[]
  technologies?: string[]
  category?: string
  status?: string
  productUrl?: string
  demoUrl?: string
  pricing?: {
    model: string
    price: string
  }
  launchDate?: string
  featured?: boolean
}