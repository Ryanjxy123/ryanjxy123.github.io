---
title: 'Astro+Vercel+Supabase部署Waline评论区教程'
description: ""
pubDate: '2026-03-04'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304111712948.png"
heroImageSource: "https://www.pixiv.net/artworks/139716936"  
tags: ["Blog Setup", "share_somethings"]

---

在为纯静态博客添加评论系统时，Waline 是一个极其优秀的选择。但随着各大云服务商的底层架构升级（如 IPv6 普及、LeanCloud 免费版停服），市面上绝大多数旧教程已经失效，甚至会让你踩入无法启动的死胡同。

本文基于最新环境，采用 Astro (前端) + Vercel (后端 API) + Supabase (PostgreSQL 数据金库) 架构，为你提供一份扫清所有障碍的“保姆级”部署教程。不仅包含完整的后端配置，还附带了完美适配极简博客的前端定制代码。


## 阶段一：搭建 Supabase 数据金库

Waline 官方以前主推 LeanCloud，但现在 PostgreSQL 才是更稳定长久的选择，我们将使用全免费的 Supabase。

1. 创建数据库
注册并登录 Supabase，点击 New Project。

填写项目名称，设置一个包含大小写和数字的强密码（记录好，后面要用）。

地区建议选择距离你用户群近的地方（如 Tokyo）。等待几分钟让数据库初始化完成。

2. 手动初始化数据表  

Waline 针对 PostgreSQL 不会自动建表。如果跳过这一步，后端启动时会报 `500: relation "wl_users" does not exist`。

在浏览器新开标签页，访问 [Waline 官方的建表 SQL 脚本](https://raw.githubusercontent.com/walinejs/waline/main/assets/waline.pgsql)。

复制该网页内的所有 SQL 代码(都以CREATE开头的)。

回到 Supabase，点击左侧导航栏的 SQL Editor，跳转后将刚才复制的SQL代码全部粘贴后点击右下角的run。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304111923330.png)

提示 Success 即代表建表完成！

3. 开启连接池（解决 IPv4 / IPv6 冲突）

Supabase 最近全面升级了 IPv6，但 Vercel 的 Serverless 环境目前只认 IPv4，直接连接会导致 `500: getaddrinfo ENOTFOUND 错误`。

在 Supabase 控制台主页上方的栏目条点击最右侧的`Connect`。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304113017303.png)

找到 Method 选项，将默认的 Direct connection 修改为 Transaction pooler。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304113653521.png)

此时下方的连接地址会刷新，后续步骤需要用到新地址中的信息。



## 阶段二：部署 Vercel 后端（收发室）

我们将后端部署在 Vercel 上，作为前端网页和数据库之间的桥梁。

1. 导入代码

进入[waline的github网站](https://github.com/walinejs/waline/tree/main/example)后点击下方图片中的`Deploy`，为其在你的 GitHub 中创建一个私有仓库（比如命名为 waline-comment-api）。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304113932854.png)


2. 拆解配置环境变量  

很多教程让你直接填 DATABASE_URL，这在 Waline + PostgreSQL 的组合里行不通，在 Vercel 的 Environment Variables（环境变量） 页面，你必须手动拆分并添加以下 7 个变量（这部分如有不清楚value应该填的内容直接问AI就好）：

| NAME (变量名) | VALUE (变量值) | 备注 |
| :--- | :--- | :--- |
| `PG_HOST` | aws-x-xxx.pooler.supabase.com | 第一阶段最后获取的连接池主机名 |
| `PG_PORT` | 6543 | 连接池专属端口 |
| `PG_USER` | postgres.xxx... | 第一阶段获取的带后缀的用户名 |
| `PG_PASSWORD` | 你的数据库密码 | 创建项目时设置的密码（去除两端方括号） |
| `PG_DB` | postgres | 默认填 postgres 即可 |
| `PG_SSL` | true | 必填！ Supabase 强制要求开启 SSL 才能连接 |
| `JWT_TOKEN` | 随便键盘打一串长字符 | 用于管理员登录凭证加密，越乱越安全 |

从vercel项目页面左侧进入`Settings`，然后点击`Environment Variables`,在右侧界面右上角点击`Add Environment Variable`将上述七个环境变量都添加。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304133414960.png)

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304133743300.png)

添加完毕后，点击 Deploy 部署。

3. 注册最高管理员账号  

部署完成后，Vercel 会分配给你一个域名（你的 serverURL，如 https://waline-api-xxx.vercel.app）。

