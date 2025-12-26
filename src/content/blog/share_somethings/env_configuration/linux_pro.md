---
title: '双系统开机后无法进入Ubuntu图形化界面'
pubDate: '2025-10-14'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data消えろよクソ社会-135368483.png"
tags: ["problems","Linux"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data消えろよクソ社会-135368483.png)


记录一次开机后遇到的Ubuntu图形化界面显示不出来的问题，当时具体报错如下：


![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data微信图片_20251014012755_203_29.jpg)


## 问题

重启电脑时，卡在了[OK] Started GNOME Display Manager，进入不了ubuntu系统。

## 解决办法

1.进入the recovery mode of ubuntu模式（就是选择进入哪个系统时候的界面）；

2.选择例如“Ubuntu GNU/Linux, with Linux 3.8.0-26-generic (recovery mode)”；

3.再选“Drop to root shell prompt”，进入root帐户的shell终端；

4.输入的命令：sudo apt-get remove --purge nvidia-*，卸载了nivida的驱动；

5.再输入reboot重启电脑，成功进入ubuntu系统。