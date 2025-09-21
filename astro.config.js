import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel"; // ← 不再是 "@astrojs/vercel/static"
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";  
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: 'https://ryanjxy123.github.io',
  base: '/',
  output: "static",
  adapter: vercel({ mode: "static" }), // ← 必须写 mode，否则 Vercel 不知道怎么处理

  integrations: [mdx(), sitemap(), svelte(), react()],
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