---
title: '免费简单的图床搭建教程'
description: ""
pubDate: '2026-02-16'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data139489775_p0_master1200.jpg"
heroImageSource: "https://www.pixiv.net/artworks/139489775"  
tags: ["environment configuration", "share_somethings"]

---


本文是基于picgo软件+github的仓库的图床搭建教程，纯新手向，并完全免费，下面是具体指引步骤。

## 1.下载picgo
访问[picgo Docs文档](https://docs.picgo.app/gui/)，点击download后跳转github releases，根据你的电脑系统选择对应的版本下载即可。
以windows为例，选择自己电脑配置对应的版本，点击下载并安装即可。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216105654.png)

如果不知道自己电脑是什么配置，可以打开控制面板（win是左下角的图标），点击系统，查看电脑配置即可。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216110127.png)


## 2.github仓库搭建

1. 在github上新创建一个仓库，仓库访问权限设置为public。
2. 配置Access Token。
点击github右上角的头像，进入setting，左侧栏目拉到最下后选择Developer settings。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216110718.png)

继续在左侧选择Personal access tokens下的tokens(classic)，点击Generate new token(classic)。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216111200.png)

note随便填，Expiration则是这个token到期的时间，根据自己的需求设置即可。  
将repo权限勾选上，点击Generate token即创建成功。（创建完成之后记得保存密码，这个只会出现一次，忘记了下次就要重新创建。）

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216111623.png)

## 3.配置picgo  
打开picgo，左侧栏选择图床设置，找到Github，点击+号创建一个新的图床。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216111811.png)

按照顺序填入：  
1. 图床名称：随便填，比如“github图床”  
2. 仓库名：就是你刚才创建的那个仓库的名字，但注意需要如下格式：github用户名/仓库名，比如：jxy/image   
3. 分支名：一般是main  
4. Token：就是你刚才创建的那个token  
  

创建完成后将这个图床设置为默认图床，之后可在上传区进行测试。

## 4.和markdown编辑器关联

这里我以Obsidian为例，其他编辑器请自行寻找方案。（附上一个[Typora的教程](https://zhuanlan.zhihu.com/p/690690905)）

1. 在Obsidian中进入设置，选择第三方插件后，搜索image auto upload安装并启用。


![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216115007.png)

2. 进入image auto upload的设置，勾选**剪切板自动上传**，默认上传器选择**Picgo（app）**,之后上传接口根据Picgo中设置的端口进行配置。

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216115149.png)


![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216115505.png)

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260216115327.png)

如果之前没有改动过，直接复制如下端口来配置即可。  
上传接口：http://127.0.0.1:36677/upload  
删除接口：http://127.0.0.1:36677/delete  

之后的图片直接粘贴到Obsidian中后便会自动上传图床并转化为链接形式。