import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env"

// Only create client if Sanity is properly configured
export const client = isSanityConfigured()
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn: false,
      // Add token for authenticated requests if needed
      token: process.env.SANITY_API_TOKEN,
      // Ignore browser warnings about using token in browser
      ignoreBrowserTokenWarning: true,
      // CORS configuration
      requestTagPrefix: "versal-labs",
      // Perspective for draft content (if using preview mode)
      perspective: "published",
    })
  : null
