---
title: 'HW1 record'
description: "李宏毅机器学习课程HW1"
pubDate: '2025-06-30'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data【哲风壁纸】二次元-人物-动漫.png"
tags: ["ML by LHY"]

---

![a](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data【哲风壁纸】二次元-人物-动漫.png)

# 作业介绍
这是这个课程的第一次作业，主要内容：
通过所给的COVID19 的train的五天完整数据以及test的前四天完整数据以及第五天的feature数据，去预测test数据的第五天得病率。
通过题目所给数据集（包含train.csv 和 test.csv），对于train数据集中118列分别包含：

1id 37个state 16个相关特征×5 （5天的数据） 其中每一天的相关数据最后一列为label（得病率）  


16个feature：

| 字段                       | 含义                        |
| ------------------------ | ------------------------- |
| **cli**                  | COVID-like illness 比例     |
| **ili**                  | Influenza-like illness 比例 |
| **hh_cmnty_cli**         | 家庭/社区成员有 CLI 症状比例         |
| **nohh_cmnty_cli**       | 非家庭成员社区 CLI 症状比例          |
| **wearing_mask**         | 戴口罩比例                     |
| **travel_outside_state** | 跨州旅行比例                    |
| **work_outside_home**    | 在家外工作比例                   |
| **shop**                 | 出门购物比例                    |
| **restaurant**           | 外出就餐比例                    |
| **spent_time**           | 出门花时间比例                   |
| **large_event**          | 参加大型活动比例                  |
| **public_transit**       | 使用公共交通比例                  |
| **anxious**              | 焦虑比例                      |
| **depressed**            | 抑郁比例                      |
| **worried_finances**     | 担忧经济比例                    |
| **tested_positive**      | 检测阳性比例                    |这个

作业的具体要求：  
[作业](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2022-course-data/HW01.pdf)

