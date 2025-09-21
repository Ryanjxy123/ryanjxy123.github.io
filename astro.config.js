import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static'; // 静态站点用这个
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import react from '@astrojs/react';  
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://ryanjxy123.github.io',
  base: '/',   // 如果你的站点不是部署在独立域名，而是 GitHub Pages 子路径，注意这里要改
  output: 'static', // 确保是静态构建
  adapter: vercel(), // <<< 一定要加上这一行！！！

  integrations: [mdx(), sitemap(), svelte(), react()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: '文档内容的脚注'
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});