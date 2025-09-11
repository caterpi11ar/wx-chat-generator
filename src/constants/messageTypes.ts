import { MESSAGE_TYPE } from '@/types'

// 视频消息配置
export const VIDEO_CONFIG = {
  // 支持的视频格式
  SUPPORTED_FORMATS: ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'],
  // 最大文件大小 (100MB)
  MAX_FILE_SIZE: 100 * 1024 * 1024,
  // 预览尺寸
  PREVIEW_SIZE: {
    MAX_WIDTH: 200,
    MAX_HEIGHT: 150,
    MIN_WIDTH: 120,
    MIN_HEIGHT: 90,
  },
  // 默认配置
  DEFAULT_CONFIG: {
    duration: 0,
    poster: '',
    autoplay: false,
  },
} as const

// 文件消息配置
export const FILE_CONFIG = {
  // 支持的文件类型
  SUPPORTED_TYPES: {
    // 文档类型
    DOCUMENT: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
    // 图片类型
    IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    // 音频类型
    AUDIO: ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
    // 视频类型
    VIDEO: ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'],
    // 压缩包类型
    ARCHIVE: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    // 代码类型
    CODE: ['.js', '.ts', '.css', '.html', '.json', '.xml', '.py', '.java', '.c', '.cpp'],
  },
  // 文件大小限制 (50MB)
  MAX_FILE_SIZE: 50 * 1024 * 1024,
  // 文件图标映射
  FILE_ICONS: {
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'xls': '📊',
    'xlsx': '📊',
    'ppt': '📋',
    'pptx': '📋',
    'txt': '📄',
    'zip': '🗜️',
    'rar': '🗜️',
    '7z': '🗜️',
    'mp3': '🎵',
    'wav': '🎵',
    'flac': '🎵',
    'mp4': '🎬',
    'mov': '🎬',
    'avi': '🎬',
    'jpg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'js': '⚙️',
    'ts': '⚙️',
    'css': '🎨',
    'html': '🌐',
    'default': '📎',
  },
} as const

// 链接消息配置
export const LINK_CONFIG = {
  // 链接预览配置
  PREVIEW: {
    TIMEOUT: 5000, // 5秒超时
    MAX_TITLE_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 100,
    DEFAULT_FAVICON: '🔗',
  },
  // URL 验证正则
  URL_REGEX: /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/,
  // 默认链接卡片样式
  DEFAULT_STYLE: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '12px',
    maxWidth: '280px',
  },
} as const

// 转账消息配置
export const TRANSFER_CONFIG = {
  // 金额范围
  AMOUNT_RANGE: {
    MIN: 0.01,
    MAX: 200000,
  },
  // 转账状态
  STATUS: {
    PENDING: 'pending', // 待确认
    COMPLETED: 'completed', // 已完成
    FAILED: 'failed', // 失败
    CANCELLED: 'cancelled', // 已取消
  } as const,
  // 默认样式配置
  DEFAULT_STYLE: {
    backgroundColor: '#ffd43b',
    textColor: '#000',
    borderRadius: '8px',
    padding: '16px',
  },
} as const

// 红包消息配置
export const RED_ENVELOPE_CONFIG = {
  // 红包类型
  TYPE: {
    PERSONAL: 'personal', // 个人红包
    GROUP: 'group', // 群红包
  } as const,
  // 红包状态
  STATUS: {
    UNOPENED: 'unopened', // 未领取
    OPENED: 'opened', // 已领取
    EXPIRED: 'expired', // 已过期
  } as const,
  // 金额范围
  AMOUNT_RANGE: {
    MIN: 0.01,
    MAX: 200,
  },
  // 默认样式配置
  DEFAULT_STYLE: {
    backgroundColor: '#ff6b6b',
    textColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
  },
} as const

// 时间消息配置
export const TIME_CONFIG = {
  // 时间显示格式
  FORMAT: {
    FULL: 'YYYY-MM-DD HH:mm:ss',
    DATE: 'YYYY-MM-DD',
    TIME: 'HH:mm',
    RELATIVE: 'relative', // 相对时间显示
  } as const,
  // 时间间隔阈值 (分钟)
  INTERVAL_THRESHOLD: {
    SHOW_TIME: 5, // 超过5分钟显示时间
    SHOW_DATE: 1440, // 超过24小时显示日期
  },
  // 相对时间文本
  RELATIVE_TEXT: {
    JUST_NOW: '刚刚',
    MINUTES_AGO: '{n}分钟前',
    HOURS_AGO: '{n}小时前',
    YESTERDAY: '昨天',
    DAYS_AGO: '{n}天前',
  },
} as const

// 消息类型对应的配置映射
export const MESSAGE_TYPE_CONFIG = {
  [MESSAGE_TYPE.VIDEO]: VIDEO_CONFIG,
  [MESSAGE_TYPE.FILE]: FILE_CONFIG,
  [MESSAGE_TYPE.LINK]: LINK_CONFIG,
  [MESSAGE_TYPE.TRANSFER]: TRANSFER_CONFIG,
  [MESSAGE_TYPE.RED_ENVELOPE]: RED_ENVELOPE_CONFIG,
  [MESSAGE_TYPE.TIME]: TIME_CONFIG,
} as const
