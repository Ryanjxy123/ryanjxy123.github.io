---
title: 'Normalization'
description: "batch nrom vs layer norm"
pubDate: '2025-07-18'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datacommissionイラスト-132731053.png"
tags: ["paper","knowledge share"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datacommissionイラスト-132731053.png)

*image from [めたたろう](https://pixiviz.pwp.app/artist/53999519)*


最近刚好追溯到layer normalization这个正则化方法的论文，感觉稍微有些理解了便做一下记录，也分享一些相关的知识。

具体论文： [Layer Normalization](https://papers.cool/arxiv/1607.06450)


# 前置知识

## RNN

recurrent Neural Network，即循环神经网络，由于还没有仔细读过相关的论文，具体实现细节就不进行叙述了，只用自己的话解释一下：

RNN相对于一般FNN来说，一个很关键的区别就是RNN具有循环连接，其作用是将上一个时序的一些信息（经过激活函数前的信息）同样也作为输入，和input一起作为输入传给下一层的网络，具体实现大概如下：

这里设时间序为t-1时刻的隐藏层的输出为$h_{t-1}$,时间序t时刻的输入为$x_t$，$a_t$为该层神经元输入总和的向量表示，$b_t$为t时刻对于输入总和进行的相关偏置，f为激活函数，则有一下公式：

$$

a_t = W_{hh}h_{t-1} + W_{xh}x_t  \\ 

h_t = f( a_t + b_t )

$$






