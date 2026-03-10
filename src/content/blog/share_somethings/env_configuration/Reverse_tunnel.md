---
title: 'SSH 反向隧道代理配置'
description: ""
pubDate: '2026-03-10'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260310103537483.png"
heroImageSource: "https://www.pixiv.net/artworks/141377054"  
tags: ["environment configuration", "SSH","tmux"]

---


## 原理

VS Code 端口转发方向错误（服务器→本地），需要用 SSH 反向隧道将本地代理暴露给服务器。

## 配置步骤

### 1. 建立反向隧道

在本地终端执行，保持此窗口开启：
```bash
ssh -R <远程端口>:127.0.0.1:<本地代理端口> <用户名>@<服务器IP> -p <SSH端口>
```


### 2. 配置代理环境变量
在远程服务器终端执行：

```bash
export http_proxy=http://127.0.0.1:<远程端口>
export https_proxy=http://127.0.0.1:<远程端口>
```

### 3. 验证
```bash
curl -I https://www.google.com
```

返回 `HTTP/2 200` 即成功。

## 注意事项

- 反向隧道终端不能关闭，关闭即断开隧道
- 每次重新连接后需重新执行步骤 1-3
- 环境变量仅对当前 shell session 生效，不影响其他用户


# Tmux 终端复用器精简操作笔记

在远程计算节点执行高负载或长周期任务时，利用 Tmux 可确保 SSH 会话断开后任务不被异常终止。

## 1. Session 级别控制

1. 实例化并命名一个全新 Session：
```bash
tmux new -s <name>
```
2. 打印当前正在后台挂起的所有 Session 列表：
```bash
tmux ls
```
3. 重新接入指定的后台 Session：
```bash
tmux a -t <name>
```
4. 强制销毁指定的 Session：
```bash
tmux kill-session -t <name>
```


## 2. 核心概念与前缀键

1. 所有的内部快捷键触发前，均需先输入前缀组合键。
2. 默认前缀键为 Ctrl + b。操作方式为：同时按下 Ctrl 和 b，松开后再按后续功能键。


## 3. Window 级别控制

1. 创建全新 Window：前缀键后按 c
2. 焦点切换至下一个 Window：前缀键后按 n
3. 焦点切换至上一个 Window：前缀键后按 p
4. 通过数字索引跳转 Window：前缀键后按数字键，例如 0 或 1
5. 销毁当前 Window：前缀键后按 &，随后按 y 确认


## 4. 挂起与脱离操作

1. 将当前 Session 剥离至后台继续运行，并返回物理机终端：前缀键后按 d