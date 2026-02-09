"use client"

import { Calendar, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlForImage } from "../sanity/versal-labs/lib/image"
import type { PortfolioItem } from "@/lib/sanity"

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
      {item.mainImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={urlForImage(item.mainImage)?.width(800).height(400).url() || "/placeholder.svg"}
            alt={item.mainImage.alt || item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {item.category && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
              {item.category === "web"
                ? "Web Development"
                : item.category === "mobile"
                  ? "Mobile App"
                  : item.category === "enterprise"
                    ? "Enterprise"
                    : item.category === "ai"
                      ? "AI/ML"
                      : "Cloud Solution"}
            </span>
          )}
          {item.completedAt && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {new Date(item.completedAt).getFullYear()}
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors duration-300">
          {item.title}
        </h2>

        {item.description && <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>}

        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700">
                {tech}
              </span>
            ))}
            {item.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                +{item.technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        {(item.projectUrl || item.githubUrl) && (
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            {item.projectUrl && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xs"
                onClick={() => window.open(item.projectUrl, "_blank")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View Live
              </Button>
            )}
            {item.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-purple-400 hover:bg-purple-400/10 bg-transparent text-xs"
                onClick={() => window.open(item.githubUrl, "_blank")}
              >
                <Github className="w-3 h-3 mr-1" />
                Code
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

