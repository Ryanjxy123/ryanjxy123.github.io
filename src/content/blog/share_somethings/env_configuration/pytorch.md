---
title: 'Pytorch简易安装'
description: "笨蛋方法"
pubDate: '2025-07-09'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data128323056_p0_master1200.jpg"
tags: ["environment configuration","pytorch"]

---
  
![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data128323056_p0_master1200.jpg)

*image from [finaa](https://www.pixiv.net/artworks/128323056)*


再次步骤前已经默认安装了anaconda（或miniconda），如果没安装请先安装


# 1.配置清华源

为了在国内能够快速安装 PyTorch, 需要先在 ~/.condarc 的设置清华源：

```
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
auto_activate_base: false
show_channel_urls: true
```

## 通过命令行的方式设置

这里我们只讲关于命令行设置的方式，通过cat直接读入的方式读者可以自行研究（在Linux/WSL/git bash中可以使用cat命令）

直接进入anaconda prompt后在base环境中输入一下代码：

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/

conda config --set auto_activate_base false
conda config --set show_channel_urls true
```

运行结束后，可以通过：

```
conda config --show channels
```

检查是否配置成功

显示如下则配置成功：

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20250709012407.png)

# 2.创建新的虚拟环境

这里我们创建的是python=3.9版本的，基本使用是完全没问题的

```
conda create -n ‘your env name’ python=3.9
```

其中‘your env name’是你的虚拟环境名称，可以自己定义

等待加载完成之后，根据要求输入：

```
conda activate ‘your env name’
```

即可进入虚拟环境

# 3.安装PyTorch

这时候我们只需要在命令行中输入：

```
conda install pytorch=1.12.1 cudatoolkit=11.6
```

选择[y]后等待安装完成就好

# 4.测试是否安装成功

确保处于刚才创建的虚拟环境中，在命令行输入：

```
python
```
进入python的交互式解释器模式

之后在>>>后按顺序输入：

```
import torch
torch.cuda.is_available()
```

若显示true则说明pytorch安装成功

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20250709013425.png)


完结撒花🌼~