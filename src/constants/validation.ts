// 用户名验证规则
export const USERNAME_VALIDATION = {
  // 长度限制
  MIN_LENGTH: 1,
  MAX_LENGTH: 20,

  // 验证规则
  RULES: {
    // 允许的字符：中文、英文、数字、下划线、连字符、空格
    ALLOWED_PATTERN: /^[\u4E00-\u9FA5\w\-\s]+$/,
    // 不能全为空格
    NOT_ONLY_SPACES: /\S/,
    // 不能以空格开头或结尾
    NO_LEADING_TRAILING_SPACES: /^\S.*\S$|^\S$/,
  },

  // 错误消息
  ERROR_MESSAGES: {
    REQUIRED: '用户名不能为空',
    TOO_SHORT: `用户名至少${1}个字符`,
    TOO_LONG: `用户名最多${20}个字符`,
    INVALID_CHARACTERS: '用户名只能包含中文、英文、数字、下划线、连字符',
    ONLY_SPACES: '用户名不能全为空格',
    INVALID_FORMAT: '用户名格式不正确',
  },
} as const

// 消息内容验证规则
export const MESSAGE_VALIDATION = {
  // 文本消息
  TEXT: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 2000,
    // 不能全为空格或换行
    NOT_EMPTY_PATTERN: /\S/,
    ERROR_MESSAGES: {
      REQUIRED: '消息内容不能为空',
      TOO_LONG: `消息内容最多${2000}个字符`,
      EMPTY_CONTENT: '消息内容不能全为空格',
    },
  },

  // 语音消息
  VOICE: {
    MIN_DURATION: 1, // 最短1秒
    MAX_DURATION: 60, // 最长60秒
    ERROR_MESSAGES: {
      TOO_SHORT: '语音消息至少1秒',
      TOO_LONG: '语音消息最长60秒',
    },
  },

  // 图片消息
  IMAGE: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FORMATS: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    MAX_DIMENSION: 4096, // 最大尺寸 4096x4096
    ERROR_MESSAGES: {
      FILE_TOO_LARGE: '图片文件不能超过10MB',
      INVALID_FORMAT: '不支持的图片格式',
      DIMENSION_TOO_LARGE: '图片尺寸不能超过4096x4096',
      UPLOAD_FAILED: '图片上传失败，请重试',
    },
  },

  // 视频消息
  VIDEO: {
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    ALLOWED_FORMATS: ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'],
    MAX_DURATION: 300, // 最长5分钟
    MAX_DIMENSION: 1920, // 最大尺寸 1920x1080
    ERROR_MESSAGES: {
      FILE_TOO_LARGE: '视频文件不能超过100MB',
      INVALID_FORMAT: '不支持的视频格式',
      DURATION_TOO_LONG: '视频时长不能超过5分钟',
      DIMENSION_TOO_LARGE: '视频尺寸不能超过1920x1080',
      UPLOAD_FAILED: '视频上传失败，请重试',
    },
  },

  // 文件消息
  FILE: {
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    BLOCKED_FORMATS: ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'], // 禁用的危险文件格式
    ERROR_MESSAGES: {
      FILE_TOO_LARGE: '文件不能超过50MB',
      DANGEROUS_FORMAT: '不允许上传可执行文件',
      UPLOAD_FAILED: '文件上传失败，请重试',
      NO_FILE_SELECTED: '请选择要上传的文件',
    },
  },

  // 链接消息
  LINK: {
    // URL 验证正则
    URL_PATTERN: /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/,
    MAX_LENGTH: 2048,
    ERROR_MESSAGES: {
      INVALID_URL: '请输入有效的网址',
      TOO_LONG: '链接地址过长',
      FETCH_FAILED: '无法获取链接预览',
    },
  },

  // 转账消息
  TRANSFER: {
    MIN_AMOUNT: 0.01,
    MAX_AMOUNT: 200000,
    // 金额格式：最多两位小数
    AMOUNT_PATTERN: /^\d+(\.\d{1,2})?$/,
    ERROR_MESSAGES: {
      INVALID_AMOUNT: '请输入有效的金额',
      AMOUNT_TOO_SMALL: '转账金额不能少于0.01元',
      AMOUNT_TOO_LARGE: '转账金额不能超过200000元',
      INVALID_FORMAT: '金额格式不正确',
    },
  },

  // 红包消息
  RED_ENVELOPE: {
    MIN_AMOUNT: 0.01,
    MAX_AMOUNT: 200,
    AMOUNT_PATTERN: /^\d+(\.\d{1,2})?$/,
    MESSAGE_MAX_LENGTH: 30, // 红包祝福语最大长度
    ERROR_MESSAGES: {
      INVALID_AMOUNT: '请输入有效的红包金额',
      AMOUNT_TOO_SMALL: '红包金额不能少于0.01元',
      AMOUNT_TOO_LARGE: '红包金额不能超过200元',
      MESSAGE_TOO_LONG: '红包祝福语最多30个字符',
    },
  },
} as const

// 表单验证规则
export const FORM_VALIDATION = {
  // 时间格式验证
  TIME: {
    // 24小时制时间格式 HH:MM
    PATTERN: /^([01]\d|2[0-3]):[0-5]\d$/,
    ERROR_MESSAGE: '请输入正确的时间格式 (HH:MM)',
  },

  // 背景图片验证
  BACKGROUND_IMAGE: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp'],
    MIN_DIMENSION: 300, // 最小尺寸 300x300
    ERROR_MESSAGES: {
      FILE_TOO_LARGE: '背景图片不能超过5MB',
      INVALID_FORMAT: '只支持 JPG、PNG、WebP 格式',
      DIMENSION_TOO_SMALL: '背景图片尺寸不能小于300x300',
    },
  },

  // 头像验证
  AVATAR: {
    MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp'],
    RECOMMENDED_SIZE: 200, // 推荐尺寸 200x200
    ERROR_MESSAGES: {
      FILE_TOO_LARGE: '头像图片不能超过2MB',
      INVALID_FORMAT: '只支持 JPG、PNG、WebP 格式',
      UPLOAD_FAILED: '头像上传失败，请重试',
    },
  },
} as const

// 通用验证函数
export const VALIDATION_HELPERS = {
  // 检查文件大小
  isFileSizeValid: (file: File, maxSize: number): boolean => {
    return file.size <= maxSize
  },

  // 检查文件格式
  isFileFormatValid: (fileName: string, allowedFormats: string[]): boolean => {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
    return allowedFormats.includes(ext)
  },

  // 检查是否为危险文件
  isDangerousFile: (fileName: string, blockedFormats: string[]): boolean => {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
    return blockedFormats.includes(ext)
  },

  // 验证 URL 格式
  isValidUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return MESSAGE_VALIDATION.LINK.URL_PATTERN.test(url) && Boolean(urlObj)
    }
    catch {
      return false
    }
  },

  // 验证金额格式
  isValidAmount: (amount: string, min: number, max: number): boolean => {
    const num = Number.parseFloat(amount)
    return !Number.isNaN(num) && num >= min && num <= max
  },

  // 获取文件扩展名
  getFileExtension: (fileName: string): string => {
    return fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  },

  // 格式化文件大小
  formatFileSize: (bytes: number): string => {
    if (bytes === 0)
      return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  },
} as const

// 验证状态类型
export type ValidationStatus = 'success' | 'warning' | 'error' | 'validating'

// 验证结果接口
export interface ValidationResult {
  status: ValidationStatus
  message?: string
}
