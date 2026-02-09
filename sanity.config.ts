import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { schemaTypes } from "./sanity/versal-labs/schemaTypes"
import { apiVersion, dataset, projectId } from "./sanity/versal-labs/env"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
            S.listItem().title("Portfolio").child(S.documentTypeList("portfolio").title("Portfolio Projects")),
            S.listItem().title("Products").child(S.documentTypeList("product").title("Products")),
            S.listItem().title("Careers").child(S.documentTypeList("career").title("Job Openings")),
            S.divider(),
            S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
            S.listItem().title("Categories").child(S.documentTypeList("category").title("Categories")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
