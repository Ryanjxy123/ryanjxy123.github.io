import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { filterPosts } from '@/utils/misc';
// Force rebuild search.json API: Date 2026-03-03T15:30:00

/**
 * 将Markdown内容转换为纯文本，移除标记语法
 * 移除 #, *, `, ![alt](src), [text](url), HTML标签等
 */
function cleanMarkdown(markdown: string): string {
  return markdown
    // 移除HTML标签
    .replace(/<[^>]*>/g, ' ')
    // 移除图片标记 ![alt](src)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    // 移除链接标记 [text](url)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // 移除内联代码 `
    .replace(/`([^`]+)`/g, '$1')
    // 移除代码块 ```code```
    .replace(/```[\s\S]*?```/g, ' ')
    // 移除标题标记 #
    .replace(/^#+\s+/gm, '')
    // 移除粗体/斜体标记 **bold** *italic*
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // 移除引用标记 >
    .replace(/^>\s+/gm, '')
    // 移除列表标记 - * +
    .replace(/^[-*+]\s+/gm, '')
    // 移除数字列表标记 1. 2.
    .replace(/^\d+\.\s+/gm, '')
    // 将多个空白字符合并为一个空格
    .replace(/\s+/g, ' ')
    // 修剪首尾空格
    .trim();
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    // 使用 Unicode 属性匹配：保留所有语言的字母、中文、数字以及连字符，去掉其它标点
    .replace(/[^\p{L}\p{N}\-]/gu, '');
}

function splitIntoSections(markdown: string) {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const sections: any[] = [];

  let currentHeading = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    // 匹配 1-6 级标题，兼容标题前后有空格的情况
    const headingMatch = line.match(/^\s*(#{1,6})\s+(.+?)\s*$/);

    if (headingMatch) {
      // 遇到新标题时，先把上一个收集到的区块推入数组（如果内容不为空或已有标题）
      if (currentContent.length > 0 || currentHeading !== '') {
        sections.push({
          heading: currentHeading,
          anchor: slugify(currentHeading),
          // 这里的 cleanMarkdown 是你原有的清理特殊字符的函数，请保留调用
          content: typeof cleanMarkdown === 'function' ? cleanMarkdown(currentContent.join('\n')) : currentContent.join('\n')
        });
      }
      // 开启新区块
      currentHeading = headingMatch[2].trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // 循环结束后，推入最后一个区块
  if (currentContent.length > 0 || currentHeading !== '') {
    sections.push({
      heading: currentHeading,
      anchor: slugify(currentHeading),
      content: typeof cleanMarkdown === 'function' ? cleanMarkdown(currentContent.join('\n')) : currentContent.join('\n')
    });
  }

  return sections;
}

export const GET: APIRoute = async () => {
  // 获取所有博客文章
  const allPosts = await getCollection('blog');

  // 过滤掉草稿和未列出的文章
  const posts = filterPosts(allPosts, {
    filterDraft: true,
    filterUnlisted: true
  });

  // 构建搜索数据
  const searchData = posts.map(post => ({
    title: post.data.title,
    slug: post.slug,
    tags: post.data.tags || [],
    // 将Markdown内容转换为纯文本，移除标记语法
    body: cleanMarkdown(post.body || ''),
    // 解析Markdown章节结构
    sections: splitIntoSections(post.body || '')
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // 缓存1小时
    }
  });
};