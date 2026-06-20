import { createImageUrlBuilder } from "@sanity/image-url"
import type { Image } from "sanity"
import { dataset, projectId, isSanityConfigured } from "../env"

// Only create image builder if Sanity is configured
const imageBuilder = isSanityConfigured()
  ? createImageUrlBuilder({
      projectId: projectId || "",
      dataset: dataset || "",
    })
  : null

export const urlForImage = (source: Image) => {
  if (!imageBuilder || !source) {
    return {
      url: () => "/placeholder.svg?height=400&width=600&text=Image+Placeholder",
      width: () => ({ url: () => "/placeholder.svg?height=400&width=600&text=Image+Placeholder" }),
      height: () => ({ url: () => "/placeholder.svg?height=400&width=600&text=Image+Placeholder" }),
    }
  }

  return imageBuilder?.image(source).auto("format").fit("max")
}
