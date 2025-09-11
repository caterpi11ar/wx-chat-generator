// WeChat 官方色彩规范
export const WECHAT_COLORS = {
  // 主色调
  PRIMARY: '#07c160', // WeChat 绿
  PRIMARY_DARK: '#06ad56', // 深绿色
  PRIMARY_LIGHT: '#4dd87c', // 浅绿色

  // 消息气泡颜色
  BUBBLE: {
    SENT: '#95ec69', // 发送消息气泡 (浅绿)
    RECEIVED: '#ffffff', // 接收消息气泡 (白色)
    SYSTEM: '#f0f0f0', // 系统消息气泡 (灰色)
  },

  // 背景色
  BACKGROUND: {
    CHAT: '#ededed', // 聊天背景
    MESSAGE_LIST: '#f5f5f5', // 消息列表背景
    INPUT: '#ffffff', // 输入框背景
  },

  // 文本颜色
  TEXT: {
    PRIMARY: '#191919', // 主要文本
    SECONDARY: '#888888', // 次要文本
    PLACEHOLDER: '#c0c0c0', // 占位符文本
    TIME: '#999999', // 时间文本
    LINK: '#576b95', // 链接文本
  },

  // 边框颜色
  BORDER: {
    LIGHT: '#e6e6e6', // 浅边框
    MEDIUM: '#d9d9d9', // 中等边框
    DARK: '#cccccc', // 深边框
  },

  // 状态颜色
  STATUS: {
    SUCCESS: '#07c160', // 成功状态
    WARNING: '#ff9500', // 警告状态
    ERROR: '#fa5151', // 错误状态
    INFO: '#10aeff', // 信息状态
  },

  // 特殊功能颜色
  SPECIAL: {
    RED_ENVELOPE: '#ff6b6b', // 红包颜色
    TRANSFER: '#ffd43b', // 转账颜色
    VOICE: '#95ec69', // 语音消息颜色
    VIDEO_OVERLAY: 'rgba(0, 0, 0, 0.3)', // 视频遮罩
  },
} as const

// 深色主题配置
export const DARK_THEME = {
  // 主色调保持不变
  PRIMARY: WECHAT_COLORS.PRIMARY,
  PRIMARY_DARK: WECHAT_COLORS.PRIMARY_DARK,
  PRIMARY_LIGHT: WECHAT_COLORS.PRIMARY_LIGHT,

  // 消息气泡颜色 (深色模式)
  BUBBLE: {
    SENT: '#4a5c3a', // 发送消息气泡 (深绿)
    RECEIVED: '#2c2c2c', // 接收消息气泡 (深灰)
    SYSTEM: '#3a3a3a', // 系统消息气泡 (灰色)
  },

  // 背景色 (深色模式)
  BACKGROUND: {
    CHAT: '#1a1a1a', // 聊天背景
    MESSAGE_LIST: '#2c2c2c', // 消息列表背景
    INPUT: '#3a3a3a', // 输入框背景
  },

  // 文本颜色 (深色模式)
  TEXT: {
    PRIMARY: '#ffffff', // 主要文本
    SECONDARY: '#cccccc', // 次要文本
    PLACEHOLDER: '#888888', // 占位符文本
    TIME: '#999999', // 时间文本
    LINK: '#7ba7d9', // 链接文本
  },

  // 边框颜色 (深色模式)
  BORDER: {
    LIGHT: '#4a4a4a', // 浅边框
    MEDIUM: '#5a5a5a', // 中等边框
    DARK: '#6a6a6a', // 深边框
  },

  // 状态颜色保持不变
  STATUS: WECHAT_COLORS.STATUS,

  // 特殊功能颜色
  SPECIAL: {
    RED_ENVELOPE: '#d64545', // 红包颜色 (深色版)
    TRANSFER: '#e6c13a', // 转账颜色 (深色版)
    VOICE: '#4a5c3a', // 语音消息颜色 (深色版)
    VIDEO_OVERLAY: 'rgba(0, 0, 0, 0.6)', // 视频遮罩
  },
} as const

// 主题类型定义
export type ThemeType = 'light' | 'dark'

// 主题配置
export const THEME_CONFIG = {
  light: WECHAT_COLORS,
  dark: DARK_THEME,
} as const

// 渐变色配置
export const GRADIENTS = {
  // 消息气泡渐变
  BUBBLE: {
    SENT: 'linear-gradient(135deg, #95ec69 0%, #7ed347 100%)',
    RECEIVED: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
  },

  // 特殊功能渐变
  RED_ENVELOPE: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
  TRANSFER: 'linear-gradient(135deg, #ffd43b 0%, #fab20b 100%)',

  // 背景渐变
  CHAT_BACKGROUND: 'linear-gradient(to bottom, #ededed 0%, #e8e8e8 100%)',
} as const

// 阴影配置
export const SHADOWS = {
  // 消息气泡阴影
  BUBBLE: '0 2px 4px rgba(0, 0, 0, 0.1)',
  BUBBLE_HOVER: '0 4px 8px rgba(0, 0, 0, 0.15)',

  // 卡片阴影
  CARD: '0 2px 12px rgba(0, 0, 0, 0.08)',
  CARD_HOVER: '0 4px 20px rgba(0, 0, 0, 0.12)',

  // 弹窗阴影
  MODAL: '0 8px 32px rgba(0, 0, 0, 0.2)',

  // 输入框阴影
  INPUT_FOCUS: '0 0 0 2px rgba(7, 193, 96, 0.2)',
} as const

// 透明度配置
export const OPACITY = {
  DISABLED: 0.4,
  HOVER: 0.8,
  OVERLAY: 0.6,
  PLACEHOLDER: 0.5,
} as const

// 默认主题
export const DEFAULT_THEME: ThemeType = 'light'
