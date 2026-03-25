# ECHOWORLD Prototype · UI 设计文档

**平台：iOS / Android · Expo + React Native**
**版本：Prototype v1.0**
**配套文档：《UI文档_TextOnly.md》《开发技术文档.md》**

---

## 目录

1. [设计系统](#1-设计系统)
2. [A 账户与启动流程](#2-a-账户与启动流程)
3. [B 角色创建流程](#3-b-角色创建流程)
4. [C 世界地图](#4-c-世界地图)
5. [D 对话界面](#5-d-对话界面)
6. [E 角色状态页](#6-e-角色状态页)
7. [F Timeline](#7-f-timeline)
8. [G 设置](#8-g-设置)
9. [通用组件规范](#9-通用组件规范)

---

## 1. 设计系统

### 1.1 色彩 Token

```typescript
export const colors = {
  background: {
    primary:   '#FAF8F5',  // 主背景，暖白
    secondary: '#F2EDE6',  // 卡片背景，米色
    elevated:  '#EDE6DC',  // 浮层背景，深米色
  },
  text: {
    primary:   '#1A1714',  // 主文字，暖黑
    secondary: '#6B6259',  // 次级文字，暖棕灰
    tertiary:  '#A89D92',  // 占位文字，浅棕灰
    inverse:   '#FAF8F5',  // 反色文字（深色背景上）
  },
  accent: {
    primary:   '#8B6F47',  // 主强调色，棕金
    secondary: '#B5956A',  // 次强调色，浅棕金
    light:     '#E8DDD0',  // 轻强调，用于选中态背景
    danger:    '#9E4A3A',  // 危险操作，暗红棕
  },
  border: {
    subtle:    '#EAE3D9',  // 极淡边框
    default:   '#D9CFC4',  // 默认边框
    strong:    '#C4B5A5',  // 强调边框
  },
  state: {
    home:      '#7A9E8A',  // 在家，暖绿
    outing:    '#8B6F47',  // 外出，棕金
    traveling: '#9B9692',  // 旅途，中性灰
    sleeping:  '#C4B5A5',  // 睡眠，浅棕灰
    unread:    '#C0392B',  // 未读角标，红
  },
  message: {
    character: '#F2EDE6',  // 角色消息气泡背景
    player:    '#8B6F47',  // 玩家消息气泡背景（棕金）
  },
} as const;
```

### 1.2 字体层级

| 用途 | 字号 | 字重 | 颜色 |
|---|---|---|---|
| 页面大标题 | 26pt | 300 Light | primary |
| 区块标题 | 18pt | 500 Medium | primary |
| 正文 / 按钮 | 15pt | 400 Regular | primary |
| 说明 / 元信息 | 13pt | 400 Regular | secondary |
| 时间 / 标签 | 11pt | 400 Regular | tertiary |

### 1.3 间距与圆角

| 名称 | 数值 | 用途 |
|---|---|---|
| 页面水平边距 | 20pt | 所有页面内容左右边距 |
| 卡片内边距 | 16pt | 卡片内部 padding |
| 元素间距 S | 8pt | 紧密排列元素间距 |
| 元素间距 M | 16pt | 常规排列元素间距 |
| 元素间距 L | 24pt | 分组间距 |
| 按钮圆角 | 全圆（999） | 所有独立按钮 |
| 卡片圆角 | 16pt | 内容卡片 |
| 输入框圆角 | 12pt | 文本输入框 |
| 气泡圆角 | 18pt | 消息气泡 |

### 1.4 整体视觉基调

- **浅色系**：主背景为暖白（`#FAF8F5`），非纯白，有米色温度感
- **暖色强调**：棕金色（`#8B6F47`）用于主按钮、激活态、已读状态等所有强调元素
- **克制留白**：信息密度适中，卡片间有明确呼吸感
- **非即时通讯感**：不显示「正在输入…」，消息状态只用简单图标，不强调实时性
- **触摸目标**：最小 44×44pt，符合 iOS HIG 与 Android Material 规范
- **动画原则**：过渡 250–400ms，弹性曲线，Tab 切换淡入淡出

### 1.5 消息已读/未读规范

| 状态 | 图标 | 说明 |
|---|---|---|
| 发送中 | 单圆圈（细） | 仅玩家消息可见 |
| 已发送 | 单对勾 | 服务端已接收 |
| 已读 | 双对勾（棕金色） | 角色已读，不代表会回复 |
| 发送失败 | 红色感叹号 | 可点击重试 |

### 1.6 交互规范更新

- **返回按钮**：尺寸统一为 `56x56pt`，确保足够的触摸区域
- **SafeAreaView**：所有页面必须使用 `SafeAreaView` 包装，防止内容被状态栏遮挡
- **输入框**：聊天界面删除礼物图标，保持简洁

---

## 2. A 账户与启动流程

### A1 · 启动画面

#### ASCII 线框图

```
┌─────────────────────────────┐  ← 暖白全屏，无状态栏遮挡
│                             │
│                             │
│                             │
│         E C H O             │
│         W O R L D           │  ← 字母间距拉开，Light 字重，暖黑色
│                             │
│      一个数字居所             │  ← 13pt，占位色，字间距
│                             │
│       ──────────            │  ← 细分割线，border subtle
│                             │
│                             │
│                             │
│  ┌───────────────────────┐  │
│  │        开  始          │  │  ← Primary Button，棕金实心
│  └───────────────────────┘  │
│                             │
│    已有账户？  登录           │  ← 文字链，次级色 + 棕金色「登录」
│                             │
└─────────────────────────────┘
```

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- Logo -->
  <text x="195" y="330" text-anchor="middle"
        font-family="serif" font-size="26" letter-spacing="12"
        fill="#1A1714" font-weight="300">ECHO</text>
  <text x="195" y="366" text-anchor="middle"
        font-family="serif" font-size="26" letter-spacing="12"
        fill="#1A1714" font-weight="300">WORLD</text>
  <!-- 副标 -->
  <text x="195" y="404" text-anchor="middle"
        font-family="sans-serif" font-size="13"
        fill="#A89D92" letter-spacing="3">一个数字居所</text>
  <!-- 分割线 -->
  <line x1="155" y1="424" x2="235" y2="424"
        stroke="#EAE3D9" stroke-width="1"/>
  <!-- 主按钮 -->
  <rect x="40" y="700" width="310" height="52" rx="26"
        fill="#8B6F47"/>
  <text x="195" y="731" text-anchor="middle"
        font-family="sans-serif" font-size="15"
        fill="#FAF8F5" letter-spacing="4">开  始</text>
  <!-- 登录链接 -->
  <text x="148" y="785" font-family="sans-serif" font-size="13"
        fill="#A89D92">已有账户？</text>
  <text x="232" y="785" font-family="sans-serif" font-size="13"
        fill="#8B6F47">登录</text>
</svg>
```

---

### A2 · 登录界面

#### ASCII 线框图

```
┌─────────────────────────────┐
│  ←                          │  ← 返回按钮 56x56pt
│                             │
│  登录                        │  ← 26pt，Light
│  欢迎回来                    │  ← 13pt，占位色
│                             │
│  ┌───────────────────────┐  │
│  │ 邮箱地址               │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 密码               👁  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │        登  录          │  │  ← 棕金实心按钮
│  └───────────────────────┘  │
│                             │
│  ─────────── 或 ───────────  │
│                             │
│  ┌───────────────────────┐  │
│  │      验证码登录         │  │  ← 边框款按钮
│  └───────────────────────┘  │
│                             │
│  忘记密码？用验证码登录即可   │  ← 11pt，占位色
└─────────────────────────────┘
```

#### 更新说明

- 使用 `SafeAreaView` 包装整个页面
- 返回按钮尺寸为 `56x56pt`，提升触摸体验

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <text x="20" y="68" font-size="20" fill="#6B6259">←</text>
  <text x="20" y="138" font-family="serif" font-size="26"
        fill="#1A1714" font-weight="300">登录</text>
  <text x="20" y="162" font-family="sans-serif" font-size="13"
        fill="#A89D92">欢迎回来</text>
  <!-- 邮箱框 -->
  <rect x="20" y="196" width="350" height="52" rx="12"
        fill="#F2EDE6" stroke="#D9CFC4" stroke-width="1"/>
  <text x="40" y="227" font-size="15" fill="#A89D92">邮箱地址</text>
  <!-- 密码框 -->
  <rect x="20" y="264" width="350" height="52" rx="12"
        fill="#F2EDE6" stroke="#D9CFC4" stroke-width="1"/>
  <text x="40" y="295" font-size="15" fill="#A89D92">密码</text>
  <text x="352" y="295" text-anchor="end" font-size="14" fill="#A89D92">👁</text>
  <!-- 登录按钮 -->
  <rect x="20" y="344" width="350" height="52" rx="26" fill="#8B6F47"/>
  <text x="195" y="375" text-anchor="middle" font-size="15"
        fill="#FAF8F5" letter-spacing="4">登  录</text>
  <!-- 分割线 -->
  <line x1="20"  y1="424" x2="168" y2="424" stroke="#D9CFC4" stroke-width="1"/>
  <text x="195" y="428" text-anchor="middle" font-size="12" fill="#A89D92">或</text>
  <line x1="222" y1="424" x2="370" y2="424" stroke="#D9CFC4" stroke-width="1"/>
  <!-- 验证码按钮 -->
  <rect x="20" y="444" width="350" height="52" rx="26"
        fill="none" stroke="#D9CFC4" stroke-width="1"/>
  <text x="195" y="475" text-anchor="middle" font-size="15"
        fill="#6B6259">验证码登录</text>
  <!-- 说明 -->
  <text x="195" y="538" text-anchor="middle" font-size="11"
        fill="#A89D92">忘记密码？用验证码登录即可</text>
</svg>
```

---

### A6 · 玩家身份设置

#### ASCII 线框图

```
┌─────────────────────────────┐
│                             │
│  告诉角色你是谁              │  ← serif，26pt，仪式感
│  他们会记住这个名字           │  ← 13pt，占位色
│                             │
│          ┌──────┐           │
│          │  头像 │           │  ← 圆形，72pt，可点击换
│          │  ＋  │           │
│          └──────┘           │
│                             │
│  ┌───────────────────────┐  │
│  │ 你的名字           * 必填│  │
│  └───────────────────────┘  │
│                             │
│  性别（可选）                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌───┐ │
│  │ 男 │ │ 女 │ │其他│ │不透│ │  ← 单选胶囊，选中棕金边框
│  └────┘ └────┘ └────┘ └───┘ │
│                             │
│  ┌───────────────────────┐  │
│  │       进 入 世 界       │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## 3. B 角色创建流程

> 共 5 步，顶部有步骤进度指示器（小圆点 + 细连线，当前步骤棕金色）。退出后进度保存，下次从中断处继续。

### B2 · 拍摄原型照片（第 1 步）

#### ASCII 线框图

```
┌─────────────────────────────┐
│  ×          ●─○─○─○─○       │  ← 关闭 + 5步进度
│                             │
│  拍下它                      │  ← serif，26pt
│  让它成为某个人的起点          │  ← 13pt，占位色
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │                         │ │  ← 取景框，圆角矩形
│ │    四角棕金装饰线          │ │  ← 非完整边框，四角线段
│ │                         │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│   宠物 · 植物 · 玩具 · 物品  │  ← 11pt，占位色，居中
│                             │
│  ┌──────────┐ ┌──────────┐  │
│  │  📷 相机  │ │  从相册   │  │  ← 等宽，边框款
│  └──────────┘ └──────────┘  │
└─────────────────────────────┘
```

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- 顶部 -->
  <text x="20" y="66" font-size="18" fill="#6B6259">×</text>
  <!-- 进度点 -->
  <circle cx="180" cy="58" r="5" fill="#8B6F47"/>
  <line x1="190" y1="58" x2="218" y2="58" stroke="#D9CFC4" stroke-width="1"/>
  <circle cx="228" cy="58" r="5" fill="none" stroke="#D9CFC4" stroke-width="1.5"/>
  <line x1="238" y1="58" x2="266" y2="58" stroke="#D9CFC4" stroke-width="1"/>
  <circle cx="276" cy="58" r="5" fill="none" stroke="#D9CFC4" stroke-width="1.5"/>
  <line x1="286" y1="58" x2="314" y2="58" stroke="#D9CFC4" stroke-width="1"/>
  <circle cx="324" cy="58" r="5" fill="none" stroke="#D9CFC4" stroke-width="1.5"/>
  <!-- 标题 -->
  <text x="20" y="148" font-family="serif" font-size="26"
        fill="#1A1714" font-weight="300">拍下它</text>
  <text x="20" y="172" font-family="sans-serif" font-size="13"
        fill="#A89D92">让它成为某个人的起点</text>
  <!-- 取景框 -->
  <rect x="20" y="196" width="350" height="380" rx="16"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <!-- 四角装饰线（棕金） -->
  <path d="M40,216 L40,204 L52,204" fill="none" stroke="#8B6F47" stroke-width="2"/>
  <path d="M350,216 L350,204 L338,204" fill="none" stroke="#8B6F47" stroke-width="2"/>
  <path d="M40,556 L40,568 L52,568" fill="none" stroke="#8B6F47" stroke-width="2"/>
  <path d="M350,556 L350,568 L338,568" fill="none" stroke="#8B6F47" stroke-width="2"/>
  <!-- 提示 -->
  <text x="195" y="404" text-anchor="middle" font-size="12"
        fill="#A89D92">宠物 · 植物 · 玩具 · 物品</text>
  <!-- 底部按钮 -->
  <rect x="20"  y="612" width="163" height="52" rx="26"
        fill="none" stroke="#D9CFC4" stroke-width="1"/>
  <text x="101" y="643" text-anchor="middle" font-size="14" fill="#6B6259">📷 相机</text>
  <rect x="207" y="612" width="163" height="52" rx="26"
        fill="none" stroke="#D9CFC4" stroke-width="1"/>
  <text x="288" y="643" text-anchor="middle" font-size="14" fill="#6B6259">从相册选取</text>
</svg>
```

---

### B4 · 角色生成仪式（第 3 步）

#### ASCII 线框图

```
┌─────────────────────────────┐
│                             │
│                             │
│          · · ·              │  ← 浮动光点，暖金色，随机漂移
│        ·       ·            │
│           ·                 │
│                             │
│    他正在从那些照片里          │  ← serif，16pt，次级色
│    生长出来                  │
│                             │
│                             │
│    （无进度条，无百分比）       │
└─────────────────────────────┘
```

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- 光晕 -->
  <radialGradient id="warmGlow" cx="50%" cy="45%" r="35%">
    <stop offset="0%"   stop-color="#8B6F47" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="#8B6F47" stop-opacity="0"/>
  </radialGradient>
  <ellipse cx="195" cy="380" rx="180" ry="180" fill="url(#warmGlow)"/>
  <!-- 浮动光点（动画帧示意） -->
  <circle cx="188" cy="368" r="3"   fill="#8B6F47" opacity="0.8"/>
  <circle cx="204" cy="356" r="2"   fill="#B5956A" opacity="0.6"/>
  <circle cx="215" cy="374" r="1.5" fill="#8B6F47" opacity="0.4"/>
  <circle cx="176" cy="382" r="1.5" fill="#B5956A" opacity="0.5"/>
  <circle cx="210" cy="390" r="2"   fill="#8B6F47" opacity="0.3"/>
  <circle cx="195" cy="362" r="1"   fill="#B5956A" opacity="0.5"/>
  <!-- 文案 -->
  <text x="195" y="490" text-anchor="middle"
        font-family="serif" font-size="16"
        fill="#6B6259" font-weight="300">他正在从那些照片里</text>
  <text x="195" y="516" text-anchor="middle"
        font-family="serif" font-size="16"
        fill="#6B6259" font-weight="300">生长出来</text>
</svg>
```

---

### B6 · 草稿确认界面（第 5 步）

#### ASCII 线框图

```
┌─────────────────────────────┐
│  ←              ○─○─○─○─●  │  ← 返回按钮 56x56pt
│                             │
│  ┌──────┐  名字 *必填        │
│  │ 头像  │  ┌─────────────┐ │
│  │      │  │ 输入角色名字  │ │
│  └──────┘  └─────────────┘ │
│                             │
│  年龄    23  ‹  ›            │  ← 微调按钮，根据成熟度限制
│  性别    男  女  中性  未知   │
│                             │
│  ── 背景（只读）────────────  │
│  一个在咖啡馆长大的孩子……     │  ← 次级色，小字
│                             │
│  ── 性格（只读预览）──────── │
│  内向 ●──────── 外向         │
│  感性 ────●──── 理性         │
│                             │
│  兴趣  摄影  阅读  烹饪       │  ← 胶囊标签
│  城市  上海                  │
│                             │
│  ┌───────────────────────┐  │
│  │     就 是 她 / 他 了    │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

#### 更新说明

- 使用 `SafeAreaView` 包装整个页面
- 返回按钮尺寸为 `56x56pt`
- **修复**：成熟度选择步骤（第4步）必须选择选项才能进入下一步
- **年龄限制**：年龄微调范围根据所选成熟度动态调整：
  - 青年期（18-35岁）
  - 壮年期（36-55岁）
- **修复**：点击创建新角色按钮后自动重置草稿状态，确保从第一步开始

---

## 4. C 世界地图

### C1 · 世界地图主页

#### ASCII 线框图

```
┌─────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                      ░░ │
│ ░░        上 海          ░░ │  ← 城市名，小字，字间距
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                      ░░ │
│ ░░      ┌─────┐          ░░ │
│ ░░      │ 头像 │          ░░ │  ← 角色图标，米色背景+棕金边框
│ ░░      │     │          ░░ │
│ ░░      └─────┘          ░░ │
│ ░░       叶梧桐   ●       ░░ │  ← 名字 + 状态点（绿=在家）
│ ░░                      ░░ │
│ ░░ 🌳中央公园 🏛️博物馆   ░░ │  ← 景点标记（支持点击查看详情）
│ ░░ ☕咖啡街 📚图书馆      ░░ │
│ ░░ 🎵音乐厅               ░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│─────────────────────────────│
│   🗺 World   ✦ Discover  ⚙  │  ← Tab Bar，激活态棕金色
└─────────────────────────────┘
```

#### 更新说明

- 使用 `SafeAreaView` 包装整个页面
- **新增**：添加5个景点标记，支持点击查看详情：
  - 🌳 中央公园 - 城市中心的绿色绿洲
  - 🏛️ 艺术博物馆 - 收藏珍贵艺术品和文物
  - ☕ 咖啡街 - 充满文艺气息的街道
  - 📚 图书馆 - 安静的学习场所
  - 🎵 音乐厅 - 举办音乐会和演出

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
  <!-- 地图背景 -->
  <defs>
    <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#EDE6DC"/>
      <stop offset="100%" stop-color="#F2EDE6"/>
    </linearGradient>
  </defs>
  <rect width="390" height="760" fill="url(#mapBg)"/>
  <!-- 纹理线 -->
  <line x1="0"   y1="240" x2="390" y2="240" stroke="#EAE3D9" stroke-width="1"/>
  <line x1="0"   y1="420" x2="390" y2="420" stroke="#EAE3D9" stroke-width="1"/>
  <line x1="110" y1="0"   x2="110" y2="760" stroke="#EAE3D9" stroke-width="1"/>
  <line x1="280" y1="0"   x2="280" y2="760" stroke="#EAE3D9" stroke-width="1"/>
  <!-- 城市名 -->
  <text x="195" y="90" text-anchor="middle"
        font-family="sans-serif" font-size="12" letter-spacing="5"
        fill="#A89D92">上 海</text>
  <!-- 角色图标 -->
  <circle cx="195" cy="350" r="30" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1.5"/>
  <text x="195" y="358" text-anchor="middle" font-size="22">🐱</text>
  <!-- 状态点（在家=暖绿） -->
  <circle cx="218" cy="328" r="6" fill="#7A9E8A" stroke="#FAF8F5" stroke-width="2"/>
  <!-- 角色名 -->
  <text x="195" y="394" text-anchor="middle" font-family="sans-serif"
        font-size="12" fill="#6B6259">叶梧桐</text>
  <!-- 地标点 -->
  <circle cx="100" cy="480" r="4" fill="none" stroke="#C4B5A5" stroke-width="1.5"/>
  <text x="100" y="500" text-anchor="middle" font-size="10" fill="#A89D92">咖啡馆</text>
  <circle cx="290" cy="510" r="4" fill="none" stroke="#C4B5A5" stroke-width="1.5"/>
  <text x="290" y="530" text-anchor="middle" font-size="10" fill="#A89D92">图书馆</text>
  <!-- Tab Bar -->
  <rect x="0" y="760" width="390" height="84" fill="#FAF8F5"/>
  <line x1="0" y1="760" x2="390" y2="760" stroke="#EAE3D9" stroke-width="1"/>
  <text x="65"  y="798" text-anchor="middle" font-size="20">🗺</text>
  <text x="195" y="798" text-anchor="middle" font-size="20">✦</text>
  <text x="325" y="798" text-anchor="middle" font-size="20">⚙</text>
  <text x="65"  y="816" text-anchor="middle" font-size="10" fill="#8B6F47">World</text>
  <text x="195" y="816" text-anchor="middle" font-size="10" fill="#A89D92">Discover</text>
  <text x="325" y="816" text-anchor="middle" font-size="10" fill="#A89D92">Setting</text>
</svg>
```

---

### C1.1 · 角色卡片弹出层

#### ASCII 线框图

```
┌─────────────────────────────┐
│  （地图背景半透明遮罩）        │
│                             │
│  ┌───────────────────────┐  │
│  │ [头像] 叶梧桐           │  │
│  │        在咖啡馆         │  │
│  │        翻着什么，偶尔…  │  │  ← 当前行为
│  │                       │  │
│  │  上海           14:32 │  │  ← 左:城市  右:当地时间
│  │                       │  │
│  │  ┌──────────┐ ┌──────┐│  │
│  │  │  发 消 息  │ │查看状││  │
│  │  └──────────┘ └──────┘│  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- 遮罩 -->
  <rect width="390" height="844" fill="rgba(250,248,245,0.6)"/>
  <!-- 卡片 -->
  <rect x="20" y="510" width="350" height="220" rx="20"
        fill="#FAF8F5" stroke="#EAE3D9" stroke-width="1"/>
  <!-- 投影效果（简化） -->
  <rect x="22" y="512" width="350" height="220" rx="20"
        fill="none" stroke="#D9CFC4" stroke-width="0.5" opacity="0.5"/>
  <!-- 头像 -->
  <circle cx="56" cy="556" r="24" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1.5"/>
  <text x="56" y="564" text-anchor="middle" font-size="20">🐱</text>
  <!-- 名字 + 行为 -->
  <text x="92" y="546" font-family="sans-serif" font-size="15"
        fill="#1A1714">叶梧桐</text>
  <text x="92" y="564" font-family="sans-serif" font-size="12"
        fill="#A89D92">在咖啡馆 · 翻着什么，偶尔抬头</text>
  <!-- 分割线 -->
  <line x1="40" y1="588" x2="350" y2="588" stroke="#EAE3D9" stroke-width="1"/>
  <!-- 城市 + 时间 -->
  <text x="40" y="614" font-size="13" fill="#6B6259">上海</text>
  <text x="350" y="614" text-anchor="end" font-size="13" fill="#A89D92">14:32</text>
  <!-- 按钮 -->
  <rect x="40"  y="634" width="148" height="44" rx="22" fill="#8B6F47"/>
  <text x="114" y="661" text-anchor="middle" font-size="14"
        fill="#FAF8F5">发消息</text>
  <rect x="202" y="634" width="148" height="44" rx="22"
        fill="none" stroke="#D9CFC4" stroke-width="1"/>
  <text x="276" y="661" text-anchor="middle" font-size="14"
        fill="#6B6259">查看状态</text>
</svg>
```

---

## 5. D 对话界面

### D1 · 聊天主界面

#### ASCII 线框图

```
┌─────────────────────────────┐
│  ←  [头像] 叶梧桐  在咖啡馆  │  ← Header（返回按钮 56x56pt）
│                  上海 14:32 │
│─────────────────────────────│
│                             │
│  ┌──────────────────────┐   │
│  │ 你好呀，好久不见。      │   │  ← 角色消息（左，米色气泡）
│  │                  3天前│   │
│  │                  ✓✓  │   │  ← 已读（棕金双对勾）
│  └──────────────────────┘   │
│                             │
│           ┌───────────────┐ │
│           │  最近怎么样    │ │  ← 玩家消息（右，棕金气泡）
│           │          2天前│ │
│           │           ✓✓ │ │
│           └───────────────┘ │
│                             │
│  ┌───────────────────────┐  │
│  │ 还不错，昨天去了图书馆  │  │  ← 角色回复
│  │                  刚才 │  │
│  │                   ✓  │  │  ← 已发送（单对勾）
│  └───────────────────────┘  │
│─────────────────────────────│
│      ┌──────────────────┐ ▶ │  ← 输入区（已删除礼物图标）
│      │  ...             │   │
│      └──────────────────┘   │
└─────────────────────────────┘
```

#### 更新说明

- 使用 `SafeAreaView` 包装整个页面
- 返回按钮尺寸为 `56x56pt`
- **修复**：删除输入框左侧的礼物图标（🎁），保持界面简洁
- **修复**：发送消息时只显示一条消息框，移除临时消息的重复显示

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- Header -->
  <rect x="0" y="0" width="390" height="88" fill="#FAF8F5"/>
  <line x1="0" y1="88" x2="390" y2="88" stroke="#EAE3D9" stroke-width="1"/>
  <text x="20" y="58" font-size="18" fill="#6B6259">←</text>
  <circle cx="56" cy="52" r="18" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1"/>
  <text x="56" y="60" text-anchor="middle" font-size="14">🐱</text>
  <text x="84" y="46" font-family="sans-serif" font-size="15" fill="#1A1714">叶梧桐</text>
  <text x="84" y="64" font-family="sans-serif" font-size="11" fill="#A89D92">在咖啡馆 · 上海 14:32</text>

  <!-- 角色消息（左，米色） -->
  <rect x="20" y="112" width="220" height="68" rx="18"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <text x="38" y="136" font-size="14" fill="#1A1714">你好呀，好久不见。</text>
  <text x="38" y="158" font-size="11" fill="#A89D92">3 天前</text>
  <text x="222" y="168" text-anchor="end" font-size="11" fill="#8B6F47">✓✓</text>

  <!-- 玩家消息（右，棕金） -->
  <rect x="148" y="210" width="222" height="60" rx="18" fill="#8B6F47"/>
  <text x="166" y="234" font-size="14" fill="#FAF8F5">最近怎么样</text>
  <text x="356" y="256" text-anchor="end" font-size="11" fill="#E8DDD0">2 天前  ✓✓</text>

  <!-- 角色回复 -->
  <rect x="20" y="300" width="270" height="80" rx="18"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <text x="38" y="324" font-size="14" fill="#1A1714">还不错，昨天去了图书馆，</text>
  <text x="38" y="344" font-size="14" fill="#1A1714">看到一本很有意思的书。</text>
  <text x="38" y="368" font-size="11" fill="#A89D92">刚才  ✓</text>

  <!-- 输入区 -->
  <rect x="0" y="730" width="390" height="114" fill="#FAF8F5"/>
  <line x1="0" y1="730" x2="390" y2="730" stroke="#EAE3D9" stroke-width="1"/>
  <rect x="20" y="750" width="320" height="44" rx="22"
        fill="#F2EDE6" stroke="#D9CFC4" stroke-width="1"/>
  <text x="44" y="777" font-size="14" fill="#A89D92">...</text>
  <circle cx="358" cy="772" r="20" fill="#8B6F47"/>
  <text x="358" y="778" text-anchor="middle" font-size="14" fill="#FAF8F5">▶</text>
</svg>
```

---

## 6. E 角色状态页

#### ASCII 线框图

```
┌─────────────────────────────┐
│  ←      叶梧桐的此刻          │
│─────────────────────────────│
│                             │
│  ┌───────────────────────┐  │
│  │ 📍 咖啡馆              │  │
│  │    上海 · 外滩 · 14:32 │  │
│  │ ─────────────────────  │  │
│  │ 翻着什么，偶尔抬头看窗外 │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 精力  ████████░░  还好 │  │  ← 模糊进度条
│  │ 情绪  有点平静          │  │
│  └───────────────────────┘  │
│                             │
│  今 日                       │
│  ┌───────────────────────┐  │
│  │ 去过  [咖啡馆] [公园]  │  │
│  │ 遇见   —               │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 发消息       删除角色    │  │  ← 底部双按钮布局
│  └───────────────────────┘  │
└─────────────────────────────┘
```

#### 更新说明

- **新增**：底部添加"删除角色"按钮，使用危险样式（红色边框）
- **按钮布局**：水平排列两个按钮，"发消息"占2/3宽度，"删除角色"占1/3宽度
- **删除确认**：点击删除按钮弹出确认对话框，显示角色名称和警告信息
- **删除逻辑**：删除成功后自动返回上一页，删除失败显示错误提示

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- Header -->
  <text x="20" y="66" font-size="18" fill="#6B6259">←</text>
  <text x="195" y="66" text-anchor="middle" font-size="15"
        fill="#1A1714">叶梧桐的此刻</text>
  <line x1="0" y1="80" x2="390" y2="80" stroke="#EAE3D9" stroke-width="1"/>

  <!-- 位置卡片 -->
  <rect x="20" y="100" width="350" height="110" rx="16"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40" y="128" font-size="13" fill="#8B6F47">📍</text>
  <text x="58" y="128" font-family="sans-serif" font-size="15" fill="#1A1714">咖啡馆</text>
  <text x="40" y="148" font-family="sans-serif" font-size="12" fill="#A89D92">上海 · 外滩 · 14:32</text>
  <line x1="40" y1="162" x2="350" y2="162" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40" y="184" font-family="sans-serif" font-size="13"
        fill="#6B6259">翻着什么，偶尔抬头看窗外</text>

  <!-- 精力情绪卡片 -->
  <rect x="20" y="228" width="350" height="80" rx="16"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40" y="256" font-size="12" fill="#A89D92">精力</text>
  <rect x="80" y="246" width="160" height="6" rx="3" fill="#EAE3D9"/>
  <rect x="80" y="246" width="108" height="6" rx="3" fill="#8B6F47" opacity="0.6"/>
  <text x="252" y="256" font-size="11" fill="#A89D92">还好</text>
  <text x="40" y="292" font-size="12" fill="#A89D92">情绪</text>
  <text x="80" y="292" font-size="13" fill="#6B6259">有点平静</text>

  <!-- 今日区块 -->
  <text x="20" y="336" font-size="12" fill="#A89D92" letter-spacing="2">今 日</text>
  <rect x="20" y="350" width="350" height="80" rx="16"
        fill="#F2EDE6" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40" y="378" font-size="12" fill="#A89D92">去过</text>
  <rect x="76"  y="364" width="58" height="24" rx="12" fill="#EDE6DC"/>
  <text x="105" y="381" text-anchor="middle" font-size="11" fill="#6B6259">咖啡馆</text>
  <rect x="142" y="364" width="44" height="24" rx="12" fill="#EDE6DC"/>
  <text x="164" y="381" text-anchor="middle" font-size="11" fill="#6B6259">公园</text>
  <text x="40" y="414" font-size="12" fill="#A89D92">遇见</text>
  <text x="80" y="414" font-size="12" fill="#C4B5A5">—</text>

  <!-- 发消息按钮 -->
  <rect x="20" y="756" width="350" height="52" rx="26" fill="#8B6F47"/>
  <text x="195" y="787" text-anchor="middle" font-size="15"
        fill="#FAF8F5" letter-spacing="4">发 消 息</text>
</svg>
```

---

## 7. F Timeline

### F1 · Timeline 主界面

#### ASCII 线框图

```
┌─────────────────────────────┐
│            Discover         │
│─────────────────────────────│
│ [全部] [叶梧桐]               │  ← 筛选栏（胶囊，选中棕金）
│─────────────────────────────│
│  ┌───────────────────────┐  │
│  │[头像] 李明   30分钟前   │  │  ← 测试数据
│  │       中央公园          │  │
│  │                       │  │
│  │  今天在公园里散步，看到了  │  │
│  │  美丽的日落。生活真美好！ │  │
│  │                       │  │
│  │  ♡ 12         💬 3    │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │[头像] 王芳   2小时前    │  │  ← 测试数据（带图片）
│  │       艺术工作室        │  │
│  │  ┌─────────────────┐  │  │
│  │  │    [ 图 片 ]     │  │  │
│  │  └─────────────────┘  │  │
│  │  刚完成了一幅新画，感觉很满意！│
│  │  ♡ 25         💬 7    │  │
│  └───────────────────────┘  │
│─────────────────────────────│
│   🗺 World  ✦ Discover   ⚙  │
└─────────────────────────────┘
```

#### 更新说明

- 使用 `SafeAreaView` 包装整个页面
- **多角色支持**：为每个创建的角色生成5条随机动态，使用角色真实名字
- **角色筛选**：支持按角色名称筛选动态，显示所有用户创建的角色按钮
- **数据保存**：生成的帖子数据保存到mockApi，确保详情页能正确加载

#### SVG 示意图

```svg
<svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5">
  <!-- Header -->
  <text x="195" y="66" text-anchor="middle" font-size="15"
        fill="#1A1714" letter-spacing="2">Discover</text>
  <line x1="0" y1="80" x2="390" y2="80" stroke="#EAE3D9" stroke-width="1"/>

  <!-- 筛选栏 -->
  <rect x="20" y="96" width="56" height="28" rx="14" fill="#8B6F47"/>
  <text x="48" y="115" text-anchor="middle" font-size="12" fill="#FAF8F5">全部</text>
  <rect x="84" y="96" width="72" height="28" rx="14"
        fill="none" stroke="#D9CFC4" stroke-width="1"/>
  <text x="120" y="115" text-anchor="middle" font-size="12" fill="#6B6259">叶梧桐</text>

  <!-- Post 1 -->
  <rect x="20" y="140" width="350" height="168" rx="16"
        fill="#FAF8F5" stroke="#EAE3D9" stroke-width="1"/>
  <circle cx="48" cy="170" r="18" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1"/>
  <text x="48" y="178" text-anchor="middle" font-size="14">🐱</text>
  <text x="76" y="163" font-size="13" fill="#1A1714">叶梧桐</text>
  <text x="76" y="181" font-size="11" fill="#A89D92">咖啡馆 · 上海 · 2小时前</text>
  <text x="40" y="212" font-size="14" fill="#6B6259">下雨了，窗外的人走得很快。</text>
  <text x="40" y="232" font-size="14" fill="#6B6259">我喝了两杯咖啡。</text>
  <line x1="40" y1="252" x2="350" y2="252" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40"  y="272" font-size="13" fill="#A89D92">♡  1</text>
  <text x="120" y="272" font-size="13" fill="#A89D92">💬  0</text>

  <!-- Post 2 -->
  <rect x="20" y="328" width="350" height="220" rx="16"
        fill="#FAF8F5" stroke="#EAE3D9" stroke-width="1"/>
  <circle cx="48" cy="358" r="18" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1"/>
  <text x="48" y="366" text-anchor="middle" font-size="14">🐱</text>
  <text x="76" y="351" font-size="13" fill="#1A1714">叶梧桐</text>
  <text x="76" y="369" font-size="11" fill="#A89D92">公园 · 上海 · 昨天</text>
  <rect x="40" y="384" width="310" height="110" rx="10" fill="#EDE6DC"/>
  <text x="195" y="446" text-anchor="middle" font-size="12" fill="#C4B5A5">[ 图片 ]</text>
  <text x="40" y="514" font-size="14" fill="#6B6259">秋天还是来了</text>
  <line x1="40" y1="528" x2="350" y2="528" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40"  y="536" font-size="12" fill="#8B6F47">♡  3</text>
  <text x="120" y="536" font-size="12" fill="#A89D92">💬  1</text>

  <!-- Post 3 - 第二个角色的动态 -->
  <rect x="20" y="568" width="350" height="160" rx="16"
        fill="#FAF8F5" stroke="#EAE3D9" stroke-width="1"/>
  <circle cx="48" cy="598" r="18" fill="#F2EDE6" stroke="#8B6F47" stroke-width="1"/>
  <text x="48" y="606" text-anchor="middle" font-size="14">🐶</text>
  <text x="76" y="591" font-size="13" fill="#1A1714">林知夏</text>
  <text x="76" y="609" font-size="11" fill="#A89D92">图书馆 · 上海 · 3小时前</text>
  <text x="40" y="640" font-size="14" fill="#6B6259">今天读了一本很有意思的书，收获很多。</text>
  <line x1="40" y1="660" x2="350" y2="660" stroke="#EAE3D9" stroke-width="1"/>
  <text x="40"  y="678" font-size="12" fill="#A89D92">♡  8</text>
  <text x="120" y="678" font-size="12" fill="#A89D92">💬  2</text>

  <!-- Tab Bar -->
  <rect x="0" y="760" width="390" height="84" fill="#FAF8F5"/>
  <line x1="0" y1="760" x2="390" y2="760" stroke="#EAE3D9" stroke-width="1"/>
  <text x="65"  y="798" text-anchor="middle" font-size="20">🗺</text>
  <text x="195" y="798" text-anchor="middle" font-size="20" fill="#8B6F47">✦</text>
  <text x="325" y="798" text-anchor="middle" font-size="20">⚙</text>
  <text x="65"  y="816" text-anchor="middle" font-size="10" fill="#A89D92">World</text>
  <text x="195" y="816" text-anchor="middle" font-size="10" fill="#8B6F47">Discover</text>
  <text x="325" y="816" text-anchor="middle" font-size="10" fill="#A89D92">Setting</text>
</svg>
```

---

## 8. G 设置

### G1 · 设置主页

#### ASCII 线框图

```
┌─────────────────────────────┐
│           Setting           │
│─────────────────────────────│
│  ┌───────────────────────┐  │
│  │ [头像]  你的名字        │  │  ← 玩家信息区，可进入编辑
│  │         男             │  │
│  └───────────────────────┘  │
│                             │
│  角 色 信 息                 │  ← 分组小标，占位色
│  ─────────────────────────  │
│  ┌───────────────────────┐  │
│  │ [头像] 叶梧桐   在家     │
│  │                 查看     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ [头像] 林知夏   外出     │
│  │                 查看     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │     创建新角色          │  │
│  └───────────────────────┘  │
│                             │
│  数 据 管 理                 │  ← 分组小标，占位色
│  ─────────────────────────  │
│  清空数据                    │  ← 危险色文字，清空后返回开始界面
│                             │
│  账 户                       │  ← 分组小标，占位色
│  ─────────────────────────  │
│  Profile                  > │
│  Change Password          > │
│  Change Email             > │
│  Sign Out                   │  ← 危险色文字，无箭头
│                             │
│  通 知                       │
│  ─────────────────────────  │
│  Notification             > │
│                             │
│  偏 好                       │
│  ─────────────────────────  │
│  Languages                > │
│                             │
│  支 持                       │
│  ─────────────────────────  │
│  ECHOWORLD Docs           > │
│  Customer Service         > │
│                             │
│  法 律                       │
│  ─────────────────────────  │
│  About Us                 > │
│  Privacy Policy           > │
└─────────────────────────────┘
```

#### 更新说明

- **按钮对齐**：所有设置项按钮保持左对齐，确保视觉一致性
- **角色管理**：角色列表显示角色状态和"查看"按钮，支持进入角色详情页
- **数据管理**：清空数据功能清空所有本地存储数据，清空后自动返回开始界面
- **创建角色**：点击"创建新角色"按钮自动重置草稿状态，确保从第一步开始

---

## 9. 通用组件规范

### 9.1 按钮

| 类型 | 背景 | 文字 | 边框 | 用途 |
|---|---|---|---|---|
| Primary | 棕金 `#8B6F47` | 暖白 `#FAF8F5` | 无 | 主操作 |
| Secondary | 透明 | 次级棕灰 | `#D9CFC4` | 次级操作 |
| Ghost | 透明 | 棕金 `#8B6F47` | 无 | 文字链接 |
| Danger | 透明 | 危险暗红 `#9E4A3A` | `#9E4A3A` | 不可逆操作 |

- 高度：52pt，全圆角，字号 15pt
- 禁用态：整体透明度 40%
- 加载态：文字替换为 ActivityIndicator

### 9.2 输入框

- 高度 52pt，圆角 12pt
- 背景：卡片色 `#F2EDE6`，边框：`#D9CFC4`
- 聚焦：边框变棕金 `#8B6F47`
- 错误：边框变危险色，下方显示红棕说明文字

### 9.3 卡片

- 背景：`#FAF8F5`（页面内）或 `#F2EDE6`（嵌套卡片）
- 边框：1pt `#EAE3D9`（极淡）
- 圆角：16pt，内边距：16pt

### 9.4 角色头像图标（地图上）

| 状态 | 边框色 | 透明度 | 状态点 |
|---|---|---|---|
| 正常 | 棕金 `#8B6F47` | 100% | 按行为显示 |
| 睡眠 | 浅棕灰 `#C4B5A5` | 60% | 无 |
| 放弃倒计时 | 危险暗红 `#9E4A3A` | 75% | 无 |
| 已失踪 | `#C4B5A5` | 35%，灰度滤镜 | 无 |

### 9.5 消息状态图标

- 发送中：细圆圈，`#C4B5A5`，旋转动画
- 已发送 ✓：单对勾，`#A89D92`
- 已读 ✓✓：双对勾，棕金 `#8B6F47`
- 失败：红色感叹号，可点击重试

### 9.6 Tab Bar

- 高度：84pt（含底部安全区 ~34pt）
- 背景：`#FAF8F5` + 顶部 1pt `#EAE3D9` 分割线
- 激活态：图标 + 标签均为棕金 `#8B6F47`
- 非激活态：图标 + 标签均为 `#A89D92`

### 9.7 页面过渡

| 场景 | 动效 |
|---|---|
| Tab 切换 | 淡入淡出，250ms |
| Stack Push | 从右滑入，300ms，弹性曲线 |
| 底部弹出卡片 | 上滑淡入，200ms |
| 生成仪式进入 | 全屏淡入，800ms |

---

*ECHOWORLD Prototype · UI 设计文档 · v1.0*
*配套文档：《EchoworldPrototype_UI文档_TextOnly.md》· 《EchoworldPrototype_开发技术文档.md》*
*UI 文档与开发文档同步维护，设计或技术方案变动请同时更新。*
