# ECHOWORLD - 数字居所应用

ECHOWORLD 是一个基于 React Native 构建的数字居所应用，提供沉浸式的数字体验和情感交流平台。

## 项目概述

ECHOWORLD 旨在创建一个数字空间，让用户能够：
- 与AI角色进行深度对话
- 探索不同的情感场景
- 记录和反思个人情感历程
- 在数字环境中建立个人档案

## 技术栈

- **框架**: React Native + Expo
- **导航**: React Navigation
- **状态管理**: React Context + useReducer
- **设计系统**: 基于 Ethereal Archive 设计规范

## 项目结构

```
EchoWorld/
├── src/
│   ├── screens/           # 屏幕组件
│   │   ├── LoadingScreen.js
│   │   ├── WelcomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── MainScreen.js
│   │   ├── ProfileScreen.js
│   │   └── ConversationScreen.js
│   ├── context/           # 状态管理
│   │   └── AppStateContext.js
│   └── config/            # 配置文件
│       └── fonts.js
├── assets/               # 静态资源
│   ├── stitch_echoworld/ # 界面设计文件
│   └── ECHOWORLD_玩家操作流程_v0.35.docx
├── App.js               # 应用入口
├── app.json             # Expo配置
└── package.json         # 依赖管理
```

## 功能特性

### 1. 启动流程
- **加载屏幕**: 展示品牌标识和启动动画
- **欢迎页面**: 提供登录和注册入口
- **身份验证**: 用户注册和登录功能

### 2. 主界面
- **角色管理**: 查看和切换当前AI角色
- **场景探索**: 访问不同的情感场景
- **活动记录**: 查看最近的用户活动
- **个人档案**: 访问和编辑用户信息

### 3. 对话系统
- **实时对话**: 与AI角色进行文本交流
- **情感响应**: AI根据用户输入生成情境化回复
- **对话历史**: 保存和查看过往对话记录

### 4. 个人档案
- **信息编辑**: 修改用户名和个人简介
- **心境选择**: 设置当前情感状态
- **数据统计**: 查看使用数据和分析
- **偏好设置**: 自定义应用体验

## 设计系统

基于 Ethereal Archive 设计规范：

### 色彩系统
- **主色调**: #5f5e5e (深灰)
- **背景色**: #f9f9f7 (米白)
- **辅助色**: #51616e (蓝灰), #665b6e (紫灰)
- **情感色**: #A8C3B8 (活力薄荷), #F2E3FA (情感紫)

### 字体系统
- **主字体**: Inter (现代无衬线)
- **标题字体**: Noto Serif (传统衬线)
- **强调层次**: 通过字重和间距创造视觉层次

### 设计原则
- **无边界设计**: 避免使用1px实线边框
- **层次感**: 通过背景色变化定义区域
- **呼吸空间**: 大量留白创造宁静感
- **玻璃质感**: 半透明效果增强深度感

## 安装和运行

### 环境要求
- Node.js 16+
- Expo CLI
- iOS/Android 模拟器或真机

### 安装步骤

1. 安装依赖：
```bash
cd EchoWorld
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 运行应用：
- 扫描二维码在Expo Go应用中打开
- 或在模拟器中按对应平台命令运行

### 平台特定命令
```bash
npm run android    # Android模拟器
npm run ios        # iOS模拟器
npm run web        # Web浏览器
```

## 开发说明

### 添加新屏幕
1. 在 `src/screens/` 创建新组件
2. 在 `App.js` 中添加路由配置
3. 更新导航逻辑

### 状态管理
使用 `useAppState` hook 访问全局状态：
```javascript
import { useAppState } from '../context/AppStateContext';

const { state, actions } = useAppState();
```

### 样式规范
遵循设计系统的色彩和间距规范，使用StyleSheet创建组件样式。

## 未来扩展

- [ ] 集成AI对话API
- [ ] 添加更多情感场景
- [ ] 实现数据持久化
- [ ] 添加离线功能
- [ ] 多语言支持
- [ ] 推送通知

## 许可证

本项目基于 MIT 许可证开源。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。