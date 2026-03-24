# ECHOWORLD Prototype · 开发技术文档

**技术栈：Expo · React Native · TypeScript**
**范围：MVP · 单角色 · 单玩家**
**版本：Prototype v1.0**

---

## 目录

1. [技术选型](#1-技术选型)
2. [项目结构](#2-项目结构)
3. [核心数据模型](#3-核心数据模型)
4. [状态管理架构](#4-状态管理架构)
5. [导航结构](#5-导航结构)
6. [核心模块实现](#6-核心模块实现)
7. [API 接口契约](#7-api-接口契约)
8. [本地存储策略](#8-本地存储策略)
9. [推送通知](#9-推送通知)
10. [性能规范](#10-性能规范)
11. [测试策略](#11-测试策略)
12. [环境配置](#12-环境配置)
13. [开发规范](#13-开发规范)
14. [MVP 后扩展接口预留](#14-mvp-后扩展接口预留)

---

## 1. 技术选型

### 1.1 核心依赖

| 库 | 版本 | 用途 | 选型理由 |
|---|---|---|---|
| expo | ~51.0 | 开发环境与构建 | 官方推荐，简化原生配置 |
| react-native | 0.74.x | 跨平台框架 | — |
| typescript | ^5.3 | 类型安全 | 严格模式，减少运行时错误 |
| react-native-reanimated | ~3.10 | 高性能动画 | 生成仪式光点动效 |
| zustand | ^4.5 | 全局状态管理 | 轻量，无 boilerplate，适合 MVP |
| react-query (react-query) | ^5.0 | 服务端数据缓存 | 自动 refetch、乐观更新、离线处理 |
| @react-native-async-storage/async-storage | ^1.23.0 | 本地数据存储 | 数据持久化 |
| react-native-elements | ^3.4.3 | 基础UI组件 | 快速构建基础 UI |
| react-native-vector-icons | ^10.0.0 | 图标库 | 底部导航、状态图标 |
| react-native-maps | ^1.14.0 | 地图组件 | 世界地图展示 |
| expo-image-picker | ~15.0 | 相机 / 相册 | 角色创建照片拍摄 |
| expo-location | ~17.0 | 获取位置 | 角色出生城市推导 |
| date-fns-tz | ^3.1 | 时区处理 | 角色当地时间显示 |

### 1.2 状态管理与存储说明

- **全局状态管理**：使用 Zustand 管理客户端状态（用户信息、角色信息、UI状态、创建流程草稿）
- **服务端数据缓存**：使用 react-query 管理服务端数据（消息列表、Timeline、角色状态）
- **本地存储**：使用 AsyncStorage 进行数据持久化（用户偏好、通知设置、创建进度断点）
- **Token 存储**：使用 AsyncStorage 存储认证 Token

---

## 2. 项目结构

```
echoworld/
├── src/
│   ├── components/                 # 可复用组件
│   │   ├── common/                # 通用组件
│   │   ├── ui/                   # UI基础组件
│   │   └── layout/                # 布局组件
│   ├── screens/                   # 界面组件
│   │   ├── World/                 # 世界地图界面
│   │   ├── Chat/                  # 对话界面
│   │   ├── Profile/               # 角色状态界面
│   │   ├── Timeline/              # 时间线界面
│   │   └── Settings/              # 设置界面
│   ├── navigation/                # 导航配置
│   ├── services/                  # API服务层
│   ├── stores/                   # Zustand 状态管理
│   ├── utils/                    # 工具函数
│   ├── types/                    # TypeScript类型定义
│   └── assets/                   # 静态资源
│
├── App.tsx                        # 应用入口
├── app.json
├── tsconfig.json
└── .env.example
```

---

## 3. 核心数据模型

### 3.1 用户（Player）

```typescript
interface Player {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  createdAt: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
}
```

### 3.2 角色（Character）

```typescript
type LifeStage = 'adolescent' | 'youth' | 'prime' | 'middle_aged';
type CharacterStatus = 'home' | 'outing' | 'traveling' | 'sleeping';
type AbsenceState = 'none' | 'noticed' | 'felt' | 'accepted';
type MoodTag =
  | 'excited' | 'cheerful' | 'restless'
  | 'content' | 'calm' | 'melancholy'
  | 'lonely' | 'anxious' | 'tired'
  | 'moved' | 'irritable' | 'nostalgic';

interface Character {
  id: string;
  name: string;
  avatarUrl: string | null;
  age: number;
  gender: 'male' | 'female' | 'neutral' | 'unknown';
  lifeStage: LifeStage;
  backgroundStory: string;
  birthCity: string;
  personalityTraits: {
    ie: number; // -1.0(I) ~ 1.0(E)
    ns: number;
    tf: number;
    jp: number;
  };
  interestTags: string[];

  // 动态状态
  status: CharacterStatus;
  currentLocation: {
    landmarkType: string;
    landmarkName: string;
    city: string;
    localTime: string; // ISO 8601
    timeZone: string;
  };
  emotionalState: { primary: MoodTag; intensity: number };
  energy: number;             // 0.0 - 1.0
  energyDescription: string;
  currentBehaviorDescription: string;

  // 关系与缺席
  absenceState: AbsenceState;
  absenceDays: number;
  bondStrength: number;       // 0.0 - 1.0
  isAbandoned: boolean;       // 放弃倒计时中
  isLost: boolean;            // 已失踪

  todaySummary: {
    placesVisited: string[];
    charactersEncountered: { name: string; avatarUrl: string | null }[];
  };

  createdAt: string;
  updatedAt: string;
}
```

### 3.3 消息（Message）

```typescript
type MessageSender = 'player' | 'character';
type MessageStatus = 'sending' | 'sent' | 'read' | 'failed';

interface Message {
  id: string;
  characterId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;          // ISO 8601，以玩家时区显示
  status: MessageStatus;
}
```

### 3.4 Timeline Post

```typescript
interface TimelinePost {
  id: string;
  characterId: string;
  characterName: string;
  characterAvatarUrl: string | null;
  contentType: 'text' | 'image';
  text: string;
  imageUrl: string | null;
  locationLabel: string;      // 「咖啡馆 · 上海」
  publishedAt: string;
  likeCount: number;
  replyCount: number;
  isLikedByPlayer: boolean;
}
```

---

## 4. 状态管理架构

### 4.1 分层原则

| 层级 | 工具 | 用途 |
|---|---|---|
| 客户端全局状态 | Zustand | 用户信息、角色信息、UI 状态、创建流程草稿 |
| 服务端数据缓存 | React Query | 消息列表、Timeline、角色状态（含自动刷新） |
| 本地数据存储 | AsyncStorage | 通知设置、创建进度断点、用户偏好 |
| 认证信息 | AsyncStorage | AccessToken、RefreshToken |

### 4.2 Zustand Store 概览

**authStore**：player、tokens、isAuthenticated、setAuth()、clearAuth()、updatePlayer()

**characterStore**：character、hasCharacter、draft（创建流程草稿）、setCharacter()、updateCharacter()、draft 相关操作

**chatStore**：messages 列表、prependMessages()、appendMessage()、markAsRead()

**uiStore**：activeCharacterCardId（地图卡片弹出状态）、globalLoading

### 4.3 React Query 配置

```typescript
// 关键配置
defaultOptions: {
  queries: {
    staleTime: 1000 * 60 * 2,    // 2 分钟内不重新请求
    gcTime:    1000 * 60 * 10,   // 10 分钟后清除缓存
    retry: 2,
  }
}

// Query Keys
queryKeys = {
  character:       ['character'],
  characterStatus: ['character', 'status'],    // 每 60 秒 refetch
  messages:        (id) => ['messages', id],   // 每 30 秒 refetch
  timeline:        ['timeline'],               // 下拉刷新触发
}
```

---

## 5. 导航结构

### 5.1 路由树

```
Root Layout（Auth Guard）
├── (auth)          → 未登录：启动页 / 登录 / 注册 / 邮箱验证 / 玩家身份设置
├── (create)        → 已登录但无角色：5步角色创建流程
├── (tabs)          → 已登录且有角色：World / Discover / Setting
├── character/[id]/chat
├── character/[id]/status
├── post/[id]
└── settings/*      → profile / change-password / change-email / notifications
```

### 5.2 Auth Guard 逻辑

```
App 启动
  ├── 未登录 → 跳转 (auth)
  ├── 已登录 + 无角色 → 跳转 (create)/photo-character
  └── 已登录 + 有角色 → 跳转 (tabs)/world
```

Token 到期时由 Axios 拦截器静默刷新，用户无感知。刷新失败则清除登录状态并跳转登录页。

---

## 6. 核心模块实现

### 6.1 角色创建流程

**状态机：**
```
photo-character → photo-room → generating（轮询）→ maturity → confirm → 创建成功
```

**关键实现点：**
- 照片拍摄使用 `expo-image-picker`，原型照片需检测人脸（调用后端接口），检测到人脸时阻止继续。
- 出生城市通过 `expo-location` 获取拍摄时的坐标，由后端反解析为城市名。
- 生成仪式页后台每 3 秒轮询生成状态（`GET /character/generate/{id}`），完成后自动跳转。
- 创建进度断点恢复：当前步骤存入 AsyncStorage，下次进入角色创建流程时恢复。

### 6.2 世界地图

使用 react-native-maps 展示真实地图：
- 地图背景：使用 MapView 组件，支持缩放和拖拽
- 角色图标：通过 Marker 组件展示，包含头像 + 状态点
- 地图每 60 秒自动静默 refetch `characterStatus`
- 支持自定义地图样式（如暖色主题）

### 6.3 对话系统

**消息管理：**
- 初始加载：`GET /messages?limit=30`（最新 30 条）
- 历史加载：上滑触发，`GET /messages?before={cursor}`（分页）
- 新消息轮询：每 30 秒 `GET /messages/new?after={lastId}`
- 发送：乐观更新（立即显示），后台异步提交；失败后标记红色感叹号可重试

**消息状态显示规则：**
- `sending`：旋转细圆圈，占位色
- `sent`：单对勾，次级色
- `read`：双对勾，棕金色（`#8B6F47`）
- `failed`：红色感叹号，点击重试

**非即时通讯原则：**
- 不显示「正在输入…」
- 角色回复时间由后端行为引擎决定，前端不模拟
- 角色不一定回复每条消息，沉默时前端无任何提示

### 6.4 缺席状态计算

```typescript
// src/utils/absence.ts

function calcAbsenceState(absenceDays: number): AbsenceState {
  if (absenceDays === 0)  return 'none';
  if (absenceDays <= 2)   return 'noticed';
  if (absenceDays <= 7)   return 'felt';
  return 'accepted';
}

// 缺席状态 → 头像图标视觉配置
function getAvatarConfig(character: Character) {
  if (character.isLost)      return { opacity: 0.35, grayscale: true,  border: '#C4B5A5' };
  if (character.isAbandoned) return { opacity: 0.75, grayscale: false, border: '#9E4A3A' };
  if (character.status === 'sleeping')
                             return { opacity: 0.60, grayscale: false, border: '#C4B5A5' };
  return                            { opacity: 1.00, grayscale: false, border: '#8B6F47' };
}
```

### 6.5 时区显示

```typescript
// src/utils/time.ts

import { toZonedTime } from 'date-fns-tz';
import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 角色当地时间（状态页、卡片）
function formatCharacterLocalTime(isoTime: string, timeZone: string): string {
  return format(toZonedTime(new Date(isoTime), timeZone), 'HH:mm');
}

// 玩家时区时间（消息时间、Timeline 时间）
function formatPlayerTime(isoTime: string): string {
  const diffHours = (Date.now() - new Date(isoTime).getTime()) / 3600000;
  if (diffHours < 1)    return '刚刚';
  if (diffHours < 24)   return `${Math.floor(diffHours)} 小时前`;
  if (diffHours < 168)  return `${Math.floor(diffHours / 24)} 天前`;
  return format(new Date(isoTime), 'M月d日', { locale: zhCN });
}
```

### 6.6 Timeline

- 无限滚动：React Query `useInfiniteQuery`，`getNextPageParam` 取 `nextCursor`。
- 点赞：乐观更新（立即切换状态），失败后回滚。
- 筛选栏：按角色 ID 过滤，MVP 单角色时筛选栏仍渲染（样式预留，功能占位）。

---

## 7. API 接口契约

> 前端消费的接口规范，后端实现不在本文档范围内。

### 7.1 通用约定

```
Base URL:     https://api.echoworld.app/v1
Auth:         Bearer {accessToken}
Content-Type: application/json

错误格式: { "error": { "code": "ERROR_CODE", "message": "说明" } }
```

### 7.2 账户接口

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/auth/register` | 注册，Body: `{email, password}` |
| GET | `/auth/verify?token=xxx` | 邮箱验证（DeepLink 触发） |
| POST | `/auth/login/password` | 密码登录 |
| POST | `/auth/login/code/send` | 发送验证码 |
| POST | `/auth/login/code/verify` | 验证码登录 |
| POST | `/auth/refresh` | 刷新 Token |
| POST | `/auth/logout` | 退出登录 |

### 7.3 玩家接口

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/player/me` | 获取当前玩家信息 |
| PATCH | `/player/me` | 更新资料（FormData，含头像） |
| POST | `/player/me/change-password` | 修改密码 |
| POST | `/player/me/change-email/initiate` | 发起邮箱修改 |

### 7.4 角色接口

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/character/detect-face` | 人脸检测（FormData） |
| POST | `/character/generate` | 上传照片生成草稿（FormData） |
| GET | `/character/generate/{id}` | 轮询生成结果 |
| POST | `/characters` | 确认创建角色 |
| GET | `/characters/{id}/status` | 获取角色当前状态（每 60 秒轮询） |

### 7.5 消息接口

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/characters/{id}/messages` | 消息历史（`?limit=30&before={cursor}`） |
| POST | `/characters/{id}/messages` | 发送消息 |
| GET | `/characters/{id}/messages/new` | 轮询新消息（`?after={lastId}`） |

### 7.6 Timeline 接口

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/timeline` | 获取 Post 列表（`?limit=20&cursor={cursor}`） |
| POST | `/posts/{id}/like` | 点赞 |
| DELETE | `/posts/{id}/like` | 取消点赞 |
| GET | `/posts/{id}` | 帖子详情 + 回复列表 |
| POST | `/posts/{id}/replies` | 回复帖子 |

### 7.7 Token 自动刷新

Axios 响应拦截器处理 401：
1. 暂停所有请求，使用 RefreshToken 调用 `/auth/refresh`。
2. 刷新成功 → 更新 SecureStore + AuthStore，重放原请求。
3. 刷新失败 → 清除 Auth 状态，跳转登录页。
4. 防止并发刷新：使用 `isRefreshing` 标志 + 失败队列。

---

## 8. 本地存储策略

| 数据类型 | 存储方式 | 原因 |
|---|---|---|
| AccessToken / RefreshToken | AsyncStorage | 应用级数据存储 |
| 用户偏好（通知、静默窗口） | AsyncStorage | 跨 session 持久化 |
| 角色创建进度（断点恢复） | AsyncStorage | 跨 session 持久化 |
| 消息草稿（未发送） | AsyncStorage | 快速存取 |
| 服务端数据缓存 | React Query | 离线可用 |

---

## 9. 推送通知

### 9.1 初始化

使用第三方推送服务（如 Firebase Cloud Messaging），App 启动时请求权限并上传设备 Push Token 至后端。

### 9.2 处理逻辑

- 通知到达时检查「静默窗口」设置（AsyncStorage 读取），窗口内不展示，窗口结束后统一发出。
- 通知 payload 格式：`{ type: 'character_message', characterId, title, body, data: { screen: 'chat', characterId } }`
- 点击通知 → 跳转对应角色的对话界面（Navigation 跳转）。

### 9.3 通知文案原则

后端根据角色性格生成文案，前端直接显示：
- 内倾角色示例：「写了些什么，没有发，又发了」
- 外倾角色示例：「在找你」
- 情感型角色示例：「想到你了」

---

## 10. 性能规范

### 10.1 列表渲染

- 消息列表、Timeline 列表一律使用 `FlatList`，禁止 `ScrollView` 嵌套长列表。
- 图片使用 `react-native-fast-image`（含内置缓存），禁止裸 `<Image />`。

### 10.2 动画

- 所有动画使用 `useNativeDriver: true`（仅限 transform / opacity 属性）。
- 生成仪式光点动效：多个 `Animated.Value` 并行随机漂浮，每个独立循环。

### 10.3 网络

- 请求缓存：React Query，staleTime 2 分钟。
- 图片懒加载：react-native-fast-image 默认行为。
- 角色状态轮询间隔：60 秒；消息轮询间隔：30 秒（可通过环境变量调整）。

### 10.4 内存

- 图片上传前使用 `quality: 0.8` 压缩。
- 消息列表只保留近 100 条在内存，更早的从服务端分页加载。

---

## 11. 测试策略

### 11.1 单元测试（Jest + Testing Library）

重点覆盖：
- `utils/time.ts`：时区转换、相对时间格式化
- `utils/absence.ts`：缺席状态计算
- 核心 Store 的 action 逻辑

### 11.2 组件测试

重点覆盖：
- `MessageBubble`：玩家消息 / 角色消息 / 已读状态渲染
- `PostCard`：文字 post / 图片 post / 点赞状态
- `CharacterMapIcon`：各状态视觉（正常 / 睡眠 / 失踪等）

### 11.3 集成测试

重点覆盖：
- 角色创建完整 5 步流程（含断点恢复）
- 登录 → 进入世界地图 → 点击角色 → 发消息
- Timeline 无限滚动 + 点赞乐观更新

### 11.4 示例：消息状态测试

```typescript
describe('MessageBubble 消息状态', () => {
  it('已读状态显示棕金双对勾', () => {
    const msg = { sender: 'player', status: 'read', content: 'Hello', ... };
    const { getByTestId } = render(<MessageBubble message={msg} />);
    expect(getByTestId('status-icon')).toHaveStyle({ color: '#8B6F47' });
  });

  it('发送失败显示红色感叹号且可点击', () => {
    const onRetry = jest.fn();
    const msg = { sender: 'player', status: 'failed', ... };
    const { getByTestId } = render(<MessageBubble message={msg} onRetry={onRetry} />);
    fireEvent.press(getByTestId('status-icon'));
    expect(onRetry).toHaveBeenCalled();
  });
});
```

---

## 12. 环境配置

### 12.1 `.env.example`

```bash
# API
EXPO_PUBLIC_API_URL=https://api.echoworld.app/v1

# Expo
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id

# 功能开关
EXPO_PUBLIC_ENABLE_REAL_MAP=false          # true 时切换真实地图
EXPO_PUBLIC_MESSAGE_POLL_INTERVAL_MS=30000
EXPO_PUBLIC_STATUS_POLL_INTERVAL_MS=60000
```

### 12.2 `app.json` 关键配置

```json
{
  "expo": {
    "name": "ECHOWORLD",
    "slug": "echoworld",
    "scheme": "echoworld",
    "orientation": "portrait",
    "splash": {
      "backgroundColor": "#FAF8F5"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "app.echoworld",
      "infoPlist": {
        "NSCameraUsageDescription": "拍摄角色原型和居所照片",
        "NSPhotoLibraryUsageDescription": "从相册选取照片创建角色",
        "NSLocationWhenInUseUsageDescription": "获取角色出生城市"
      }
    },
    "android": {
      "package": "app.echoworld",
      "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE", "ACCESS_FINE_LOCATION"]
    },
    "plugins": [
      [
        "expo-camera",
        { "cameraPermission": "拍摄角色原型和居所照片" }
      ],
      [
        "expo-location",
        { "locationWhenInUsePermission": "获取角色出生城市" }
      ],
      [
        "expo-image-picker",
        { "photosPermission": "从相册选取照片创建角色" }
      ]
    ]
  }
}
```

### 12.2 `app.json` 关键配置

```json
{
  "expo": {
    "name": "ECHOWORLD",
    "slug": "echoworld",
    "scheme": "echoworld",
    "orientation": "portrait",
    "splash": {
      "backgroundColor": "#FAF8F5"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "app.echoworld",
      "infoPlist": {
        "NSCameraUsageDescription": "拍摄角色原型和居所照片",
        "NSPhotoLibraryUsageDescription": "从相册选取照片创建角色",
        "NSLocationWhenInUseUsageDescription": "获取角色出生城市"
      }
    },
    "android": {
      "package": "app.echoworld",
      "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE", "ACCESS_FINE_LOCATION"]
    },
    "plugins": [
      ["expo-camera", { "cameraPermission": "拍摄角色原型和居所照片" }],
      ["expo-location", { "locationWhenInUsePermission": "获取角色出生城市" }],
      ["expo-image-picker", { "photosPermission": "从相册选取照片创建角色" }]
    ]
  }
}
```

---

## 13. 开发规范

### 13.1 TypeScript

- 严格模式（`"strict": true`），`noUncheckedIndexedAccess: true`
- 路径别名：`@/*` → `./src/*`
- 禁止 `any`，使用 `unknown` + 类型收窄

### 13.2 命名规范

| 类型 | 规范 | 示例 |
|---|---|---|
| 组件文件 | PascalCase | `CharacterCard.tsx` |
| Hook 文件 | camelCase，use 前缀 | `useMessages.ts` |
| Store 文件 | camelCase，Store 后缀 | `authStore.ts` |
| 类型文件 | camelCase，.types.ts | `character.types.ts` |
| 常量 | SCREAMING_SNAKE | `MAX_POLL_INTERVAL` |

### 13.3 组件规范

- 样式统一用 `StyleSheet.create` 放在组件底部
- Props 接口明确定义，不使用 `any`
- 复杂条件渲染拆分为独立子组件配合 `React.memo`

### 13.4 错误处理

- API 错误码统一定义为常量（`ErrorCodes`）
- 用户可感知的错误通过 Toast 或行内提示显示
- 后台任务失败（Timeline 生成、记忆写入等）静默降级，不通知用户

---

## 14. MVP 后扩展接口预留

### 14.1 多角色

```typescript
// characterStore 中预留（MVP 阶段 characters 保持 null）
interface CharacterStore {
  character: Character | null;           // MVP 使用
  characters: Character[] | null;        // 多角色扩展预留
  activeCharacterId: string | null;
}
```

### 14.2 真实地图

```typescript
// world.tsx 中通过环境变量切换
const ENABLE_REAL_MAP = process.env.EXPO_PUBLIC_ENABLE_REAL_MAP === 'true';
// ENABLE_REAL_MAP ? <MapView /> : <CityView />
```

### 14.3 礼物系统

```typescript
// MessageInput.tsx 中礼物入口预留
const ENABLE_GIFTS = false; // 后续通过功能开关控制
// {ENABLE_GIFTS && <GiftButton onPress={onGift} />}
```

---

*ECHOWORLD Prototype · 开发技术文档 · v1.0 · Expo + React Native + TypeScript*
*配套文档：《EchoworldPrototype_UI文档.md》· 《EchoworldPrototype_UI文档_TextOnly.md》*
*UI 文档与开发文档同步维护，设计或技术方案变动请同时更新。*
