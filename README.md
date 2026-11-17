# 🌱 AI for Science 农业方向 · 阶段 2 报告

> **深度学习与计算机视觉入门** | PyTorch + MobileNetV3 + PlantVillage 38 类作物病害识别

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10-3776AB?logo=python" alt="Python">
  <img src="https://img.shields.io/badge/PyTorch-2.x-EE4C2C?logo=pytorch" alt="PyTorch">
  <img src="https://img.shields.io/badge/Accuracy-91.58%-%232E7D32" alt="Accuracy">
  <img src="https://img.shields.io/badge/Classes-38-4CAF50" alt="Classes">
  <img src="https://img.shields.io/badge/PlantVillage-Dataset-8BC34A" alt="Dataset">
</p>

---

## 📌 项目概述

本仓库是 **AI for Science 农业方向** 学习路线的 **阶段 2 交付物**，核心产出是基于 MobileNetV3 迁移学习的 **PlantVillage 38 类作物病害识别** 模型，验证准确率 **91.58%**。

- 👤 **作者**：tang2277（作物栽培硕士 → AI 工程师转岗）
- 📅 **完成时间**：2026-11-17
- 🖥️ **运行环境**：纯 CPU（无 NVIDIA GPU），单 epoch ≈ 5 分钟

### 阶段产出

| 项目 | 数据集 | 模型 | 准确率 | 说明 |
|------|--------|------|--------|------|
| ✅ 入门 MVP | Fashion-MNIST (10 类) | MobileNetV3-Small | 79.56% | 验证 PyTorch 流程 |
| ✅ 核心项目 | PlantVillage (38 类) | MobileNetV3-Small | **91.58%** | 作物病害识别 |
| ✅ 错误分析 | — | — | — | 混淆矩阵 + 作物学解读 |
| 🚧 超参调优 | — | — | — | 6 组配置 × 3 epochs 进行中 |

---

## 🎯 核心指标

```
🎯 最佳验证准确率: 91.58% (9,947 / 10,861)
📊 数据集规模: 54,306 张 / 38 类 / 14 种作物
🧠 模型参数: 2.5M (总) → 4.2M? → 仅 classifier 可训练
⏱️ 训练效率: 10 epochs × ~5 min = ~50 min (CPU)
📦 模型体积: 4.4 MB
```

### 各类别准确率 Top / Bottom

| 🏆 类别 | 准确率 | 说明 |
|---------|--------|------|
| Grape healthy | **100.0%** | 健康叶片特征最稳定 |
| Orange Haunglongbing | 99.4% | 柑橘黄龙病特征鲜明 |
| Cherry healthy | 98.4% | — |
| ⬇️ Tomato Early blight | **58.1%** | 番茄早疫病，与 Late blight/Target spot 高度混淆 |
| ⬇️ Corn Cercospora leaf spot | 66.3% | 玉米灰斑病，与 Northern Blight 互混 |
| ⬇️ Apple Cedar apple rust | 67.3% | 苹果雪松锈病 |

---

## 🛠️ 技术栈

- **语言**：Python 3.10
- **深度学习**：PyTorch 2.x + torchvision
- **机器学习**：scikit-learn（混淆矩阵、metrics）
- **数据处理**：pandas, numpy
- **可视化**：matplotlib, seaborn, ECharts
- **模型架构**：MobileNetV3-Small（ImageNet 预训练 + 迁移学习）
- **数据集**：[PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)

---

## 📂 仓库结构

```
ai4agri-stage2/
├── README.md                  ← 你在这里
├── ai4agri-stage2.html        ← 📖 完整阶段报告（推荐先看这个）
├── assets/
│   ├── charts.js              ← ECharts 图表逻辑
│   └── results.json           ← 38 类准确率数据
└── _shared/
    ├── js/echarts.min.js
    └── fonts/
```

> 💡 报告中引用了兄弟仓库的产出图片，完整训练代码在 `../plant-disease-cnn/`

