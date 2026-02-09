"use client"

import { Calendar, DollarSign, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlForImage } from "../sanity/versal-labs/lib/image"
import type { Product } from "@/lib/sanity"

interface ProductCardProps {
  product: Product
  showImage?: boolean
}

export function ProductCard({ product, showImage = true }: ProductCardProps) {
  const imageSource = (product as any).image || product.mainImage

  return (
    <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 group">
      {showImage && imageSource && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={urlForImage(imageSource)?.width(800).height(450).url() || "/placeholder.svg"}
            alt={(imageSource as any)?.alt || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">{product.title}</h3>
          {product.status && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-block w-auto ${
                product.status === "live"
                  ? "bg-green-500/20 text-green-400"
                  : product.status === "beta"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : product.status === "coming-soon"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {product.status === "live"
                ? "Live"
                : product.status === "beta"
                  ? "Beta"
                  : product.status === "coming-soon"
                    ? "Coming Soon"
                    : "Development"}
            </span>
          )}
        </div>

        {product.description && <p className="text-gray-300 leading-relaxed text-sm md:text-base">{product.description}</p>}

        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm text-gray-300 border border-gray-700"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400">
          {product.category && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              {product.category === "saas"
                ? "SaaS Platform"
                : product.category === "mobile"
                  ? "Mobile App"
                  : product.category === "web"
                    ? "Web Application"
                    : product.category === "api"
                      ? "API Service"
                      : "AI Tool"}
            </div>
          )}
          {product.pricing?.price && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {product.pricing.price}
            </div>
          )}
          {product.launchDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(product.launchDate).getFullYear()}
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          {product.productUrl && (
            <Button className="action-button bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Learn More
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          )}
          {product.demoUrl && product.status === "live" && (
            <Button
              variant="outline"
              className="action-button border-gray-600 hover:border-green-400 hover:bg-green-400/10 bg-transparent group relative overflow-hidden"
              onClick={() => window.open(product.demoUrl, "_blank")}
            >
              <span className="relative z-10 flex items-center">
                <Star className="mr-2 w-4 h-4 group-hover:text-green-400 transition-colors duration-300" />
                Try Demo
              </span>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

