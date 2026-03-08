import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryanjxy123.github.io',
  base: '/',
  output: 'static',
  integrations: [mdx(), sitemap(), svelte(), react()],
  
  markdown: {
    // 正确的做法：插件只在最外层声明一次
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: '文档内容的脚注',
      // 这里只放 remark-rehype 的配置项，绝不能放函数插件！
      allowDangerousHtml: true,
    },
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      langs: [], 
    },
    syntaxHighlight: 'shiki',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false
  }
});