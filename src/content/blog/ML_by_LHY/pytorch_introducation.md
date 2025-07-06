---
title: 'Pytorch介绍'
description: "pytorch"
pubDate: '2025-05-24'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data【哲风壁纸】千束-莉可丽丝.png"
tags: ["ML by LHY"]

---
  

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data【哲风壁纸】千束-莉可丽丝.png)

  

# 1.Tensor

## （1）定义

Tensor，即张量，与python中的array，list相似，简单理解成多维数组即可。

  

## （2）如何生成

torch包中提供了一系列直接生成Tensor的函数，如 zeros()、ones()、rand() 等。

  

I. 可以用tensor(data)函数把某一表示数据的数组（其中data可为list,ndarray,array等）直接转化成tensor

  

```

data = [[1, 2], [3, 4]]

x_data = torch.tensor(data)

```

  

II.也可以通过 from_numpy(data) 函数将numpy.ndarray格式的数据转换为Tensor。

  

```

np_array = np.array(data)

x_np = torch.from_numpy(np_array)

```

  

III. 生成一个与其他Tensor具有相同dtype和device等属性的Tensor，使用torch的 ones_like(data) 或 rand_like(data) 等函数。

  

```

x_ones = torch.ones_like(x_data)

print(f"Ones Tensor: \n {x_ones} \n")

x_rand = torch.rand_like(x_data, dtype=torch.float)

print(f"Random Tensor: \n {x_rand} \n")

output：

Ones Tensor:

 tensor([[1, 1],

        [1, 1]])

Random Tensor:

 tensor([[0.1121, 0.1375],

        [0.3242, 0.8301]])

```

  
  

## （3）tensor属性

  

I.shape是一个存储tensor维度大小的元组，返回tensor.size（也可以用size()函数）

  

```

shape = (2, 3,)

rand_tensor = torch.rand(shape)

ones_tensor = torch.ones(shape)

zeros_tensor = torch.zeros(shape)

print(f"Random Tensor: \n {rand_tensor} \n")

print(f"Ones Tensor: \n {ones_tensor} \n")

print(f"Zeros Tensor: \n {zeros_tensor}")

output：

Random Tensor:

 tensor([[0.1286, 0.5986, 0.0263],

        [0.2793, 0.3721, 0.8690]])

Ones Tensor:

 tensor([[1., 1., 1.],

        [1., 1., 1.]])

Zeros Tensor:

 tensor([[0., 0., 0.],

        [0., 0., 0.]])

```

  

II.dtype

  

返回tensor中元素的数据类型

注意：一个 Tensor 的所有元素必须具有相同的数据类型（dtype），即它是 单一类型的张量。

  

III.device

  

返回存储tensor的设备（gpu or cpu）

  

```

tensor = torch.rand(3, 4)

print(f"Shape of tensor: {tensor.shape}")

print(f"Datatype of tensor: {tensor.dtype}")

print(f"Device tensor is stored on: {tensor.device}")

output：

Shape of tensor: torch.Size([3, 4])

Datatype of tensor: torch.float32

Device tensor is stored on: cpu

```

  

## （4）操作

  

I.将tensor放到gpu/cpu上

  

```

# We move our tensor to the GPU if available

if torch.cuda.is_available():

  tensor = tensor.to('cuda')

  print(f"Device tensor is stored on: {tensor.device}")

```

  

II. 索引和切片

  

```

tensor = torch.ones(4, 4)

tensor[:,1] = 0

print(tensor)

output:

tensor([[1., 0., 1., 1.],

        [1., 0., 1., 1.],

        [1., 0., 1., 1.],

        [1., 0., 1., 1.]])

```

  

III. Join(连接)

  

一般使用torch.cat()沿给定维度连接一系列张量

cat要求所有张量在 除拼接维度以外的其他维度上 shape 必须完全一致

（可以在理解dim的时候将dim=0的行维度理解成增加行的长度（宽度）;而将dim=1的列维度理解成增加列的长度）

  
  

```

torch.cat(tensor_list, dim)

//tensor_list 是一个张量列表，它们必须在除了拼接维以外的其他维度完全相同。

//dim 指定在哪个维度上拼接。

```

  

```

t1 = torch.cat([tensor, tensor, tensor], dim=1) // tensor为上一个代码的tensor

print(t1)

output:

tensor([[1., 0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 1.],

        [1., 0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 1.],

        [1., 0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 1.],

        [1., 0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 1.]])

//dim=0 是沿着行方向拼接

//dim=1 是沿着列方向拼接

```

  
  

也可以使用torch.stack（），stack 是创建一个新维度来堆叠张量（比如做 batch、组合图像等）。

stack要求所有张量 shape 完全一致。

  

IV. 加法

  

通过torch.add(a, b) 或 a + b或a.add(b)

  

V. 乘法

  

元素乘法：torch.mul(a, b) 或 a * b 或 a.mul(b)

  

```

a = torch.tensor([[1, 2], [3, 4]])

b = torch.tensor([[10, 20], [30, 40]])

out = torch.mul(a, b)

# 或者 out = a * b

print(out)

# tensor([[ 10,  40],

#         [ 90, 160]])

```

  

矩阵乘法：torch.matmul(a, b) 或a @ b 或torch.mm(a, b)（仅适用于2D矩阵）

  

```

a = torch.tensor([[1, 2], [3, 4]])  

b = torch.tensor([[5, 6], [7, 8]])

out1 = torch.matmul(a, b)

//[1*5 + 2*7, 1*6 + 2*8] = [19, 22]

//[3*5 + 4*7, 3*6 + 4*8] = [43, 50]

//tensor([[19, 22],

//       [43, 50]])

```

  

注意：带有_都为就地操作，x.copy_(y), x.t_(), will change x.

  

```

print(tensor, "\n")

tensor.add_(5)

print(tensor)

output:

tensor([[1., 0., 1., 1.],

        [1., 0., 1., 1.],

        [1., 0., 1., 1.],

        [1., 0., 1., 1.]])

tensor([[6., 5., 6., 6.],

        [6., 5., 6., 6.],

        [6., 5., 6., 6.],

        [6., 5., 6., 6.]])

```