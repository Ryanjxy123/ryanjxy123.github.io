// src/consts.ts
// 引入的图片对象，用于 Astro 的 <Image> 组件
// 详见 https://docs.astro.build/en/guides/images/#image--astroassets
import authorAvatarImage from "./assets/headpicture.jpg";

import headerImageNight from "./assets/header_night.webp";

// 网站的 <html> 语言标签
export const SITE_LANGUAGE = "en";

// 网站名称
export const SITE_TITLE = 'Ryanjxy\'s Blog';

// 网站的副标题
export const SITE_DESCRIPTION = 'Do not go gentle into that good night.';

// 博主的昵称
export const SITE_AUTHOR_NAME = "Ryanjxy";

// 博主的头像
export const SITE_AUTHOR_AVATAR = authorAvatarImage;

// 网站版权起始年份
export const SITE_COPYRIGHT_YEAR_START = "2024";

// 网站头部导航菜单
export const SITE_MENU: { title: string, href: string, target: string }[] = [
    { title: "首页", href: "./", target: "" },
    { title: "博客", href: "./blog/", target: "" },
    { title: "标签", href: "./page/tags/", target: "" }, // 保持不变，指向 /page/tags/
    { title: "归档", href: "./page/archive/", target: "" },
    { title: "链接", href: "./page/links/", target: "" }
    // { title: "外部链接", href: "https://www.example.com", target: "_blank" }
]

// 网站横幅背景图片（明亮主题）
export const SITE_HEAD_IMAGE_DAY = headerImageNight;

// 网站横幅背景图片（暗黑主题）
export const SITE_HEAD_IMAGE_NIGHT = headerImageNight;

// 一页展示的博文数量
export const BLOG_PAGINATION_SIZE = 6;