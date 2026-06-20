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

const fallbackImageUrl = {
  width() {
    return this
  },
  height() {
    return this
  },
  auto() {
    return this
  },
  fit() {
    return this
  },
  url() {
    return "/placeholder.svg?height=400&width=600&text=Image+Placeholder"
  },
}

export const urlForImage = (source: Image): any => {
  if (!imageBuilder || !source) {
    return fallbackImageUrl
  }

  return imageBuilder?.image(source).auto("format").fit("max")
}
