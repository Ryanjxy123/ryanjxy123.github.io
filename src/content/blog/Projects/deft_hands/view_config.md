---
title: '基于Meshcat的相机视角配置'
description: "灵巧手项目中有关仿真cam0的设置"
pubDate: '2025-08-25'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data無題-134240095.png"
tags: ["projects","meshcat","Pinocchio"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data無題-134240095.png)


*image from [夏眠](https://pixiviz.pwp.app/artist/81852718)*

此问题是在进行有关Renderer之后得到Robot image的部分出现的，在次进行相应记录。


![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20250821140740.png)

## 问题描述

由于Meshcat中貌似默认设置了视角会自动朝向机器人所在的方向（以Z轴：前后为分界线），所以导致无法
使在Z轴正半轴的相机看向正半轴方向。

## 解决思路

最后通过模拟了一个类似镜像变换的方式，使可以正常看向前方，如下图所示（示例中都只有右机械臂）:

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/dataf301ad11c5f40be3e3ba084b58814c5c.png)

但很显然，出现了镜像的效果。

解决方案：在录完视频之后，对视频进行左右镜像即可，效果图如下：

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data0319bbcc689ea542538c5327386cdf8f.png)

## 相关代码




1. 有关相机位置姿态设置的函数代码如下：

```python
 def look_at(viz, camera_pos, target_pos, up=np.array([0, 0, 1])):
    camera_pos = np.array(camera_pos)
    target_pos = np.array(target_pos)
    
    # 设置焦点
    T = np.eye(4)
    T[:3, 3] = target_pos
    viz.viewer["/Cameras/default"].set_transform(T)

    # 相机相对焦点的偏移
    offset = camera_pos - target_pos

    viz.viewer["/Cameras/default/rotated/<object>"].set_property("position", offset.tolist())

    # ---- 关键：修正旋转，使相机真的看向目标 ----
    # forward = -Z 方向
    forward = (target_pos - camera_pos)
    forward /= np.linalg.norm(forward)

    right = np.cross(up, forward)
    right /= np.linalg.norm(right)

    true_up = np.cross(forward, right)


    R = np.eye(4)
    R[:3, 0] = right
    R[:3, 1] = true_up
    R[:3, 2] = -forward   # 注意这里是 +Z/-Z，可能需要 flip


    viz.viewer["/Cameras/default/rotated"].set_transform(R)
```

其中"/Cameras/default"代表默认相机,通过transform变化设置相机需要看到的焦点（target）；

"/Cameras/default/rotated"这是默认相机的一个子节点，通常 MeshCat 会在这里挂一些辅助的坐标变换，你添加的物体一般会挂在 "/meshcat" 或 "/object" 路径下。

"/Cameras/default/rotated/&lt;object&gt;"则是修改默认相机下面的一个子节点&lt;object&gt;的属性。set_property(position)相当于传入了当前相机位置相对于焦点的偏移量，从而得到相机的位置。



之后再main函数中调用look_at函数即可:

```python
# 可以放在vis.display的后面
look_at(viz,camera_pos=[-0.0032, 0.01, 1.9526],target_pos=[-0.0032, -0.5903, 1.3026])

```



有不懂的也可以参考这篇文章：[【学习笔记】MeshCat](https://blog.csdn.net/weixin_39284111/article/details/147055817)

2. 进行视频镜像调整之前，需要先安装必要的库依赖。进入虚拟环境后运行以下命令：

安装moviepy和imageio库：
```powershell
pip install moviepy imageio[ffmpeg]
```

升级imageio库：
```powershell
pip install --upgrade imageio
```

升级imageio-ffmpeg库：
```powershell
pip install --upgrade imageio-ffmpeg
```

有关视频镜像处理的代码如下：

只需要把对应需要处理的视频路径配置到input_video参数就好。





```python
from moviepy.editor import VideoFileClip, vfx

def mirror_video(input_path, output_path):
    """
    对视频进行左右镜像处理
    :param input_path: 输入视频路径
    :param output_path: 输出视频路径
    """
    # 读取视频 - 直接使用VideoFileClip
    clip = VideoFileClip(input_path)

    # 左右镜像（水平翻转） - 使用正确的语法
    flipped_clip = clip.fx(vfx.mirror_x)

    # 输出视频
    flipped_clip.write_videofile(
        output_path,
        codec="libx264",
        audio_codec="aac",
        fps=clip.fps
    )
    
    # 释放资源
    clip.close()
    flipped_clip.close()
```


⭐⭐⭐后续若有更好的方法也会进行更新~