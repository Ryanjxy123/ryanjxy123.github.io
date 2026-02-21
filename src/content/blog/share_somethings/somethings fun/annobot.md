---
title: 'nanobot配置+使用教程(简单版)'
description: ""
pubDate: '2026-02-13'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data130061492_p0_master1200.jpg"
tags: ["projects"]

---
  
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data130061492_p0_master1200.jpg)

*image from [ゲン助](https://www.pixiv.net/users/32008)*

# nanobot 远程控制部署教程

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213205401728.png)

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213213641.png)

HKUDS/nanobot 是一个主打极简主义与超轻量级的开源 AI 智能体（Agent）框架，旨在成为当前臃肿的 Agent 生态中的一股清流。与近期大热但代码量庞大（超 43 万行）的 OpenClaw（及其前身 Clawdbot）不同，Nanobot 仅用约 4,000 行核心代码就实现了 99% 的关键代理功能。它不仅摒弃了过度封装的复杂性，还保留了对多模态 LLM（如 Claude、OpenAI、DeepSeek）和主流即时通讯平台（Telegram、飞书/Lark、WhatsApp）的完整支持，体现了“Less is More”的开发哲学。

作为一个“Agent Kernel”，Nanobot 并没有像 OpenClaw 那样试图不仅做一个工具，而是试图做一个无所不包的庞大系统；相反，它为开发者提供了一个透明、可控且极易扩展的基座。在 OpenClaw 等“重型”新型科技引领的 Agent 浪潮中，Nanobot 代表了向高效、可审计和高度定制化回归的趋势，非常适合作为开发者构建个人专属 AI 助理或进行 Agent 底层机理研究的起点，让智能体真正运行在用户自己的掌控之中。


![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213213705.png)

操作系统：Windows / Linux / macOS（本文以 Windows为例）    
依赖环境：Python 3.10+，Git，Conda（可选）  
通讯平台：飞书（Feishu/Lark）    
实现目标：在本地电脑运行 Nanobot 网关，通过飞书手机端发送自然语言指令，实现文件操作、系统控制及信息回传，无需公网 IP。

## 具体步骤
## Step 1：虚拟环境配置
为避免依赖冲突，建议使用 Conda 创建独立的 Python 运行环境。  
如没有anaconda/miniconda的朋友，可以先参考以下教程进行安装配置：  
1. https://zhuanlan.zhihu.com/p/133494097  
2. https://zhuanlan.zhihu.com/p/449750184  

> 安装时如果进度条加载过慢，可能是电脑安全拦截，关闭所有安全防护软件后再查看进度。

### 创建并激活环境
```powershell
conda create -n nanobot python=3.11 
conda activate nanobot
```
## Step 2：项目克隆与基础配置
下载项目源码并初始化配置文件： 
1. 克隆 GitHub 仓库并安装依赖。  
2. 执行初始化命令生成配置文件。

```powershell
# 克隆项目
git clone https://github.com/HKUDS/nanobot.git

# 进入目录
cd nanobot

# 安装项目依赖（以编辑模式安装）
pip install -e .


# 初始化配置（生成配置文件至用户目录）
nanobot onboard

```

## Step 3：配置 LLM 模型
你需要一个大模型 API 来让 Nanobot 理解你的指令。编辑配置文件 ~/.nanobot/config.json。  
推荐使用 OpenRouter（支持多种模型）或 OpenAI / Anthropic。  
以下是使用 OpenRouter 的配置示例：

```text
{
  "providers": {
    "openrouter": {
      "apiKey": "sk-or-v1-你的OpenRouter-API-Key"
    }
  },
  "agents": {
    "defaults": {
      "model": "anthropic/claude-3.5-sonnet"
    }
  }
}

```

## Step 4：飞书开放平台应用创建
在飞书服务端创建应用并获取凭证。

1. 访问飞书开放平台。(https://open.feishu.cn/)  
2. 点击 创建应用 -> 企业自建应用，填写应用名称（如“我的电脑管家”）。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213213950899.png)
3. 进入应用详情页，在左侧菜单 凭证与基础信息 中，复制 App ID 和 App Secret 备用。
4. 在左侧菜单 添加应用能力 中，点击 机器人 卡片并开启。

## Step 5：飞书权限与事件订阅
此步骤直接决定手机端是否显示输入框以及机器人能否接收消息。

1. 权限管理：
进入 开发配置 -> 权限管理，搜索并开通以下两个权限：

```text
im:message (获取与发送单聊、群组消息)
im:message:send_as_bot (以应用身份发送消息)
```

2. 事件订阅配置：
进入 开发配置 -> 事件与回调，点击顶部的 事件配置 标签页。

修改订阅方式：点击编辑，选择 使用长连接接收事件，保存。

添加事件：点击下方的 添加事件 按钮，搜索 接收消息 (代码:im.message.receive_v1)，勾选并确认添加。

## Step 6：发布飞书应用版本
配置修改必须经过发布流程才能生效。

进入 应用发布 -> 版本管理与发布。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213212639795.png)
点击 创建版本。
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213212359075.png)

点击 保存 并 申请发布。

## Step 7：本地连接配置与启动
将飞书凭证填入本地配置并启动服务。

1. 修改配置文件：
再次编辑 ~/.nanobot/config.json，找到 channels -> feishu 部分。
```text
  "channels": {
    "feishu": {
      "enabled": true,  // 修改为 true
      "appId": "cli_xxxxxxxxxxxx",  // 填入 Step 4 获取的 App ID
      "appSecret": "xxxxxxxxxxxxxxxxxxxx", // 填入 Step 4 获取的 App Secret
      "encryptKey": "",
      "verificationToken": "",
      "allowFrom": []
    }
  }
```
2. 启动网关服务：
在项目终端执行以下命令启动 Nanobot。

```powershell
nanobot gateway
```
3. 验证连接：

观察终端日志，应显示连接建立成功且无报错。  
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260213213504600.png)
重启手机飞书 App，搜索机器人名称(eg.“我的电脑管家”)进入，底部应显示输入框。  
发送测试消息（如“查看当前目录”），终端将显示接收日志并执行操作。


|手机端测试效果：|  |
|------|------|
| ![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data23e4d578efa8b981dd1aa9687bbd00c8.jpg) | ![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data8e5960962ebc278a7d74e406bcef0641.jpg) |


至此，你便可以通过手机给电脑下达指令，指挥 Nanobot 调用本地环境执行代码、管理文件或运行自动化脚本，真正将桌面端的强大算力延伸至移动端，打造一个 24 小时在线的私人远程工作站~⭐