import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";  
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  // 用你在 Vercel 部署后访问的真实域名
  site: "https://ryanjxy123.vercel.app", 
  base: "/",
  output: "static",
  adapter: vercel({ mode: "static" }),

  integrations: [mdx(),  svelte(), react()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: "文档内容的脚注"
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});