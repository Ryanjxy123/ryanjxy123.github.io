---
title: 'windows环境简便配置claude code教程'
description: ""
pubDate: '2026-02-17'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data116226715_p0_master1200.jpg"
tags: ["environment configuration", "share_somethings"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data116226715_p0_master1200.jpg)

*image from [おひとり](https://www.pixiv.net/users/8615136)*

## 1.配置git

这一步可以参考知乎上这个教程来进行配置，十分详细，在此不进行过多叙述：[Git下载安装教程：git安装步骤手把手图文【超详细】](https://zhuanlan.zhihu.com/p/443527549)

## 2.配置node.js

1. 请在你的 PowerShell 终端中，直接运行以下指令来安装 Node.js：

```
winget install OpenJS.NodeJS.LTS
```

运行后，屏幕上可能会弹出一个确认协议的提示，输入 Y 并回车即可自动下载并安装。

2. 安装完成后，重启一下 VS Code。

打开一个新的终端，输入以下命令验证是否安装成功：

```
npm -v
```

如果输出了一串数字（例如 10.8.2），说明安装成功。

## 3.安装claude code

确认 npm -v 能正常输出版本号后，你就可以运行一下指令：

```
npm install -g @anthropic-ai/claude-code
```

（如果下载速度过慢，可以在终端配置一下proxy）

此时在终端输入：
```
claude
```
出现如下界面则表示安装成功：
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260217150550.png)

## 4.下载cc—switch

1. 进入[github releases](https://github.com/farion1231/cc-switch/releases/tag/v3.10.3)下载cc-switch,根据不同系统选择对应安装包。

2. 安装完成后根据如下教程进行配置即可：[CC-Switch原来是这么玩的，不错！](https://zhuanlan.zhihu.com/p/1992351805414334464)  
ps：如果是第一次安装claude，在终端输入claude后需要进行一些配置，此时通过以下方法跳过配置：   
3. 跳过初次安装配置

点击左上角⚙进入设置  
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260217145949.png)

往下拉找到“窗口行为”并启动“跳过初次安装确认”即可
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260217150300.png)


## 5.在git bash下配置cc

鉴于 Claude Code 的 CLI 工具主要面向类 Unix 系统环境，在 Windows 上使用 Git Bash 可以更好地模拟 Linux 终端行为，从而提升命令兼容性与操作流畅度。

1. 首先在vscode等IDE中选择Git bash创建一个新终端。

2. 在命令行输入并运行下面的代码，初始化 Conda 的 Bash 环境（可选，如果之前是conda环境则需要执行）

```
conda init bash
```

3. 为了让刚刚的初始化生效，你需要重新加载 bash 的配置。直接关闭当前这个 Git Bash 窗口，然后重新打开一个 Git Bash 窗口。

4. 命令行输入并运行下面的代码，自动查找bash.exe的绝对路径 -> 自动转换为纯反斜杠 -> 自动通过 setx 永久写入系统变量

```
setx CLAUDE_CODE_GIT_BASH_PATH "$(cygpath -w /bin/bash.exe)"
```

5. 重启IDE刷新系统变量。

6. 开一个Git bash终端输入claude，出现小怪兽界面则成功⭐。

