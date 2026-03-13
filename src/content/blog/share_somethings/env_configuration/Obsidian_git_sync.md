---
title: 'Obsidian通过Git实现同步操作指南'
pubDate: '2026-03-14'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260314002256570.png"
heroImageSource: "https://www.pixiv.net/artworks/140764905"
tags: ["environment configuration","Obsidian","note"]

---


> 参考教程：https://zhuanlan.zhihu.com/p/2004511591140455136

## 1. 本地创建笔记文件夹后设置 Git 作为仓库
首先在本地创建好 Obsidian 的笔记文件夹，进入该目录后，将其初始化为 Git 仓库并关联你的远程仓库：
```bash
git init
git remote add origin <你的远程仓库地址>
```

## 2. Obsidian 安装 Git 插件+配置
光把仓库建好没用，每次写完笔记都手动 commit 和 push 会非常繁琐。此时需要使用 Obsidian Git 插件。

### 安装方法
打开 Obsidian 设置，在左侧找到“第三方插件”，关闭安全模式（首次使用需要关闭）。点击“浏览”，搜索 Obsidian Git 进行安装并启用。

### 配置自动同步
装好之后打开插件设置，主要进行以下两部分配置：

**Automatic（自动化）部分：**  
打开 Split timers for automatic commit and sync，将 commit 和 sync 的计时器分开。  
将 Auto commit interval (minutes) 设为 1，即每 1 分钟自动提交一次。   
打开 Auto commit after stopping file edits，实现在停止编辑后自动触发提交。  
将 Auto push interval (minutes) 设为 1，即每 1 分钟自动推送到 GitHub。  
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260314004312417.png)

**Pull（拉取）部分：**
打开 Pull on startup，设定为每次打开 Obsidian 时自动拉取 GitHub 上的最新内容。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260314004341788.png)

核心逻辑就是把 commit、push 和 pull 全部交给插件自动化处理，你只需要专注编写笔记即可。

## 3. 通过 VSCode 进入仓库手动进行一次同步
在依赖插件全自动运行之前，建议先通过 VSCode 或终端进入该仓库目录，手动执行一次完整的 add、commit 和 push 流程，确保本地与远端的连通性正常。

## 4. 进行防冲突配置
这是一个基本不会产生冲突的配置思路，被许多使用 Obsidian 做知识库的用户所采用。核心思路是：只同步“内容”，不要同步“界面状态”和“缓存”。

### 推荐的 .gitignore 文件
在仓库根目录创建 .gitignore 文件，写入以下内容：
```text
# ===== Obsidian =====
# 工作区布局（每台电脑不同）
.obsidian/workspace.json

# 缓存
.obsidian/cache/

# 插件本地状态
.obsidian/plugins/*/data.json

# 临时文件
.obsidian/workspace-mobile.json

# ===== 系统文件 =====
# Mac
.DS_Store

# Windows
Thumbs.db

# 临时文件
*.log
*.tmp
```

**配置优势说明：**
这种配置可以保证 Markdown 笔记、图片、插件和主题等核心内容被正常同步。同时，workspace 布局和 cache 缓存等状态文件会被强制忽略。这样即使在两台屏幕大小、面板布局完全不同的电脑上使用，也不会产生任何冲突。

### 解决已经存在的冲突文件
如果之前 Git 已经跟踪了这些不该同步的文件，需要执行以下命令清除缓存：
```bash
git rm --cached .obsidian/workspace.json
git rm --cached -r .obsidian/cache
```

然后重新提交规则以生效：
```bash
git add .gitignore
git commit -m "fix obsidian git config"
git push
```

⭐到此便实现了良好的同步效果~