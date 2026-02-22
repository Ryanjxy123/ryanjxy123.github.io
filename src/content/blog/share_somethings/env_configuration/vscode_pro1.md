---
title: 'vscode突然打不开的解决办法'
# description: "周记"
pubDate: '2025-12-26'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data%E5%A4%A9%E7%AB%A5%E3%82%A2%E3%83%AA%E3%82%B9%20Valentine%20is%20U-138945282.png"
heroImageSource: "https://pixiviz.pwp.app/pic/138945282"  
tags: ["problems"]

---

## 问题

vscode打不开，在cmd输入code .报错Invalid file descriptor to ICU data received。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data10fa0249c6d19062845c7a25462d1f7a.png)

## 原因
[from 知乎评论区：八爪猫](https://www.zhihu.com/question/1920173192628118511/answer/1923030013621544656)  
大概率是没重启 VSCode 应用更新，而是直接关机 → 更新流程卡在“文件已经解压到临时目录（- 文件夹）但还没拷回主目录”这一步。  
更新器的逻辑大概是这样的：
下载更新包。
解压到一个临时目录（这里就是那个 - 文件夹）。
下次重启 VSCode 时，会把临时目录里的文件移到主目录。
清理掉临时目录。
但直接关机了， icudtl.dat 和其它更新文件就“遗留”在 - 文件夹里。

## 解决方案

### step1：
找到安装VSCODE的文件夹（右键桌面快捷方式点击“打开文件所在位置”），发现里头有一个名为“—”的文件夹，点进去可以发现里面有incudtl这个文件。  

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data6cbe3a693a1ac2d0058d8facc70a5c23.png)  

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data05ffd1089c9e2c5a5a860681e7d2d271.png)

### step2：
把这个“—”文件夹的内容全拷贝到外层文件夹和code.exe一起，之后删除原本的“—”文件夹。

### step3:  
重新点击桌面快捷方式即可打开。