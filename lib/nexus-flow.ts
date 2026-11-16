import type { PortfolioItem, Product } from "@/lib/sanity"

export const nexusFlowPath = "/products/nexus-flow"
export const nexusFlowDescription =
  "Nexus Flow ERP connects inventory, sales, customer credit, garment production, finance, and payroll for clothing wholesale distributors in Sri Lanka."

// Add approved product screenshots and customer quotes here when available.
// Empty arrays keep unfinished content out of the public page.
export const nexusFlowScreenshots: { src: string; alt: string; caption: string }[] = []
export const nexusFlowTestimonials: { quote: string; name: string; company: string }[] = []

export const nexusFlowFaqs = [
  {
    question: "Who is Nexus Flow designed for?",
    answer: "Nexus Flow is designed for large clothing wholesale distributors in Sri Lanka, including businesses that manage garment production and outsourced sewing alongside trading and distribution.",
  },
  {
    question: "Can we track different sizes and colours?",
    answer: "Yes. Each size and colour variation can have a separate SKU, cost, and selling price. You can also generate barcode labels with configurable price, size, and colour details.",
  },
  {
    question: "Can it manage outsourced sewing and production costs?",
    answer: "Yes. Track bills of materials, production orders, materials issued to contractors, unused material returns, partial deliveries, and sewing charges. Nexus Flow also tracks work in progress, finished-goods costs, normal waste, abnormal loss, and losses recoverable from contractors.",
  },
  {
    question: "What can our sales representatives access?",
    answer: "The default SalesRep role can manage customer records, browse the product catalogue, create and view orders and invoices, convert orders into invoices, download PDFs, and track their own invoice commissions. Recording customer receipts, processing returns, and accessing wider financial reports require additional permissions.",
  },
  {
    question: "How does pricing work?",
    answer: "Nexus Flow has a one-time licence payment, plus a monthly hosting and maintenance fee. Request a quotation to discuss your implementation, customisation, and ongoing support requirements.",
  },
  {
    question: "Will you help us move from our current system?",
    answer: "Yes. Versal Labs provides data migration, system setup, staff training, customisation, and ongoing support. We will discuss your current records and workflows as part of planning the implementation.",
  },
] as const

export const nexusFlowProduct: Product = {
  _id: "nexus-flow",
  title: "Nexus Flow ERP",
  slug: { current: "nexus-flow" },
  description: nexusFlowDescription,
  content: [],
  features: ["Size & colour variants", "Customer credit", "Garment production", "Finance & payroll"],
  category: "erp",
  status: "live",
  featured: true,
  productUrl: nexusFlowPath,
  demoUrl: undefined,
  pricing: { model: "one-time", price: "One-time licence + monthly hosting & maintenance" },
}

function isNexusFlow(item: { title: string; slug: { current: string } }) {
  return /^nexus[\s-]*(?:flow|erp)\b/i.test(item.title) ||
    /^nexus[\s-]*(?:flow|erp)(?:[\s-]|$)/i.test(item.slug.current)
}

export function withNexusFlowProduct(products: Product[]): Product[] {
  const existing = products.find(isNexusFlow)
  return [{ ...existing, ...nexusFlowProduct }, ...products.filter((product) => !isNexusFlow(product))]
}

export function withNexusFlowPortfolio(items: PortfolioItem[]): PortfolioItem[] {
  return items.map((item) => isNexusFlow(item) ? {
    ...item,
    title: nexusFlowProduct.title,
    description: nexusFlowDescription,
    projectUrl: nexusFlowPath,
  } : item)
}
