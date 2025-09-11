// 头像尺寸规范
export const AVATAR_SIZES = {
  // 聊天页面头像
  CHAT: {
    WIDTH: 40,
    HEIGHT: 40,
    BORDER_RADIUS: 6,
  },

  // 小尺寸头像
  SMALL: {
    WIDTH: 32,
    HEIGHT: 32,
    BORDER_RADIUS: 4,
  },

  // 大尺寸头像
  LARGE: {
    WIDTH: 60,
    HEIGHT: 60,
    BORDER_RADIUS: 8,
  },

  // 群聊头像
  GROUP: {
    WIDTH: 48,
    HEIGHT: 48,
    BORDER_RADIUS: 6,
  },
} as const

// 消息气泡尺寸配置
export const MESSAGE_BUBBLE = {
  // 最大宽度
  MAX_WIDTH: 280,
  MIN_WIDTH: 48,

  // 内边距
  PADDING: {
    TEXT: {
      HORIZONTAL: 12,
      VERTICAL: 8,
    },
    IMAGE: {
      HORIZONTAL: 4,
      VERTICAL: 4,
    },
    FILE: {
      HORIZONTAL: 12,
      VERTICAL: 10,
    },
  },

  // 边框圆角
  BORDER_RADIUS: {
    NORMAL: 8,
    TAIL: 4, // 消息尾巴的圆角
  },

  // 消息尾巴尺寸
  TAIL: {
    WIDTH: 8,
    HEIGHT: 8,
  },
} as const

// 间距标准化
export const SPACING = {
  // 基础间距单位 (4px)
  UNIT: 4,

  // 常用间距
  SMALL: 8, // 2 * UNIT
  MEDIUM: 16, // 4 * UNIT
  LARGE: 24, // 6 * UNIT
  XLARGE: 32, // 8 * UNIT

  // 消息间距
  MESSAGE: {
    VERTICAL: 12, // 消息之间的垂直间距
    HORIZONTAL: 12, // 消息与边缘的水平间距
    AVATAR_TO_BUBBLE: 8, // 头像到气泡的距离
    TIME_TO_MESSAGE: 16, // 时间戳到消息的距离
  },

  // 表单间距
  FORM: {
    FIELD_VERTICAL: 16, // 表单字段垂直间距
    LABEL_TO_INPUT: 8, // 标签到输入框的距离
    BUTTON_GROUP: 12, // 按钮组间距
  },

  // 容器间距
  CONTAINER: {
    PADDING: 16, // 容器内边距
    MARGIN: 16, // 容器外边距
    SECTION: 32, // 章节间距
  },
} as const

// 图片消息尺寸
export const IMAGE_MESSAGE = {
  // 缩略图尺寸
  THUMBNAIL: {
    MAX_WIDTH: 200,
    MAX_HEIGHT: 200,
    MIN_WIDTH: 120,
    MIN_HEIGHT: 80,
  },

  // 预览图尺寸
  PREVIEW: {
    MAX_WIDTH: 400,
    MAX_HEIGHT: 400,
  },

  // 边框圆角
  BORDER_RADIUS: 8,
} as const

// 语音消息尺寸
export const VOICE_MESSAGE = {
  // 基础尺寸
  MIN_WIDTH: 60,
  MAX_WIDTH: 200,
  HEIGHT: 36,

  // 波形动画
  WAVE: {
    COUNT: 3, // 波形数量
    WIDTH: 2, // 波形宽度
    SPACING: 2, // 波形间距
    MAX_HEIGHT: 16, // 最大高度
    MIN_HEIGHT: 4, // 最小高度
  },

  // 播放按钮
  PLAY_BUTTON: {
    SIZE: 20,
    MARGIN_RIGHT: 8,
  },
} as const

// 文件消息尺寸
export const FILE_MESSAGE = {
  WIDTH: 240,
  HEIGHT: 64,

  // 文件图标
  ICON: {
    SIZE: 32,
    MARGIN_RIGHT: 12,
  },

  // 文件信息
  INFO: {
    NAME_MAX_LENGTH: 20,
    SIZE_FONT_SIZE: 12,
  },
} as const

// 链接卡片尺寸
export const LINK_CARD = {
  MAX_WIDTH: 280,
  MIN_HEIGHT: 80,

  // 预览图
  PREVIEW_IMAGE: {
    WIDTH: 60,
    HEIGHT: 60,
    BORDER_RADIUS: 4,
    MARGIN_RIGHT: 12,
  },

  // 内容区域
  CONTENT: {
    PADDING: 12,
    TITLE_MAX_LINES: 2,
    DESCRIPTION_MAX_LINES: 3,
  },
} as const

// 响应式断点
export const BREAKPOINTS = {
  // 移动端
  MOBILE: {
    MAX: 768,
  },

  // 平板
  TABLET: {
    MIN: 769,
    MAX: 1024,
  },

  // 桌面端
  DESKTOP: {
    MIN: 1025,
  },
} as const

// 聊天容器布局
export const CHAT_LAYOUT = {
  // 桌面端布局
  DESKTOP: {
    SIDEBAR_WIDTH: 320, // 侧边栏宽度
    CHAT_MIN_WIDTH: 600, // 聊天区域最小宽度
    HEADER_HEIGHT: 60, // 头部高度
    INPUT_HEIGHT: 120, // 输入区域高度
  },

  // 移动端布局
  MOBILE: {
    HEADER_HEIGHT: 50, // 头部高度
    INPUT_HEIGHT: 80, // 输入区域高度
    SAFE_AREA_BOTTOM: 20, // 安全区域底部
  },

  // 消息列表
  MESSAGE_LIST: {
    PADDING: {
      TOP: 16,
      BOTTOM: 16,
      HORIZONTAL: 16,
    },
    MAX_HEIGHT: 'calc(100vh - 200px)', // 最大高度
  },
} as const

// Z-index 层级
export const Z_INDEX = {
  BASE: 1,
  DROPDOWN: 10,
  MODAL_BACKDROP: 100,
  MODAL: 101,
  TOOLTIP: 102,
  TOAST: 103,
  LOADING: 9999,
} as const

// 动画持续时间
export const ANIMATION_DURATION = {
  FAST: 150, // 快速动画 150ms
  NORMAL: 300, // 普通动画 300ms
  SLOW: 600, // 慢速动画 600ms

  // 特定动画
  FADE: 200, // 淡入淡出
  SLIDE: 300, // 滑动
  BOUNCE: 500, // 弹跳
  PULSE: 1000, // 脉冲 (语音播放)
} as const

// 字体大小
export const FONT_SIZES = {
  SMALL: 12, // 小字体
  NORMAL: 14, // 普通字体
  MEDIUM: 16, // 中等字体
  LARGE: 18, // 大字体
  XLARGE: 20, // 特大字体

  // 特定用途
  TIME: 11, // 时间戳字体
  TITLE: 16, // 标题字体
  CAPTION: 12, // 说明文字
} as const

// 行高
export const LINE_HEIGHTS = {
  TIGHT: 1.2, // 紧凑行高
  NORMAL: 1.4, // 普通行高
  RELAXED: 1.6, // 宽松行高
  LOOSE: 2.0, // 很宽松行高
} as const
