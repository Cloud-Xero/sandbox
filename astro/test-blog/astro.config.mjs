import { defineConfig } from "astro/config";
import { siteMeta } from "./src/lib/constants";
import image from "@astrojs/image";
const { siteUrl } = siteMeta;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
