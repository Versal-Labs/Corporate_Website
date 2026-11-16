import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Banknote, Barcode, Boxes, ChartNoAxesCombined, Check, ChevronDown, ClipboardList, Factory, Layers3, LockKeyhole, Mail, PackageCheck, Scissors, ShieldCheck, ShoppingCart, Users, Wallet } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NexusFlowEnquiry from "@/components/nexus-flow-enquiry"
import NexusFlowVisual from "@/components/nexus-flow-visual"
import { createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"
import { nexusFlowDescription, nexusFlowFaqs, nexusFlowPath, nexusFlowScreenshots, nexusFlowTestimonials } from "@/lib/nexus-flow"
import styles from "./nexus-flow.module.css"

export const metadata = createPageMetadata({
  title: "Nexus Flow ERP for Clothing Wholesalers in Sri Lanka",
  description: nexusFlowDescription,
  path: nexusFlowPath,
  keywords: ["clothing wholesale ERP Sri Lanka", "garment inventory software", "Nexus Flow ERP", "wholesale accounting software Sri Lanka", "garment production management"],
})

const benefits = [
  { icon: Layers3, title: "Keep your business connected.", text: "Sales, purchasing, stock, production, finance, and payroll work from shared business records." },
  { icon: ChartNoAxesCombined, title: "See your stock and money clearly.", text: "Follow stock quantities and values, customer outstanding balances, supplier dues, and financial performance." },
  { icon: ShieldCheck, title: "Stay in control as you grow.", text: "Track materials, contractor work, and wastage, backed by user permissions, audit records, and financial period controls." },
]

const modules = [
  { icon: ShoppingCart, name: "Sales & orders", description: "Keep the sale moving, from order to collection.", items: ["Customers, sales orders & invoices", "Credit notes & customer receipts", "Customer statements & overdue balances"] },
  { icon: Boxes, name: "Inventory & purchasing", description: "Know what you have, where it is, and what it costs.", items: ["Warehouses, transfers & stock counts", "Purchase orders, GRNs & supplier bills", "Stock valuation, supplier dues & payments"] },
  { icon: Factory, name: "Garment production", description: "Follow materials through to finished garments.", items: ["Bills of materials & production orders", "Contractor issues, returns & partial deliveries", "Wastage, sewing charges & production costs"] },
  { icon: Wallet, name: "Finance & banking", description: "Bring transactions and financial reporting together.", items: ["Accounts, receipts, payments & cheques", "Bank reconciliation", "Trial Balance, Profit & Loss, Balance Sheet"] },
  { icon: Users, name: "People & payroll", description: "Connect employee records and payroll processing.", items: ["Employee records & attendance", "Payroll processing & payslips", "Sales commission visibility"] },
  { icon: LockKeyhole, name: "Reporting & control", description: "Give each team the access and information it needs.", items: ["Sales, inventory & financial reports", "User permissions & audit records", "Financial periods & document templates"] },
]

const productionSteps = [
  { icon: ClipboardList, title: "Plan the garment", text: "Define the bill of materials and create a production order." },
  { icon: Scissors, title: "Issue to contractors", text: "Track materials issued, unused returns, and sewing charges." },
  { icon: PackageCheck, title: "Receive & cost", text: "Record partial deliveries, finished goods, wastage, and recoverable losses." },
]

export default function NexusFlowPage() {
  const productUrl = `${siteConfig.url}${nexusFlowPath}`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "SoftwareApplication", "@id": `${productUrl}#software`, name: "Nexus Flow ERP", applicationCategory: "BusinessApplication", description: nexusFlowDescription, url: productUrl, inLanguage: "en-LK", provider: { "@id": `${siteConfig.url}/#organization` } },
      { "@type": "FAQPage", mainEntity: nexusFlowFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${siteConfig.url}/products` },
        { "@type": "ListItem", position: 3, name: "Nexus Flow ERP", item: productUrl },
      ] },
    ],
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <a href="#nexus-content" className={styles.skipLink}>Skip to content</a>
      <Navbar />
      <main id="nexus-content">
        <section className={styles.hero}>
          <div className={styles.container}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/products">Products</Link><span>/</span><span aria-current="page">Nexus Flow ERP</span></nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}><span />FOR CLOTHING WHOLESALERS IN SRI LANKA</p>
                <div className={styles.productName}><Layers3 size={21} aria-hidden="true" />Nexus Flow <span>ERP</span></div>
                <h1>Your whole business.<br /><em>One connected flow.</em></h1>
                <p className={styles.heroDescription}>From every size and colour to every outstanding payment. Bring stock, sales, production, accounts, and people together with Nexus Flow.</p>
                <div className={styles.actions}>
                  <a href="#book-demo" className={styles.primaryButton}>Book a Demo<ArrowUpRight size={18} aria-hidden="true" /></a>
                  <a href="#request-quotation" className={styles.secondaryButton}>Request a Quotation<ArrowRight size={17} aria-hidden="true" /></a>
                </div>
                <p className={styles.heroNote}><BadgeCheck size={16} aria-hidden="true" />Built and supported by Versal Labs, Colombo</p>
              </div>
              <NexusFlowVisual />
            </div>
            <div className={styles.heroBottom}><span>PURCHASE → PRODUCE → STOCK → SELL → COLLECT</span><a href="#overview">Explore Nexus Flow<ArrowDown size={15} aria-hidden="true" /></a></div>
          </div>
        </section>

        <nav className={styles.sectionNav} aria-label="Explore Nexus Flow"><div className={styles.container}><span>NEXUS FLOW</span><a href="#overview">Overview</a><a href="#capabilities">Capabilities</a><a href="#production">Production</a><a href="#sales-team">Sales team</a><a href="#implementation">Getting started</a></div></nav>

        <section id="overview" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>LESS DISCONNECTION. MORE VISIBILITY.</p><h2>Keep a clear view of<br />the business behind the garments.</h2><p>For large wholesale operations, every order affects stock, accounts, and the next decision. Nexus Flow helps your teams work together.</p></div>
            <div className={styles.benefits}>{benefits.map(({ icon: Icon, title, text }, index) => <article key={title}><div className={styles.benefitTop}><Icon size={26} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section id="capabilities" className={`${styles.section} ${styles.tintedSection}`}>
          <div className={styles.container}>
            <div className={styles.splitHeading}><div><p className={styles.eyebrow}>CONNECTED AT THE CORE</p><h2>Every team.<br />Working from the same records.</h2></div><p>Manage the daily details across your operation, with the reports and controls to see the bigger picture.</p></div>
            <div className={styles.moduleGrid}>{modules.map(({ icon: Icon, name, description, items }) => <article key={name} className={styles.module}><Icon size={25} aria-hidden="true" /><h3>{name}</h3><p>{description}</p><ul>{items.map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul></article>)}</div>
          </div>
        </section>

        <section id="production" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.productionGrid}>
              <div className={styles.productionIntro}><p className={styles.eyebrow}>MADE FOR THE WAY CLOTHING WORKS</p><h2>From fabric<br />to finished goods.</h2><p>Bring garment production and wholesale distribution into the same system. Follow the materials, the contractor work, and the cost of each finished garment.</p><a href="#book-demo" className={styles.textLink}>See the production workflow<ArrowUpRight size={17} aria-hidden="true" /></a></div>
              <ol className={styles.productionSteps}>{productionSteps.map(({ icon: Icon, title, text }, index) => <li key={title}><div className={styles.stepNumber}>0{index + 1}</div><div><div className={styles.stepTitle}><h3>{title}</h3><Icon size={22} aria-hidden="true" /></div><p>{text}</p></div></li>)}</ol>
            </div>
            <div className={styles.apparelDetails}>
              <article><Layers3 size={24} aria-hidden="true" /><div><h3>Every variation accounted for</h3><p>Separate SKUs, costs, and selling prices for size and colour variations.</p></div></article>
              <article><Barcode size={25} aria-hidden="true" /><div><h3>Labels that fit your products</h3><p>Barcode labels with configurable price, size, and colour details.</p></div></article>
              <article><Banknote size={25} aria-hidden="true" /><div><h3>Know the cost of production</h3><p>Track material use, work in progress, finished-goods costs, and contractor losses.</p></div></article>
            </div>
          </div>
        </section>

        <section id="sales-team" className={`${styles.section} ${styles.salesSection}`}>
          <div className={`${styles.container} ${styles.salesGrid}`}>
            <div><p className={styles.eyebrow}>GIVE YOUR SALES TEAM A CLEARER PICTURE</p><h2>Keep orders moving.<br />Keep commissions visible.</h2><p className={styles.sectionDescription}>Your representatives can manage customers, find the right products, and turn sales orders into invoices, with access suited to their role.</p><ul className={styles.checkList}>{["Create and update customer records", "Browse sizes, colours, SKUs, and prices", "Create orders and invoices, and download PDFs"].map(text => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul><p className={styles.permissionNote}><LockKeyhole size={17} aria-hidden="true" />Customer receipts, returns, and wider financial reports require additional permissions.</p></div>
            <div className={styles.commissionPanel}><div className={styles.panelHeading}><Users size={23} aria-hidden="true" /><span>MY COMMISSIONS</span></div><h3>Follow each invoice<br />through to payment.</h3><p>Representatives can see their own commission status at each stage.</p><ol>{["Awaiting customer payment", "Awaiting clearance", "Ready for payroll", "Paid"].map((stage, index) => <li key={stage}><span>{index === 3 ? <Check size={14} aria-hidden="true" /> : `0${index + 1}`}</span>{stage}</li>)}</ol></div>
          </div>
        </section>

        {nexusFlowScreenshots.length > 0 && <section className={styles.section}><div className={styles.container}><div className={styles.sectionHeading}><p className={styles.eyebrow}>A CLOSER LOOK</p><h2>Inside Nexus Flow.</h2></div><div className={styles.screenshotGrid}>{nexusFlowScreenshots.map(screenshot => <figure key={screenshot.src}><a href={screenshot.src} target="_blank" rel="noopener noreferrer"><img src={screenshot.src} alt={screenshot.alt} loading="lazy" width={1440} height={900} /></a><figcaption>{screenshot.caption}</figcaption></figure>)}</div></div></section>}

        <section id="implementation" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.splitHeading}><div><p className={styles.eyebrow}>A SUPPORTED START</p><h2>Bring your business across.<br />We’ll help with the move.</h2></div><p>From your existing records to your team’s daily work, Versal Labs supports your implementation and the operation that follows.</p></div>
            <div className={styles.implementationSteps}>{[
              { title: "Plan & configure", text: "Review your workflows, agree on customisation, and set up the system." },
              { title: "Migrate your data", text: "Move your existing business data into Nexus Flow with our help." },
              { title: "Train your team", text: "Help your staff learn the workflows they will use every day." },
              { title: "Keep moving", text: "Continue with hosting, maintenance, and ongoing support." },
            ].map(({ title, text }, index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
            <div className={styles.pricingStrip}><div><span className={styles.eyebrow}>STRAIGHTFORWARD PRICING</span><h3>A one-time licence.<br className={styles.mobileBreak} /> Ongoing care for your system.</h3><p>One-time licence payment, plus a monthly hosting and maintenance fee.</p></div><a href="#request-quotation" className={styles.secondaryButton}>Request a Quotation<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>

        {nexusFlowTestimonials.length > 0 && <section className={`${styles.section} ${styles.tintedSection}`}><div className={styles.container}><div className={styles.sectionHeading}><p className={styles.eyebrow}>FROM OUR CUSTOMERS</p><h2>In their own words.</h2></div><div className={styles.testimonialGrid}>{nexusFlowTestimonials.map(testimonial => <figure key={`${testimonial.company}-${testimonial.name}`}><blockquote>“{testimonial.quote}”</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.company}</span></figcaption></figure>)}</div></div></section>}

        <section className={`${styles.section} ${styles.faqSection}`}>
          <div className={`${styles.container} ${styles.faqGrid}`}><div><p className={styles.eyebrow}>A FEW THINGS TO KNOW</p><h2>Questions,<br />answered.</h2><p>Want to discuss your specific workflow?<br /><a href="#book-demo" className={styles.textLink}>Let’s walk through it<ArrowUpRight size={16} aria-hidden="true" /></a></p></div><div className={styles.faqs}>{nexusFlowFaqs.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`}>
          <div className={`${styles.container} ${styles.contactGrid}`}>
            <div className={styles.contactCopy}><p className={styles.eyebrow}>LET’S CONNECT YOUR BUSINESS</p><h2>See how Nexus Flow<br /><em>fits your operation.</em></h2><p>Walk us through your wholesale business. We’ll show you the relevant workflows and discuss your implementation requirements.</p><ul className={styles.checkList}><li><Check size={17} aria-hidden="true" />A demo focused on your business</li><li><Check size={17} aria-hidden="true" />A quotation for your requirements</li><li><Check size={17} aria-hidden="true" />Setup, migration, training, and support</li></ul><div className={styles.contactBrand}><img src="/logo-icon.svg" alt="" width={36} height={36} /><div><strong>Built by Versal Labs</strong><span>Colombo, Sri Lanka</span></div></div><a className={styles.contactEmail} href={`mailto:${siteConfig.email}?subject=Nexus%20Flow%20ERP%20enquiry`}><Mail size={17} aria-hidden="true" />{siteConfig.email}</a></div>
            <NexusFlowEnquiry />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
