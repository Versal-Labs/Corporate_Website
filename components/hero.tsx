import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const sparkles = [
  { position: "top-20 left-10", color: "text-blue-400", delay: "0s" },
  { position: "top-40 right-20", color: "text-purple-400", delay: ".4s" },
  { position: "bottom-40 left-20", color: "text-green-400", delay: ".8s" },
]

export default function Hero() {
  return (
    <section id="home" className="section-container relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, rgba(59,130,246,.28), transparent 28%), radial-gradient(circle at 80% 70%, rgba(168,85,247,.22), transparent 32%)",
          }}
        />
      </div>

      {sparkles.map((sparkle) => (
        <div key={sparkle.position} aria-hidden="true" className={`pointer-events-none absolute ${sparkle.position} animate-pulse`} style={{ animationDelay: sparkle.delay }}>
          <Sparkles className={`h-6 w-6 ${sparkle.color} opacity-60`} />
        </div>
      ))}

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
          Custom Software &amp; AI Development
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Built in Sri Lanka.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
          Your future-ready software partner. We craft cutting-edge solutions that transform businesses through custom development, AI integration, and scalable cloud platforms.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="action-button group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg hover:from-blue-600 hover:to-purple-700">
            <a href="#contact" className="relative z-10 flex items-center">Talk to Us<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></a>
          </Button>
          <Button asChild variant="outline" className="action-button relative overflow-hidden border-2 border-gray-600 bg-transparent px-8 py-3 text-lg hover:border-blue-400 hover:bg-blue-400/10">
            <a href="/portfolio" className="relative z-10">View Our Work</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