老师所提供的代码：   
[代码](https://colab.research.google.com/drive/1FTcG6CE-HILnvFztEFKdauMlPKfQvm5Z#scrollTo=YdttVRkAfu2t)


# 1. 代码分析

## 导入包

```
import math
import numpy as np
import pandas as pd
import os
import csv
from tqdm import tqdm
import torch
import torch.nn as nn
from torch.utils.data import Dataset,DataLoader,random_split
from torch.utils.tensorboard import SummaryWriter
from sklearn.feature_selection import SelectKBest, f_regression
```

其中

```
from tqdm import tqdm
```

tqdm是python中一个用于美化显示进度条的库

```
from torch.utils.data import Dataset,DataLoader,random_split
```

Dataset:  自定义数据集结构  
DataLoader：将 `Dataset` 包装成可批量、可打乱、可多线程加载的可迭代对象，用于训练循环。  
random_split: 随机把数据集按比例拆分。

```
from torch.utils.tensorboard import SummaryWriter
```

允许你在 PyTorch 中方便地写日志，以便在 TensorBoard 面板实时可视化训练过程。  
一般用来记录：  
1.loss  
2.accuracy  
3.learning rate 等  


## 一些优化函数

```
训练集划分：
def train_valid_split(data_set, valid_ratio, seed):
    '''Split provided training data into training set and validation set'''
    valid_set_size = int(valid_ratio * len(data_set)) 
    train_set_size = len(data_set) - valid_set_size
    train_set, valid_set = random_split(data_set, [train_set_size, valid_set_size], generator=torch.Generator().manual_seed(seed))
    return np.array(train_set), np.array(valid_set)

预测函数：
def predict(test_loader, model, device):
    model.eval() # Set your model to evaluation mode.
    preds = []
    for x in tqdm(test_loader):
        x = x.to(device)              
# 在 PyTorch 中，默认会为所有 Tensor 操作建立 计算图（用于自动求梯度），以便在训练时可以进行反向传播（`loss.backward()`）。
# 推理时使用 `torch.no_grad()` 是最佳实践，且必须养成习惯。
        with torch.no_grad():                   
            pred = model(x)                     
            preds.append(pred.detach().cpu())   
    preds = torch.cat(preds, dim=0).numpy()  
    return preds

```

其中


```
train_set, valid_set = random_split(...)
```

返回类型为torch.utils.data.dataset.Subset：包装了原始数据集的子集对象，用于后续 PyTorch DataLoader 中直接取数据使用。  

Subset内部结构：
Subset:
    - dataset: 原始完整数据集
    - indices: 子集对应的索引（列表）

其中
```
pre.detach()
```

返回一个新的张量（tensor），与与张量共享数据，但可以从原计算图中分离，不再被autograd跟踪

如果你想：  
1.将 `pred` 保存下来用于日志记录  
2.移动到 CPU  
3.转为 NumPy  
4.做可视化分析  
5.或用于后续非训练逻辑中使用

就应当使用

## Dataset

```
class COVID19Dataset(Dataset):
    '''
    x: Features.
    y: Targets, if none, do prediction.
    '''
    def __init__(self, x, y=None):
        if y is None:
            self.y = y
        else:
            self.y = torch.FloatTensor(y)
        self.x = torch.FloatTensor(x)

    def __getitem__(self, idx):
        if self.y is None:
            return self.x[idx]
        else:
            return self.x[idx], self.y[idx]

    def __len__(self):
        return len(self.x)

```

## Neural Network Model

```
class My_Model(nn.Module):
    def __init__(self, input_dim):
        super(My_Model, self).__init__()
        # TODO: modify model's structure, be aware of dimensions. 
        self.layers = nn.Sequential(
            nn.Linear(input_dim, 16),
            nn.ReLU(),
            nn.Linear(16, 8),
            nn.ReLU(),
            nn.Linear(8, 1)
        )

    def forward(self, x):
        x = self.layers(x)
        x = x.squeeze(1) # (B, 1) -> (B)
        return x
```
后续优化有对network的优化

## Feature Selection

```
def select_feat(train_data, valid_data, test_data, select_all=True):
    '''Selects useful features to perform regression'''
    y_train, y_valid = train_data[:,-1], valid_data[:,-1]
    raw_x_train, raw_x_valid, raw_x_test = train_data[:,:-1], valid_data[:,:-1], test_data

    if select_all:
        feat_idx = list(range(raw_x_train.shape[1]))
    else:
        feat_idx = [0,1,2,3,4] # TODO: Select suitable feature columns.
        
    return raw_x_train[:,feat_idx], raw_x_valid[:,feat_idx], raw_x_test[:,feat_idx], y_train, y_valid
```
## Training loop

```
def trainer(train_loader, valid_loader, model, config, device):

    criterion = nn.MSELoss(reduction='mean') # Define your loss function, do not modify this.

    # Define your optimization algorithm. 
    # TODO: Please check https://pytorch.org/docs/stable/optim.html to get more available algorithms.
    # TODO: L2 regularization (optimizer(weight decay...) or implement by your self).
    optimizer = torch.optim.SGD(model.parameters(), lr=config['learning_rate'], momentum=0.9) 
    
    writer = SummaryWriter() # Writer of tensoboard.

    if not os.path.isdir('./models'):
        os.mkdir('./models') # Create directory of saving models.

    n_epochs, best_loss, step, early_stop_count = config['n_epochs'], math.inf, 0, 0

    for epoch in range(n_epochs):
        model.train() # Set your model to train mode.
        loss_record = []

        # tqdm is a package to visualize your training progress.
        train_pbar = tqdm(train_loader, position=0, leave=True)

        for x, y in train_pbar:
            optimizer.zero_grad()               # Set gradient to zero.
            x, y = x.to(device), y.to(device)   # Move your data to device. 
            pred = model(x)             
            loss = criterion(pred, y)
            loss.backward()                     # Compute gradient(backpropagation).
            optimizer.step()                    # Update parameters.
            step += 1
            loss_record.append(loss.detach().item())
            
            # Display current epoch number and loss on tqdm progress bar.
            train_pbar.set_description(f'Epoch [{epoch+1}/{n_epochs}]')
            train_pbar.set_postfix({'loss': loss.detach().item()})

        mean_train_loss = sum(loss_record)/len(loss_record)
        writer.add_scalar('Loss/train', mean_train_loss, step)

        model.eval() # Set your model to evaluation mode.
        loss_record = []
        for x, y in valid_loader:
            x, y = x.to(device), y.to(device)
            with torch.no_grad():
                pred = model(x)
                loss = criterion(pred, y)

            loss_record.append(loss.item())
            
        mean_valid_loss = sum(loss_record)/len(loss_record)
        print(f'Epoch [{epoch+1}/{n_epochs}]: Train loss: {mean_train_loss:.4f}, Valid loss: {mean_valid_loss:.4f}')
        writer.add_scalar('Loss/valid', mean_valid_loss, step)

        if mean_valid_loss < best_loss:
            best_loss = mean_valid_loss
            torch.save(model.state_dict(), config['save_path']) # Save your best model
            print('Saving model with loss {:.3f}...'.format(best_loss))
            early_stop_count = 0
        else: 
            early_stop_count += 1

        if early_stop_count >= config['early_stop']:
            print('\nModel is not improving, so we halt the training session.')
            return
```

其中

```
 x, y = x.to(device), y.to(device)
```

- `x.to(device)` 会返回一个新的 tensor（在 `device` 上）
    
- 原来的 `x` 不会被原地修改

```
loss.backward()
```

	`loss.backward()` 并不会更新权重参数本身，只是把梯度算好。

```
optimizer.step()
```

- 优化器会 遍历模型中所有可训练参数
    
- 使用 `.grad` 中的值

**一般步骤为：**

“清零 → 正向 → 计算损失 → 反向（算梯度） → 优化（更新参数）”:

```
optimizer.zero_grad()               # Set gradient to zero.

x, y = x.to(device), y.to(device)   # Move your data to device.

pred = model(x)            

loss = criterion(pred, y)

loss.backward()                     # Compute gradient(backpropagation).

optimizer.step()
```

⭐一些细碎的知识：

```
 loss_record.append(loss.detach().item())
```

```
loss.detach()
```
**功能：** 创建一个与原张量内容相同的新张量，但这个新张量**不再是计算图的一部分**。这意味着对新张量的任何操作都不会被记录下来以供反向传播。它会中断从这个点开始的梯度流。  
可用于特殊的阶段梯度流：  
假设你有一个复杂的模型，其中包含两个子模型 `model_A` 和 `model_B`。你希望 `model_B` 的训练依赖于 `model_A` 的输出，但是你不希望 `model_B` 的梯度反向传播回去影响 `model_A` 的参数。

```
import torch
import torch.nn as nn

class ModelA(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(10, 5)

    def forward(self, x):
        return self.linear(x)

class ModelB(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(5, 1)

    def forward(self, x):
        return self.linear(x)

model_A = ModelA()
model_B = ModelB()

# 示例输入
input_data = torch.randn(1, 10) # 1个样本，10个特征

# 正常情况：梯度会流经两个模型
output_A = model_A(input_data)
output_B = model_B(output_A)
loss_full_graph = output_B.sum()
loss_full_graph.backward() # 梯度会计算并更新 model_A 和 model_B 的参数


# 清除梯度
model_A.zero_grad()
model_B.zero_grad()

# 使用 detach() 截断梯度流
output_A_detached = model_A(input_data).detach() # 关键在这里！
output_B_detached_path = model_B(output_A_detached)
loss_detached_path = output_B_detached_path.sum()
loss_detached_path.backward() # 只有 model_B 的梯度会被计算和更新
```

相当于将model_A那一部分从计算图中拿出  
当 `loss_detached_path.backward()` 被调用时，梯度只能反向传播到 `model_B`。因为 `output_A_detached` 不在计算图中，梯度无法从 `output_A_detached` 向前传到 `model_A`。因此，`model_A` 的参数将不会被更新。

```
	loss.item()
```
**功能：** 直接将一个包含单个元素的 PyTorch 张量转换为标准的 Python 标量（`float` 或 `int`）。


## DataLoader


从文件中读取数据并设置训练集、验证集和测试集。

```
# Set seed for reproducibility
same_seed(config['seed'])


# train_data size: 2699 x 118 (id + 37 states + 16 features x 5 days) 
# test_data size: 1078 x 117 (without last day's positive rate)
train_data, test_data = pd.read_csv('./covid.train.csv').values, pd.read_csv('./covid.test.csv').values
train_data, valid_data = train_valid_split(train_data, config['valid_ratio'], config['seed'])

# Print out the data size.
print(f"""train_data size: {train_data.shape} 
valid_data size: {valid_data.shape} 
test_data size: {test_data.shape}""")

# Select features
x_train, x_valid, x_test, y_train, y_valid = select_feat(train_data, valid_data, test_data, config['select_all'])

# Print out the number of features.
print(f'number of features: {x_train.shape[1]}')

train_dataset, valid_dataset, test_dataset = COVID19Dataset(x_train, y_train), \
                                            COVID19Dataset(x_valid, y_valid), \
                                            COVID19Dataset(x_test)

# Pytorch data loader loads pytorch dataset into batches.
train_loader = DataLoader(train_dataset, batch_size=config['batch_size'], shuffle=True, pin_memory=True)
valid_loader = DataLoader(valid_dataset, batch_size=config['batch_size'], shuffle=True, pin_memory=True)
test_loader = DataLoader(test_dataset, batch_size=config['batch_size'], shuffle=False, pin_memory=True)
```

## start train

```
model = My_Model(input_dim=x_train.shape[1]).to(device) # put your model and data on the same computation device.
trainer(train_loader, valid_loader, model, config, device)
```

## Testing

```
def save_pred(preds, file):
    ''' Save predictions to specified file '''
    with open(file, 'w') as fp:
        writer = csv.writer(fp)
        writer.writerow(['id', 'tested_positive'])
        for i, p in enumerate(preds):
            writer.writerow([i, p])

model = My_Model(input_dim=x_train.shape[1]).to(device)
model.load_state_dict(torch.load(config['save_path']))
preds = predict(test_loader, model, device) 
save_pred(preds, 'pred.csv')  
```

# 2.相关优化

最开始的时候，使用老师提供的代码得到的结果是：  

**Private Score： 1.61450  Public Score:1.56370**

显然这个效果是最普通的效果，所以需要对其进行优化。

## （1）修改参数

例如：lr 、batch等  

一般对于调参，基本都是×10 or %10 

## （2） 修改网络层

一般来说，网络层优化并没有所谓越深越好的道理，甚至有所谓的“大道至简”的说法。
⭐：**奥卡姆剃刀原则 ： 降低模型复杂度，可以提高泛化性**

### i 过拟合
在这个题目中，当发现训练loss与test的结果出现比较大的偏差，即两者结果逐渐拉大的时候，即出现过拟合    

则可以将模型直接减到一层，只有一个Linear层，之后逐渐将宽度，深度往上加  

### ii 欠拟合

若不是过拟合，则应该是模型性能欠佳，则是欠拟合  

一般是模型复杂度不够，可以将模型加宽，加深，或者使用一些激活函数，例如：ReLU等。  

也可以提高lr  

## (3) 优化器

### i 修改优化器

原本代码中使用的是SGD（随机梯度下降）一阶优化器，我们可以修改为AdamW二阶优化器（二阶优化器带有动量（momentum））

同时AdamW中自带Weight_Decay（L2正则化）,也可以通过参数调节进行优化

### ii 使用闭包

```
        for x, y in train_pbar:
            x, y = x.to(device), y.to(device)
            def closure():
                optimizer.zero_grad()               # Set gradient to zero.   # Move your data to device. 
                pred = model(x)             
                loss = criterion(pred, y)
                loss.backward()         
                return loss          
              # Compute gradient(backpropagation).
            loss = closure()                        # Compute loss.
            optimizer.step(closure)                    # Update parameters.
            step += 1
            loss_record.append(loss.detach().item())
            
            # Display current epoch number and loss on tqdm progress bar.
            train_pbar.set_description(f'Epoch [{epoch+1}/{n_epochs}]')
            train_pbar.set_postfix({'loss': loss.detach().item()})
```

可以见到，代码中将设置梯度为0，移动数据到device，计算loss，计算梯度，更新参数，都放在了闭包中  
  
closure 本质是：  

一个封装“前向传播 + 计算损失 + 反向传播”的函数，供优化器在内部多次调用时使用。

闭包一般用于：  
用于需要多次评估模型和梯度的优化器，如：

1.L-BFGS  

2.部分二阶优化器    

在这些优化器中，可能需要：  

多次前向传播计算损失  

多次反向传播计算梯度  

通过 closure，优化器内部即可多次自动调用并获取最新梯度和损失。

同时需要注意代码中
```
            loss = closure()                        # Compute loss.
            optimizer.step(closure) 
```
这两行代码的顺序，如果将这两行代码的顺序颠倒，那么loss的值将会是上一次的loss值，而不是当前loss值。



## (4)挑选合适的feature进行训练

代码中Feature Selection部分其实十分重要，经过简单思考我们不难发现，貌似得病率与state基本没有关系（直觉上），于是将其剔除

这个题目其实有多种feature的选择：

### i 只通过前四天的得病率进行训练

可以将其理解成老师在课上所讲的对于Youtube流量预测的例子，则无需关注其他的特征

### ii 将state数据剔除后的数据进行训练

即上文所提到的，得病率与state基本没有关系

### iii 通过类似特征工程的方法

代码如下：

首先导入相关的包

```
from sklearn.feature_selection import SelectKBest, f_regression
```
之后通过内置函数进行特征选择，选取出15个与得病率最相关的特征进行训练

```
# --- 核心修改：在训练集上进行特征选择并获取索引 ---
k = 15 # 选择 K 个最佳特征的数量

# 分离训练集的特征和目标，用于特征选择
train_features_for_selection = train_data_full[:, :-1]
train_target_for_selection = train_data_full[:, -1]

# 初始化并 fit SelectKBest
feature_selector = SelectKBest(score_func=f_regression, k=k)
feature_selector.fit(train_features_for_selection, train_target_for_selection)

# 获取从训练集学习到的最佳特征索引
idx = np.argsort(feature_selector.scores_)[::-1]
best_feat_indices = idx[:k]

# --- 应用特征选择到所有数据集 ---

# 应用到训练集
train_data, train_target = select_feat(train_data_full, None, best_feat_indices, is_train_or_valid=True)

# 应用到验证集
valid_data, valid_target = select_feat(valid_data_full, None, best_feat_indices, is_train_or_valid=True)

# 应用到测试集 (注意 test_data 的结构：它可能只有特征，没有目标)
# 假设 test_data 已经加载且只包含特征列
test_data = select_feat(test_data, None, best_feat_indices, is_train_or_valid=False)
```

最后结果也是成果得到了优化，最优结果如下：  

**Private Score： 0.92087  Public Score:0.88337**


