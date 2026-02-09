import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Versal Labs',

  projectId: 'flwd2vma',
  dataset: 'production',

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
    visionTool(),
  ],

  schema: {
    types: schemaTypes, // This is now correct
  },

  cors: {
    origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "https://versallabs.lk",
      "https://www.versallabs.lk",
      "https://versal-labs-website.vercel.app",
      /^https:\/\/.*\.vercel\.app$/,
      /^https?:\/\/localhost:\d+$/,
    ],
    credentials: true,
  },
})
