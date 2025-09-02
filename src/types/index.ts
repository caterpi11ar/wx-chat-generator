export interface MessageDetail {
  id: number
  type: MESSAGE_TYPE
  sender: SENDER
  text?: string
  url?: string
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
  transaction = 6, // 交易
}
