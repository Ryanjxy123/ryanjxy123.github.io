---
title: 'windows终端配置gemini CLI教程'
description: ""
pubDate: '2026-03-07'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260307160045.png"
heroImageSource: "https://www.pixiv.net/artworks/119069354"  
tags: ["environment configuration", "share_somethings"]

---


本指南记录了在 Windows 11 与 VS Code 环境下，从零配置并运行 Google Gemini CLI 的全流程。

**在开始配置前，请确保你已具备以下前提条件：**
1. **网络环境**：确保终端能够稳定访问 Google 服务。
2. **账号准备**：一个可以正常使用的个人 Google 账号。
3. **本地环境**：已安装最新版的 VS Code 和 Node.js（需包含 `npm` 和 `npx` 指令）。

准备就绪后，通过这套配置，你都可以随时随地、跨文件夹无缝唤起免费的 Gemini CLI编程助手。


## 一、 云端凭证获取与 API 激活

Gemini CLI 的运行依赖于 Google Cloud 的项目鉴权。

### 1. 获取 Project ID
1. 在全局代理下，浏览器访问 [Google Cloud Console](https://console.cloud.google.com/)。
2. 登录个人 Google 账号（**请牢记此账号，后续终端授权必须保持一致**）。
3. 点击左上角项目管理器（下图中的My First  Porject的位置）新建一个项目（或选择现有项目），找到并复制该项目的 **项目 ID (Project ID)**。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260307163334.png)

### 2. 启用 Gemini for Google Cloud API
默认情况下，新项目的 API 服务是关闭的。若不开启，终端会报 `403 PERMISSION_DENIED` 错误。
1. 访问 API 专属激活链接，将其中的文字替换为你真实的 Project ID：
   `https://console.developers.google.com/apis/api/cloudaicompanion.googleapis.com/overview?project=你的项目ID`
2. 确认登录账号无误后，点击页面中蓝色的 **启用 (Enable)** 按钮。

## 二、 本地全局启动配置

为了实现“在电脑任意代码文件夹下，输入一条命令即可唤起 AI”，我们需要配置 PowerShell 的全局 Profile 文件。

1. 在 VS Code 的 PowerShell 终端中按照顺序执行以下命令，强制创建并打开配置文件：
   ```powershell
   New-Item -Type File -Path $PROFILE -Force
   notepad $PROFILE
   ```
2. 在弹出的记事本中，写入以下精简版启动脚本（由于已配置系统级代理，无需在脚本中重复指定）：

```powershell
function gemini {
    # 绑定你的 Google Cloud 项目凭证
    $env:GOOGLE_CLOUD_PROJECT="在此处替换为你的真实项目ID"

    
    Write-Host "Starting Gemini CLI..." -ForegroundColor Green

    # 使用 npx 动态拉取最新版运行，避免全局安装产生的版本 bug
    npx -y https://github.com/google-gemini/gemini-cli
}
```

3. 保存并关闭记事本。

4. 务必重启 VS Code 终端，使全局配置生效。

## 三、 首次启动与鉴权
在 VS Code 终端中输入 gemini 并回车。

系统会自动在默认浏览器中打开 Google OAuth 授权页面。

关键点：必须选择在“第一步”中获取 Project ID 时使用的那个 Google 账号进行授权。

授权成功后返回终端，看到绿色的 `Update successful!` 和 > 提示符，即代表 CLI 已成功就绪。

提示：如果在终端看到 `Do you trust the files in this folder?`，请选择 `1. Trust folder` 以允许 AI 读取当前工作区上下文。


## 四、安装配套可视化插件
为了获得类似 Cursor 的可视化代码体验，必须配合 VS Code 插件使用：

打开 VS Code 左侧的 扩展面板（或按 Ctrl + Shift + X）。

搜索并安装 Google 官方出品的插件：`Gemini CLI Companion`。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260307164631.png)

安装完成后插件会在后台静默工作。当你在终端让 AI 修改代码时，VS Code 编辑器会直接呈现修改前后的对比视图，可通过快捷键（如 Shift + Tab）一键接受变更。

到此，你已配置成功了。🎉

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260307164308.png)