### 兄弟仓库

| 仓库 | 内容 |
|------|------|
| [tang2277/plant-disease-cnn](https://github.com/tang2277/plant-disease-cnn) | 阶段 2 核心代码：MobileNetV3 训练脚本、混淆矩阵、调参 |
| [tang2277/crop-yield-prediction](https://github.com/tang2277/crop-yield-prediction) | 阶段 1：Kaggle 作物产量回归模型（Ridge CV RMSE=0.4930） |

---

## 🚀 快速开始

### 打开报告（本仓库）

直接双击 `ai4agri-stage2.html` 在浏览器打开，或：

```powershell
# PowerShell：启动本地服务器预览
python -m http.server 8765
# 然后浏览器访问 http://localhost:8765/ai4agri-stage2.html
```

### 运行训练代码（兄弟仓库 plant-disease-cnn）

```powershell
# 1. clone
git clone https://github.com/tang2277/plant-disease-cnn.git
cd plant-disease-cnn

# 2. 创建环境
conda create -n ai4agri python=3.10 -y
conda activate ai4agri
pip install torch torchvision scikit-learn matplotlib seaborn pandas numpy

# 3. 下载数据
# 去 https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset
# 解压到 data/plantvillage/color/

# 4. 训练
python train_plantvillage.py

# 5. 生成混淆矩阵
python confusion_matrix.py
```

---

## 🏗️ 方法

### 迁移学习策略

```
MobileNetV3-Small (ImageNet 预训练)
├── features (冻结，0 训练参数)
└── classifier (重写，可训练)
    ├── Linear(576, 256)
    ├── ReLU
    ├── Dropout(0.3)
    └── Linear(256, 38)   ← 38 类输出
```

### 数据增强

| 方式 | 参数 | 目的 |
|------|------|------|
| RandomHorizontalFlip | p=0.5 | 叶片翻转 |
| RandomRotation | ±15° | 拍摄角度 |
| ColorJitter | brightness/contrast=0.2 | 光照变化 |
| Normalize | ImageNet 均值/方差 | 预训练权重对齐 |

### 训练配置

```
Optimizer:  Adam (lr=0.001, weight_decay=1e-4)
Loss:       CrossEntropyLoss
Batch:      64
ImgSize:    128
Epochs:     10
```

---

## 🔬 作物学视角解读（面试差异化亮点）

> 作为作物栽培硕士，我能把模型错误和作物生理关联起来

- **健康类全 95%+ 准确率**：无病斑、形态整齐，ImageNet 预训练已充分编码
- **番茄早疫病最弱（58.1%）**：与 Late blight、Target spot 病斑形态高度相似，早期阶段难区分
- **葡萄种间混淆**：Black_rot ↔ Esca（43 次）— 同属黑腐类病害，病斑视觉差异小
- **玉米叶斑病互混**：Cercospora ↔ Northern_Blight（29+24 次）— 都是下部叶片病斑，颜色深浅不同

---

## 📚 学习资源

- [PyTorch 官方教程](https://pytorch.org/tutorials/)
- [Kaggle Learn: Intro to Deep Learning](https://www.kaggle.com/learn/intro-to-deep-learning)
- [Howard et al., MobileNets (2017)](https://arxiv.org/abs/1704.04861)
- [PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)

---

## 🗺️ 路线图

```
✅ 阶段 1: Python + ML 基础       → crop-yield-prediction
✅ 阶段 2: DL + PyTorch + CNN    → plant-disease-cnn + ai4agri-stage2 (本仓库)
⬜ 阶段 3A: YOLOv8 目标检测
⬜ 阶段 3B: 遥感 + GIS (Sentinel-2)
⬜ 阶段 3C: GPU 云训练 (AutoDL)
```

---

## 📄 许可证

MIT License

---

<p align="center">
  Made with 🌱 by tang2277 · 作物栽培硕士 → AI for Science 工程师
</p>
