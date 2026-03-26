# EchoWorld Prototype UI 重设计 - 实现计划

## [x] Task 1: 修改A1启动画面界面
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 参考UI文档A1启动画面设计，修改SplashScreen.tsx
  - 更新布局为全屏暖白背景，无状态栏遮挡
  - 添加ECHOWORLD品牌展示（两行，serif字体，字母间距拉大，Light字重）
  - 添加细分割线和副标语"一个数字居所"
  - 更新底部操作区：主按钮"开始"和文字链"已有账户？登录"
  - 添加淡入动画效果（1000ms）
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-1.1: 界面布局符合A1设计规范，包含所有必要元素
  - `human-judgment` TR-1.2: 动画效果流畅，视觉效果符合设计要求

## [x] Task 2: 修改A2登录界面
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 参考UI文档A2登录界面设计，修改LoginScreen.tsx
  - 添加左上角返回按钮
  - 更新页面标题"登录"和副标"欢迎回来"
  - 添加邮箱输入框和密码输入框（含右侧眼睛图标）
  - 添加"登录"主按钮和"或"分割线
  - 添加"验证码登录"次级按钮和底部说明文字
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-2.1: 界面布局符合A2设计规范，包含所有必要元素
  - `human-judgment` TR-2.2: 输入框和按钮的交互功能正常

## [x] Task 3: 修改A3注册界面
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 参考UI文档A3注册界面设计，修改RegisterScreen.tsx
  - 添加返回按钮
  - 更新标题"创建账户"和副标"用邮箱开始"
  - 添加邮箱输入框和"继续"主按钮
  - 添加底部"已有账户？登录"文字链
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: 界面布局符合A3设计规范，包含所有必要元素
  - `human-judgment` TR-3.2: 邮箱格式验证功能正常

## [x] Task 4: 修改A4设置密码界面
- **Priority**: P1
- **Depends On**: Task 3
- **Description**: 
  - 参考UI文档A4设置密码界面设计，创建或修改设置密码界面
  - 添加返回按钮和"设置密码"标题
  - 添加密码输入框（含显示/隐藏功能）和确认密码输入框
  - 添加密码规则说明（常态显示）
  - 添加"创建账户"主按钮
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-4.1: 界面布局符合A4设计规范，包含所有必要元素
  - `human-judgment` TR-4.2: 密码验证和确认功能正常

