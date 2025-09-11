# Constants 模块开发文档

## 当前状态分析

`/src/constants/` 目录包含项目的常量定义和默认数据配置:
- `index.ts`: 消息类型过滤器和发送者过滤器
- `defaultData.ts`: 默认用户信息、示例消息和环境配置

## 开发任务拆分

### ✅ 已完成功能
- [x] 基础消息类型常量定义 (`SENDER_FILTER`, `MESSAGE_TYPE_FILTER`)
- [x] 默认用户信息配置 (`DEFAULT_USERS`)
- [x] 默认示例消息数据 (`DEFAULT_MESSAGES`)
- [x] 默认环境信息 (`DEFAULT_META_INFO`)
- [x] 文本消息支持 (`MESSAGE_TYPE.TEXT`)
- [x] 图片消息支持 (`MESSAGE_TYPE.IMAGE`)
- [x] 语音消息支持 (`MESSAGE_TYPE.VOICE`)
- [x] 主题色彩常量定义 (`theme.ts`)
- [x] 布局尺寸常量 (`layout.ts`)
- [x] 数据验证规则常量 (`validation.ts`)
- [x] 消息类型扩展常量 (`messageTypes.ts`)

### 🔄 待开发功能

#### 消息类型扩展
- [x] 视频消息常量完善 (`MESSAGE_TYPE.VIDEO`)
  - [x] 视频消息默认配置
  - [x] 视频文件格式限制常量
  - [x] 视频预览尺寸常量

- [x] 文件消息常量完善 (`MESSAGE_TYPE.FILE`)
  - [x] 支持的文件类型常量
  - [x] 文件大小限制配置
  - [x] 文件图标映射配置

- [x] 链接消息常量完善 (`MESSAGE_TYPE.LINK`)
  - [x] 链接预览配置
  - [x] 链接解析规则常量
  - [x] 默认链接卡片样式配置

- [x] 转账消息常量完善 (`MESSAGE_TYPE.TRANSFER`)
  - [x] 转账金额范围配置
  - [x] 转账状态常量
  - [x] 转账样式配置

- [x] 红包消息常量完善 (`MESSAGE_TYPE.RED_ENVELOPE`)
  - [x] 红包类型常量（个人红包、群红包）
  - [x] 红包状态常量（未领取、已领取、已过期）
  - [x] 红包样式配置

- [x] 时间消息常量完善 (`MESSAGE_TYPE.TIME`)
  - [x] 时间显示格式配置
  - [x] 时间间隔阈值常量

#### 配置优化
- [x] 主题色彩常量定义
  - [x] WeChat 官方色彩规范
  - [x] 深色/浅色主题配置

- [x] 布局尺寸常量
  - [x] 消息气泡尺寸配置
  - [x] 头像尺寸规范
  - [x] 间距标准化

#### 数据验证
- [x] 输入验证规则常量
  - [x] 用户名长度限制
  - [x] 消息内容长度限制
  - [x] 文件上传限制

## 优先级说明

**高优先级 (P0)** - ✅ 已完成:
- ✅ 视频消息常量完善
- ✅ 文件消息常量完善
- ✅ 主题色彩常量定义

**中优先级 (P1)** - ✅ 已完成:
- ✅ 链接消息常量完善
- ✅ 布局尺寸常量
- ✅ 数据验证规则常量

**低优先级 (P2)**:
- 转账消息常量完善
- 红包消息常量完善
- 时间消息常量完善
- 动画配置常量

## 文件结构建议

```
src/constants/
├── index.ts              # 主要常量导出
├── defaultData.ts        # 默认数据配置
├── messageTypes.ts       # 消息类型相关常量
├── theme.ts             # 主题色彩常量
├── layout.ts            # 布局尺寸常量
├── validation.ts        # 验证规则常量
└── README.md            # 本文档
```

这个开发文档为后续完善 constants 模块提供了清晰的任务拆分和优先级指导。
