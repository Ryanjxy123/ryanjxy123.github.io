---
title: 'Linux双系统安装及软件配置'
pubDate: '2025-07-28'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data水中-133074580.png"
heroImageSource: "https://pixiviz.pwp.app/pic/133074580"
tags: ["environment configuration","Linux"]

---



最近由于需要用到Linux系统，同时也是为了早些适应，所以自己动手配置了双系统，同时也便有了一下的教程，若有不足，欢迎指点。

# 1.安装双系统

可以参考高学长的这篇[博客](https://axi404.top/blog/install-ubuntu)，写的十分详细。

# 2.相关软件配置

一般情况下，如果不是用Linux进行大量办公的话，其实一些生活聊天类的软件也无需在linux上进行安装，读者可根据个人需求进行相关选择。

##  微信

如今微信已经有了Linux版本，所以直接根据一下流程配置即可：
https://zhuanlan.zhihu.com/p/5480997594

## QQ

和微信一样，QQ如今也有了Linux版本，所以安装也很简单。

1.首先在官方网址()下载相应的安装包，具体根据不同的处理器进行选择，对于大多数 Intel（英特尔）或 AMD（超微）处理器的电脑，选择x86中的.deb文件进行下载就好。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20250728125339.png)

2.之后启动终端，cd到包含下载.deb文件的路径下，执行：

```bash
sudo apt install ./qqxxx.deb
```

即可

## 网易云音乐

对于喜欢听音乐的朋友来说，电脑上还是可以安装一个音乐软件的。

可按照这个里面的教程进行配置：https://zhuanlan.zhihu.com/p/694444322

如果配置好之后显示无网络链接，可以重启一下后直接进行搜索，应该就解决了。

## Google浏览器

这个是在默认已经使用了科技的情况下执行的，毕竟要使用Google浏览器。

直接跟着如下教程就好：https://zhuanlan.zhihu.com/p/137114100

## vscode

同样，跟着这个教程就好：https://zhuanlan.zhihu.com/p/2077829521

## Anaconda 

跟着这个教程就好：https://zhuanlan.zhihu.com/p/1899143979288724094


## 搜狗输入法

可以参考学长的这篇[教程](https://axi404.top/blog/sogou-install)

**一下是一些对于可能遇到问题的解决方案**


## 双系统时间不正确

Linux 默认将硬件时间（RTC）设为 UTC，Windows 默认将其设为本地时间（Local Time）。

具体方法可以参考这个教程：https://zhuanlan.zhihu.com/p/683760086

也可以在Linux终端输入：

```bash
sudo timedatectl set-local-rtc 1
```

让 Linux 把 RTC（硬件时钟）当作本地时间使用

之后输入

```bash
timedatectl
```
进行检查，确认输出一下这行：

```text
RTC in local TZ: yes
```

## 屏幕亮度无法调节or无法连接显示器拓展屏幕

原因：一般是显卡驱动问题

1.首先确认显卡型号：

```bash
lspci | grep VGA
```

查看是 Intel UHD / NVIDIA / AMD Radeon，以及是否是 双显卡混合（NVIDIA Optimus）


2.更新系统

```bash
sudo apt update
sudo apt upgrade -y
sudo apt dist-upgrade -y
sudo reboot
```

很多硬件兼容问题在更新内核后可自动解决。

3.安装合适的显卡驱动

### 如果是 NVIDIA

直接手动安装推荐驱动

```bash
//查看推荐版本
ubuntu-drivers devices
```
再执行

```bash
//将xxx改为推荐版本的编号
sudo apt install nvidia-driver-xxx
```
### 如果是 AMD

Ubuntu 20.04 自带开源 amdgpu，若无法识别，可考虑升级内核（如 5.13+）。
### 如果是 Intel

通常开箱即用，若问题依旧可升级内核或安装：

```bash
sudo apt install xserver-xorg-video-intel
```

