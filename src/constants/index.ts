import { MESSAGE_TYPE, SENDER } from '@/types'

export const SENDER_FILTER = [{
  label: '对方',
  value: SENDER.Recipient,
}, {
  label: '我',
  value: SENDER.Sender,
}]

export const MESSAGE_TYPE_FILTER = [
  { label: '文本', value: MESSAGE_TYPE.TEXT },
  { label: '图片', value: MESSAGE_TYPE.IMAGE },
  { label: '语音', value: MESSAGE_TYPE.VOICE },
  { label: '视频', value: MESSAGE_TYPE.VIDEO },
  { label: '文件', value: MESSAGE_TYPE.FILE },
  { label: '链接', value: MESSAGE_TYPE.LINK },
  { label: '转账', value: MESSAGE_TYPE.TRANSFER },
  { label: '红包', value: MESSAGE_TYPE.RED_ENVELOPE },
  { label: '时间', value: MESSAGE_TYPE.TIME },
]

// 导出所有常量模块
export * from './defaultData'
export * from './layout'
export * from './messageTypes'
export * from './theme'
export * from './validation'
