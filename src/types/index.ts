export interface MessageDetail {
  id: number
  type: MESSAGE_TYPE
  sender: SENDER
  text?: string
  url?: string
  duration?: number // 语音消息时长（秒）
}

export interface UserInfo {
  username?: string
  avatar?: string
}

export enum SENDER {
  Recipient = 0,
  Sender = 1,
}

export enum MESSAGE_TYPE {
  TEXT = 1, // 文本
  IMAGE = 2, // 图片
  VIDEO = 3, // 视频
  FILE = 4, // 文件
  LINK = 5, // 链接
  RED_ENVELOPE = 6, // 红包
  TRANSFER = 7, // 转账
  TIME = 8, // 对话时间
  VOICE = 9, // 语音
}
