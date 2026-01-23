/**
 * 计算预估阅读时间 (支持中英文混合)
 * @param content 文章原始内容
 * @returns 格式化后的时间字符串 (e.g. "5 min read")
 */
export function getReadingTime(content: string | undefined | null): string {
    // 1. 安全检查：如果内容为空，返回默认值，防止报错
    if (!content) return '1 min read';

    // 2. 清洗数据：移除 Markdown 语法、HTML 标签、换行符
    const clean = content.replace(/<\/?[^>]+(>|$)/g, "");

    // 3. 核心计数逻辑：
    // [\u4e00-\u9fa5]: 匹配每一个中文字符
    // \w+: 匹配每一个英文单词 (连续的字母数字)
    const matches = clean.match(/[\u4e00-\u9fa5]|\w+/g);
    const count = matches ? matches.length : 0;

    // 4. 计算分钟数：
    // 中文阅读速度约 400字/分，英文约 200词/分。
    // 针对技术博客（含代码），取折中值 300 作为除数较为合理。
    const min = Math.ceil(count / 300);

    return `${min} min read`;
}