立刻在浏览器中访问 https://你的serverURL/ui/register。

注册你的管理员账号（Waline 规则：第一个注册的人自动成为最高权限站长）。
(注：如果登录后台看到顶部有“LeanCloud 即将停止对外服务”的黄色横幅，请直接无视，这是官方广播，本教程使用用的是 Supabase，不受影响)

出现如下页面即注册成功：

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304134042835.png)

## 阶段三：Astro 前端完美集成
(注：如有个人需求也可通过vibe coding自行实现)  
现在，来到你的本地 Astro 项目，我们将注入一个专为极简博客设计的完美评论组件。

1. 创建核心组件
在 src/components/ 目录下新建 Waline.astro，并将以下代码完整粘贴：

```astro
---
// src/components/Waline.astro
// 将下面的 URL 换成你刚才在 Vercel 部署成功后分配到的专属域名
const serverURL = 'https://你的serverURL.vercel.app'; 
---

<div id="waline-container" class="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-none"></div>

<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />

<script type="module" define:vars={{ serverURL }}>
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
  
  document.addEventListener('DOMContentLoaded', () => {
    init({
      el: '#waline-container',
      serverURL: serverURL,
      dark: 'html.dark', // 完美适配 Tailwind 等框架的暗黑策略
      path: window.location.pathname,
      login: 'enable',
      search: false,
      imageUploader: false, // 关闭传图功能以保持评论区干净整洁
      pageview: true, 
      comment: true, 
    });
  });
</script>

<style is:global>
  
  /* 极简自然风：亮色模式 */
  #waline-container {
    --waline-theme-color: #3f3f46; 
    --waline-active-color: #18181b; 
    --waline-color: #52525b; 
    --waline-bgcolor: transparent; 
    --waline-bgcolor-light: #f4f4f5; 
    --waline-bgcolor-hover: #f4f4f5;
    --waline-border-color: #e4e4e7; 
    --waline-disable-bgcolor: #f4f4f5;
    --waline-disable-color: #a1a1aa;
    --waline-badge-color: #71717a; 
    --waline-info-color: #a1a1aa;
    --waline-text-color: #3f3f46;
  }

  /* 极简自然风：暗黑模式 */
  html.dark #waline-container {
    --waline-theme-color: #d4d4d8; 
    --waline-active-color: #f4f4f5; 
    --waline-color: #a1a1aa;
    --waline-bgcolor: transparent;
    --waline-bgcolor-light: #27272a;
    --waline-bgcolor-hover: #27272a;
    --waline-border-color: #3f3f46;
    --waline-disable-bgcolor: #3f3f46;
    --waline-disable-color: #71717a;
    --waline-badge-color: #a1a1aa;
    --waline-info-color: #71717a;
    --waline-text-color: #d4d4d8;
  }

  /* --- 暴力清除官方多余的阴影和修饰，增强页面融合感 --- */
  #waline-container .wl-panel {
    border-radius: 6px !important;
    box-shadow: none !important; 
    border: 1px solid var(--waline-border-color) !important;
    background: var(--waline-bgcolor) !important;
  }
  
  #waline-container .wl-btn {
    border-radius: 6px !important;
    border: 1px solid var(--waline-border-color) !important;
    background: transparent !important;
    color: var(--waline-color) !important;
    transition: all 0.2s ease !important;
  }
  
  #waline-container .wl-btn:hover {
    background: var(--waline-bgcolor-light) !important;
    color: var(--waline-active-color) !important;
  }
  
  #waline-container .wl-btn.primary {
    background: var(--waline-theme-color) !important;
    border-color: var(--waline-theme-color) !important;
    color: #ffffff !important;
  }
  
  html.dark #waline-container .wl-btn.primary {
    color: #18181b !important;
  }

  #waline-container .wl-card {
    padding-bottom: 1rem !important;
    border-bottom: 1px solid var(--waline-border-color) !important;
  }

  /* --- 暗黑模式专属：输入框高级氛围光影特效 --- */
  html.dark #waline-container .wl-panel {
    box-shadow: 0 4px 20px -2px rgba(255, 255, 255, 0.08), 
                0 0 8px 0 rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    background: var(--waline-bgcolor-light) !important;
    border-radius: 8px !important;
  }
</style>
```

2. 注入页面与排版防坑 
 
找到你渲染文章正文的布局文件（如`src/layouts/BlogPost.astro`），导入并放置`<Waline />`组件。  


至此评论区功能以及较好的实现了~  

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260304115725638.png)

