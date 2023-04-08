import { defineConfig } from "astro/config";
import { siteMeta } from "./src/lib/constants";
import mdx from "@astrojs/mdx";
const {
  siteUrl
} = siteMeta;


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [mdx()]
});