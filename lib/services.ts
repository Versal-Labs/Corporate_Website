export type ServiceDefinition = {
  slug: string
  name: string
  shortName: string
  eyebrow: string
  description: string
  summary: string
  keywords: string[]
  capabilities: string[]
  outcomes: string[]
  process: Array<{ title: string; description: string }>
  technologies: string[]
  faqs: Array<{ question: string; answer: string }>
}
export const services: ServiceDefinition[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development in Sri Lanka",
    shortName: "Custom Software Development",
    eyebrow: "Software engineered around your business",
    description:
      "Custom software development services from Colombo, Sri Lanka for businesses that need secure, scalable web, mobile, API, and enterprise applications.",
    summary:
      "Versal Labs designs and develops software around the way your business actually works. We turn operational bottlenecks, disconnected tools, and new product ideas into maintainable digital systems that can grow with your team.",
    keywords: [
      "custom software development company Sri Lanka",
      "software development Colombo",
      "web application development Sri Lanka",
      "enterprise software development",
    ],
    capabilities: [
      "Business and technical discovery",
      "Web and mobile application development",
      "API design and third-party integrations",
      "Legacy system modernization",
      "Secure cloud deployment",
      "Ongoing product support and iteration",
    ],
    outcomes: [
      "Replace repetitive manual workflows with reliable automation",
      "Connect teams and data through one purpose-built system",
      "Launch new digital products without inheriting unnecessary platform limits",
      "Build on an architecture designed for future integrations and growth",
    ],
    process: [
      { title: "Discover", description: "We map users, workflows, constraints, success measures, and the highest-value first release." },
      { title: "Design", description: "We shape the user experience, system architecture, data model, and delivery roadmap before heavy development." },
      { title: "Build", description: "Short delivery cycles, visible progress, automated testing, and frequent stakeholder reviews keep the product aligned." },
      { title: "Launch and improve", description: "We deploy, monitor, document, and improve the product using real operational feedback." },
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Azure", "REST APIs", "Docker"],
    faqs: [
      { question: "How much does custom software development cost in Sri Lanka?", answer: "Cost depends on scope, integrations, security requirements, and delivery timeline. We begin with discovery and provide a phased estimate so you can validate the highest-value features before committing to a larger build." },
      { question: "Can Versal Labs modernize an existing application?", answer: "Yes. We can assess an existing codebase, stabilize critical areas, improve performance and security, or plan a staged migration that protects business continuity." },
      { question: "Do you work with international clients?", answer: "Yes. Versal Labs is based in Colombo and works remotely with teams in Sri Lanka and international markets using transparent milestones, documentation, and regular demos." },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Development & Automation in Sri Lanka",
    shortName: "AI Development & Automation",
    eyebrow: "Practical AI connected to real workflows",
    description:
      "AI development and business automation services in Sri Lanka, including intelligent assistants, document processing, workflow automation, and AI integrations.",
    summary:
      "We help companies apply AI where it creates measurable operational value. That can mean accelerating document-heavy work, improving internal search, assisting customer support, or connecting language models safely to trusted business data and actions.",
    keywords: [
      "AI development company Sri Lanka",
      "AI automation Sri Lanka",
      "generative AI integration",
      "business process automation Colombo",
    ],
    capabilities: [
      "AI opportunity and feasibility assessment",
      "Retrieval-augmented generation systems",
      "Internal knowledge assistants",
      "Document classification and extraction",
      "Workflow and API automation",
      "Evaluation, guardrails, monitoring, and human review",
    ],
    outcomes: [
      "Reduce time spent searching, copying, classifying, and summarizing information",
      "Give teams faster access to answers grounded in approved company sources",
      "Automate repeatable decisions while keeping people in control of exceptions",
      "Introduce AI with measurable quality, privacy, and cost controls",
    ],
    process: [
      { title: "Choose the right problem", description: "We prioritize workflows with clear inputs, measurable outputs, and enough repetition to justify automation." },
      { title: "Prototype with real data", description: "A controlled prototype tests quality, latency, cost, and failure modes before production investment." },
      { title: "Integrate safely", description: "We connect approved data and systems with access controls, observability, and appropriate human approval steps." },
      { title: "Evaluate continuously", description: "Production evaluations and feedback loops track answer quality and business impact as data changes." },
    ],
    technologies: ["OpenAI APIs", "Azure AI", "Node.js", "Python", "Vector search", "PostgreSQL", "Workflow APIs", "Evaluation pipelines"],
    faqs: [
      { question: "Can AI use our private company documents?", answer: "Yes, with a retrieval architecture that searches approved sources at request time. Access rules, data retention, and provider settings must be designed around your security requirements." },
      { question: "How do you prevent unreliable AI answers?", answer: "We constrain use cases, ground responses in trusted data, add citations where appropriate, test representative scenarios, monitor quality, and require human review for high-impact actions." },
      { question: "Can you add AI to our existing software?", answer: "Yes. We commonly expose AI capabilities through APIs and integrate them into existing web applications, ERP workflows, support tools, and internal portals." },
    ],
  },
  {
    slug: "erp-development",
    name: "Custom ERP Software Development in Sri Lanka",
    shortName: "ERP & Enterprise Systems",
    eyebrow: "One operational system instead of scattered spreadsheets",
    description:
      "Custom ERP software development in Sri Lanka for trading, distribution, service, and growing businesses that need integrated operations and reporting.",
    summary:
      "Versal Labs builds ERP and enterprise systems around the controls, approvals, reporting, and integrations your operation depends on. A phased approach replaces the most expensive gaps first without forcing every team into a generic process.",
    keywords: [
      "ERP software company Sri Lanka",
      "custom ERP development Sri Lanka",
      "enterprise software Colombo",
      "inventory management software Sri Lanka",
    ],
    capabilities: [
      "Sales, purchasing, and inventory workflows",
      "Role-based approvals and audit history",
      "Finance and reporting integrations",
      "Customer and supplier management",
      "Multi-location operational dashboards",
      "Data migration and staged rollout",
    ],
    outcomes: [
      "Create a consistent source of operational truth",
      "Reduce duplicate entry and reconciliation work",
      "Improve stock, sales, purchasing, and management visibility",
      "Preserve company-specific controls while enabling growth",
    ],
    process: [
      { title: "Process mapping", description: "We document current workflows, exceptions, approvals, reports, and integration dependencies with operational users." },
      { title: "Module roadmap", description: "The implementation is divided into modules so the business receives value and feedback earlier." },
      { title: "Migration and validation", description: "Data is cleaned, mapped, tested, and reconciled before each production transition." },
      { title: "Adoption and support", description: "Role-based training, documentation, monitoring, and iteration help teams adopt the new operating model." },
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Azure", "Business intelligence", "Accounting APIs", "Barcode integrations"],
    faqs: [
      { question: "Should we customize an existing ERP or build one?", answer: "That depends on how differentiated your workflows are, the cost of workarounds, integration needs, and long-term ownership. Discovery compares configuration, extension, and custom-build options before recommending a path." },
      { question: "Can ERP modules be delivered in phases?", answer: "Yes. Phased delivery lowers operational risk and lets teams validate foundational data and workflows before dependent modules are introduced." },
      { question: "Can you migrate data from spreadsheets or legacy systems?", answer: "Yes. Migration normally includes profiling, cleanup rules, mapping, test imports, reconciliation, and a controlled cutover plan." },
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps Consulting in Sri Lanka",
    shortName: "Cloud & DevOps",
    eyebrow: "Reliable delivery from commit to production",
    description:
      "Cloud and DevOps consulting in Sri Lanka for Azure deployments, CI/CD automation, observability, security, reliability, and infrastructure modernization.",
    summary:
      "We design cloud environments and delivery pipelines that make releases repeatable, observable, and easier to recover. The goal is not more tooling; it is a dependable path from code change to a secure production service.",
    keywords: [
      "DevOps consulting Sri Lanka",
      "Azure cloud consulting Sri Lanka",
      "CI CD implementation",
      "cloud migration Colombo",
    ],
    capabilities: [
      "Cloud architecture and migration planning",
      "CI/CD pipeline implementation",
      "Containerized application deployment",
      "Monitoring, alerting, and logging",
      "Backup and disaster recovery planning",
      "Security and cost optimization reviews",
    ],
    outcomes: [
      "Release more consistently with fewer manual deployment steps",
      "Detect production problems earlier with actionable observability",
      "Improve recoverability through tested backups and runbooks",
      "Align cloud spend with actual service requirements",
    ],
    process: [
      { title: "Assess", description: "We review architecture, deployment steps, incidents, security boundaries, costs, and recovery requirements." },
      { title: "Prioritize", description: "Risks and bottlenecks are organized into a roadmap that balances operational impact with effort." },
      { title: "Automate", description: "Infrastructure, testing, deployment, and observability improvements are introduced in reviewable stages." },
      { title: "Operate", description: "Runbooks, ownership, alerts, and recovery exercises turn tooling into a sustainable operating practice." },
    ],
    technologies: ["Microsoft Azure", "GitHub Actions", "Docker", "Cloudflare", "Linux", "Windows Server", "OpenTelemetry", "Infrastructure as code"],
    faqs: [
      { question: "Do you support Azure-hosted applications?", answer: "Yes. We work with Azure compute, networking, storage, identity, monitoring, deployment automation, and Cloudflare-based edge and tunnel configurations." },
      { question: "Can you improve an existing deployment without rebuilding the app?", answer: "Usually. Pipeline, monitoring, backup, security, and infrastructure improvements can often be introduced incrementally around an existing application." },
      { question: "Do you provide cloud cost reviews?", answer: "Yes. We assess resource sizing, idle capacity, storage, data transfer, reservations, and architecture choices, then prioritize savings that do not compromise reliability." },
    ],
  },
  {
    slug: "software-outsourcing",
    name: "Software Development Outsourcing from Sri Lanka",
    shortName: "Software Outsourcing",
    eyebrow: "A Sri Lankan engineering partner for global product teams",
    description:
      "Software development outsourcing from Sri Lanka for international companies needing product engineering, dedicated delivery capacity, and transparent collaboration.",
    summary:
      "Versal Labs partners with international teams that need dependable engineering capacity without losing product context. We work through shared roadmaps, clear ownership, visible progress, and documentation designed for long-term maintainability.",
    keywords: [
      "software outsourcing Sri Lanka",
      "offshore software development Sri Lanka",
      "dedicated development team Sri Lanka",
      "product engineering partner",
    ],
    capabilities: [
      "End-to-end product engineering",
      "Dedicated feature delivery capacity",
      "Frontend, backend, API, and cloud development",
      "Quality engineering and code review",
      "Technical documentation and knowledge transfer",
      "Flexible collaboration across time zones",
    ],
    outcomes: [
      "Add focused engineering capacity around a defined product roadmap",
      "Keep delivery visible through demos, milestones, and shared issue tracking",
      "Reduce continuity risk with documentation and maintainable code practices",
      "Access product, cloud, and AI capabilities through one delivery partner",
    ],
    process: [
      { title: "Alignment", description: "We agree on outcomes, ownership, communication, security, quality standards, and the first delivery milestone." },
      { title: "Onboarding", description: "The team learns the product domain, codebase, environments, users, and release process before scaling work." },
      { title: "Delivery", description: "Short cycles, code review, automated checks, and demos make progress and tradeoffs visible." },
      { title: "Continuity", description: "Architecture notes, runbooks, decision records, and knowledge sharing protect long-term product ownership." },
    ],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Azure", "GitHub", "Agile delivery"],
    faqs: [
      { question: "Which countries can you work with?", answer: "Versal Labs can collaborate remotely with international teams. Delivery schedules and meeting overlap are agreed during onboarding based on the client’s time zone and operating rhythm." },
      { question: "Can we start with one project or feature?", answer: "Yes. A well-defined pilot is often the best way to validate communication, quality, and domain understanding before expanding the engagement." },
      { question: "How do you protect source code and company information?", answer: "We use client-controlled repositories where appropriate, least-privilege access, documented environments, secure secret handling, and contract terms aligned with the engagement." },
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