## [x] Task 5: 修改A5邮箱验证等待页界面
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 参考UI文档A5邮箱验证等待页设计，创建或修改邮箱验证界面
  - 添加中央信封图标（极简线条）
  - 添加"验证邮件已发送"主文案和说明文字（含邮箱地址高亮）
  - 添加"重新发送"按钮（60秒冷却，显示倒计时）
  - 添加底部"没有收到？检查垃圾邮件"说明
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgment` TR-5.1: 界面布局符合A5设计规范，包含所有必要元素
  - `human-judgment` TR-5.2: 重新发送按钮的冷却功能正常

## [x] Task 6: 修改A6玩家身份设置界面
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 参考UI文档A6玩家身份设置界面设计，修改PlayerSetupScreen.tsx
  - 更新标题"告诉角色你是谁"和副标"他们会记住这个名字"
  - 添加头像选取区（圆形占位图+加号，点击后ActionSheet展开）
  - 添加名字输入框（标注"必填*"，右侧字符计数）
  - 添加性别单选（"男/女/其他/不透露"横排胶囊）
  - 添加"进入世界"主按钮（名字为空时置灰）
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `human-judgment` TR-6.1: 界面布局符合A6设计规范，包含所有必要元素
  - `human-judgment` TR-6.2: 头像选择和性别选择功能正常

## [x] Task 7: 修改B1空世界地图引导界面
- **Priority**: P1
- **Depends On**: Task 6
- **Description**: 
  - 参考UI文档B1空世界地图引导设计，修改CreateCharacterScreen.tsx
  - 添加全屏地图背景（暖米色渐变色块+城市名）
  - 添加中央浮层提示卡片："世界在等待"+副文+"开始创建"主按钮
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `human-judgment` TR-7.1: 界面布局符合B1设计规范，包含所有必要元素
  - `human-judgment` TR-7.2: 视觉效果符合设计要求

## [x] Task 8: 修改B2拍摄原型照片界面
- **Priority**: P1
- **Depends On**: Task 7
- **Description**: 
  - 参考UI文档B2拍摄原型照片设计，创建或修改拍摄界面
  - 添加关闭按钮和步骤进度指示器（第1步高亮）
  - 更新标题"拍下它"和副标"让它成为某个人的起点"
  - 添加取景框（圆角矩形，四角棕金装饰线）
  - 添加取景框下方说明文字
  - 添加底部等宽两按钮："相机"和"从相册选取"
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `human-judgment` TR-8.1: 界面布局符合B2设计规范，包含所有必要元素
  - `human-judgment` TR-8.2: 相机和相册选择功能正常

## [x] Task 9: 修改B3拍摄房间角落界面
- **Priority**: P1
- **Depends On**: Task 8
- **Description**: 
  - 参考UI文档B3拍摄房间角落设计，创建或修改拍摄界面
  - 添加关闭按钮和步骤进度指示器（第2步高亮）
  - 更新标题"拍下你的一个角落"和副标"让他有个地方可以回来"
  - 添加取景框和说明文字
  - 添加底部等宽两按钮
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `human-judgment` TR-9.1: 界面布局符合B3设计规范，包含所有必要元素
  - `human-judgment` TR-9.2: 拍摄功能正常

## [x] Task 10: 修改B4角色生成仪式界面
- **Priority**: P1
- **Depends On**: Task 9
- **Description**: 
  - 参考UI文档B4角色生成仪式设计，创建或修改生成界面
  - 添加全屏暖白背景
  - 添加多个棕金光点随机漂浮动画（无规律循环，有大小与透明度变化）
  - 添加两行serif文案："他正在从那些照片里"+"生长出来"
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `human-judgment` TR-10.1: 界面布局符合B4设计规范，包含所有必要元素
  - `human-judgment` TR-10.2: 光点动画效果流畅自然

## [x] Task 11: 修改B5成熟度选择界面
- **Priority**: P1
- **Depends On**: Task 10
- **Description**: 
  - 参考UI文档B5成熟度选择设计，创建或修改选择界面
  - 添加返回按钮和步骤进度指示器（第4步高亮）
  - 更新标题"他现在几岁"和副标"这是他来到这里时的年纪"
  - 添加选项卡片纵向排列（阶段名+年龄范围+性格特征描述）
  - 添加"继续"主按钮（未选择时置灰）
- **Acceptance Criteria Addressed**: AC-11
- **Test Requirements**:
  - `human-judgment` TR-11.1: 界面布局符合B5设计规范，包含所有必要元素
  - `human-judgment` TR-11.2: 单选功能和按钮状态正常

## [x] Task 12: 修改B6草稿确认界面
- **Priority**: P1
- **Depends On**: Task 11
- **Description**: 
  - 参考UI文档B6草稿确认设计，创建或修改确认界面
  - 添加返回按钮和步骤进度指示器（第5步高亮）
  - 添加头像预览和名字输入框（标注"必填*"）
  - 添加年龄行（数值+左右微调按钮，根据所选成熟度动态限制）
  - 添加性别行（"男/女/中性/未知"四选一横排单选）
  - 添加背景区块、性格区块、兴趣标签区块和出生城市行（只读）
  - 添加"就是她/他了"主按钮（名字为空时置灰）
- **Acceptance Criteria Addressed**: AC-12
- **Test Requirements**:
  - `human-judgment` TR-12.1: 界面布局符合B6设计规范，包含所有必要元素
  - `human-judgment` TR-12.2: 年龄微调功能和表单验证正常

## [x] Task 13: 修改C1世界地图主页界面
- **Priority**: P0
- **Depends On**: Task 12
- **Description**: 
  - 参考UI文档C1世界地图主页设计，修改WorldScreen.tsx
  - 添加地图底层（暖米色渐变背景+极简网格线纹理+城市名）
  - 添加地标点层（预置地标以小圆圈标注，可点击触发地标卡片）
  - 添加角色图标层（圆形头像图标，米色底+棕金边框，显示角色名和状态）
  - 实现角色状态显示（正常、睡眠、未读消息、放弃倒计时、已失踪）
- **Acceptance Criteria Addressed**: AC-13
- **Test Requirements**:
  - `human-judgment` TR-13.1: 界面布局符合C1设计规范，包含所有必要元素
  - `human-judgment` TR-13.2: 角色状态显示正确，交互功能正常

## [x] Task 14: 修改D1聊天主界面
- **Priority**: P0
- **Depends On**: Task 13
- **Description**: 
  - 参考UI文档D1聊天主界面设计，修改ChatScreen.tsx
  - 更新Header（左侧返回+角色头像+角色名+当前行为状态+右侧城市名与当地时间）
  - 更新消息列表（角色消息靠左，玩家消息靠右，系统状态提示居中）
  - 更新底部输入区（中央多行输入框+右侧发送按钮）
- **Acceptance Criteria Addressed**: AC-14
- **Test Requirements**:
  - `human-judgment` TR-14.1: 界面布局符合D1设计规范，包含所有必要元素
  - `human-judgment` TR-14.2: 消息发送和接收功能正常

## [x] Task 15: 修改D2放弃倒计时状态界面
- **Priority**: P1
- **Depends On**: Task 14
- **Description**: 
  - 参考UI文档D2放弃倒计时状态设计，修改ChatScreen.tsx
  - 更新Header头像边框为危险暗红色，透明度略降
  - 修改输入框为只读，显示提示文字"发一条消息，就是你回来了"
  - 禁用发送按钮，点击输入框区域弹出确认提示
- **Acceptance Criteria Addressed**: AC-15
- **Test Requirements**:
  - `human-judgment` TR-15.1: 界面布局符合D2设计规范，包含所有必要元素
  - `human-judgment` TR-15.2: 确认提示功能正常

## [x] Task 16: 修改D3已失踪状态界面
- **Priority**: P1
- **Depends On**: Task 15
- **Description**: 
  - 参考UI文档D3已失踪状态设计，修改ChatScreen.tsx
  - 更新Header头像灰度化，透明度降低，边框浅棕灰
  - 隐藏底部输入区，替换为静态文字"{角色名}已失踪于{日期}"
  - 保留完整消息列表，添加底部轻渐变遮罩
- **Acceptance Criteria Addressed**: AC-16
- **Test Requirements**:
  - `human-judgment` TR-16.1: 界面布局符合D3设计规范，包含所有必要元素
  - `human-judgment` TR-16.2: 视觉效果符合设计要求

## [x] Task 17: 修改E1角色状态页界面
- **Priority**: P1
- **Depends On**: Task 16
- **Description**: 
  - 参考UI文档E1角色状态页设计，修改CharacterStatusScreen.tsx
  - 更新Header（返回按钮+页面标题"{角色名}的此刻"）
  - 添加位置与行为卡片（位置行+旅途中显示+当前行为描述）
  - 添加精力与情绪卡片（精力行+情绪行）
  - 添加今日简况区块（小标题"今日"+"去过"行+"遇见"行）
  - 添加近期朋友区块（最多3条）
  - 添加底部固定按钮区（"发消息"按钮+"删除角色"按钮）
- **Acceptance Criteria Addressed**: AC-17
- **Test Requirements**:
  - `human-judgment` TR-17.1: 界面布局符合E1设计规范，包含所有必要元素
  - `human-judgment` TR-17.2: 按钮功能和状态显示正常

## [x] Task 18: 修改F1 Timeline主界面
- **Priority**: P1
- **Depends On**: Task 17
- **Description**: 
  - 参考UI文档F1 Timeline主界面设计，修改TimelineScreen.tsx
  - 更新Header（"Discover"居中）
  - 添加筛选栏（"全部"+每个角色单独胶囊按钮）
  - 更新Post列表（卡片头部+图片展示+文字内容+操作行）
- **Acceptance Criteria Addressed**: AC-18
- **Test Requirements**:
  - `human-judgment` TR-18.1: 界面布局符合F1设计规范，包含所有必要元素
  - `human-judgment` TR-18.2: 筛选功能和帖子交互正常

## [x] Task 19: 修改F2帖子详情页界面
- **Priority**: P1
- **Depends On**: Task 18
- **Description**: 
  - 参考UI文档F2帖子详情页设计，修改PostDetailScreen.tsx
  - 添加返回按钮和标题"帖子"
  - 显示Post原文（与F1卡片布局一致）
  - 添加分割线和"回复"标题
  - 更新回复列表（角色回复靠左，玩家回复靠右）
  - 添加底部输入区
- **Acceptance Criteria Addressed**: AC-19
- **Test Requirements**:
  - `human-judgment` TR-19.1: 界面布局符合F2设计规范，包含所有必要元素
  - `human-judgment` TR-19.2: 回复功能正常

## [x] Task 20: 修改G1设置主页界面
- **Priority**: P1
- **Depends On**: Task 19
- **Description**: 
  - 参考UI文档G1设置主页设计，修改SettingsScreen.tsx
  - 更新Header（"Setting"居中）
  - 添加玩家信息区（大圆形头像+玩家名字+性别+右侧箭头）
  - 添加角色信息区（显示所有已创建角色的列表）
  - 添加数据管理分组、账户分组、通知分组、偏好分组、支持分组和法律分组
- **Acceptance Criteria Addressed**: AC-20
- **Test Requirements**:
  - `human-judgment` TR-20.1: 界面布局符合G1设计规范，包含所有必要元素
  - `human-judgment` TR-20.2: 设置项功能正常

## [x] Task 21: 修改G2编辑资料界面
- **Priority**: P2
- **Depends On**: Task 20
- **Description**: 
  - 参考UI文档G2编辑资料设计，创建或修改编辑资料界面
  - 添加返回按钮、"编辑资料"标题和右侧"保存"按钮
  - 添加头像居中+下方"更换头像"文字链
  - 添加名字输入框（必填，右侧字符计数）
  - 添加性别选择
- **Acceptance Criteria Addressed**: AC-21
- **Test Requirements**:
  - `human-judgment` TR-21.1: 界面布局符合G2设计规范，包含所有必要元素
  - `human-judgment` TR-21.2: 资料编辑和保存功能正常

## [x] Task 22: 修改G3通知设置界面
- **Priority**: P2
- **Depends On**: Task 21
- **Description**: 
  - 参考UI文档G3通知设置设计，创建或修改通知设置界面
  - 添加返回按钮和"通知"标题
  - 添加"推送通知"行（说明文字+Toggle开关）
  - 添加"静默窗口"区块（说明文字+Toggle开关+"开始时间"行+"结束时间"行）
  - 添加底部说明"时间以您的设备时区为准"
- **Acceptance Criteria Addressed**: AC-22
- **Test Requirements**:
  - `human-judgment` TR-22.1: 界面布局符合G3设计规范，包含所有必要元素
  - `human-judgment` TR-22.2: 通知设置功能正常