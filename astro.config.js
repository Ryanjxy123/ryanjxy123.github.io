import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryanjxy123.github.io',
  base: '/',
  integrations: [mdx(), sitemap(), svelte()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: '文档内容的脚注',
      remarkPlugins: [remarkMath], // 告诉 Astro 使用 remark-math 处理数学语法
      rehypePlugins: [rehypeKatex], // 告诉 Astro 使用 rehype-katex 渲染 KaTeX
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});