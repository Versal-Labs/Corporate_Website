import { ArrowDown, ArrowRight, Boxes, CircleCheck, Layers3, ReceiptText, Shirt, Wallet } from "lucide-react"
import styles from "@/app/products/nexus-flow/nexus-flow.module.css"

export default function NexusFlowVisual() {
  return (
    <figure className={styles.flowVisual}>
      <div className={styles.visualHeader}>
        <span className={styles.visualWordmark}><Layers3 size={23} aria-hidden="true" />nexus<span>flow</span></span>
        <span className={styles.visualTag}>CONNECTED OPERATIONS</span>
      </div>
      <div className={styles.visualBody}>
        <div className={styles.flowLabel}>ONE BUSINESS. ONE CONNECTED FLOW.</div>
        <div className={styles.visualFlow}>
          <div><Shirt aria-hidden="true" /><span>Purchase<br />& produce</span></div>
          <ArrowRight className={styles.flowArrow} aria-hidden="true" />
          <div><Boxes aria-hidden="true" /><span>Manage<br />inventory</span></div>
          <ArrowRight className={styles.flowArrow} aria-hidden="true" />
          <div><ReceiptText aria-hidden="true" /><span>Sell<br />& invoice</span></div>
        </div>
        <div className={styles.flowConnection}><span /><ArrowDown size={16} aria-hidden="true" /><span /></div>
        <div className={styles.financeNode}>
          <Wallet size={24} aria-hidden="true" />
          <div><strong>Know where your money stands</strong><span>Customer outstanding · Supplier dues · Banking</span></div>
        </div>
        <div className={styles.variantStrip}>
          <div><span className={styles.swatches}><i /><i /><i /></span><span>Every size. Every colour.</span></div>
          <span>SKU · Cost · Selling price</span>
        </div>
        <div className={styles.visualFooter}><CircleCheck size={15} aria-hidden="true" />Shared records across your teams<span>ERP</span></div>
      </div>
      <figcaption>How Nexus Flow connects your operations</figcaption>
    </figure>
  )
}
