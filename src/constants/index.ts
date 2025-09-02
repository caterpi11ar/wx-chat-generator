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
  { label: '图片', value: MESSAGE_TYPE.IMAGE, disabled: true },
  { label: '视频', value: MESSAGE_TYPE.VIDEO, disabled: true },
  { label: '文件', value: MESSAGE_TYPE.FILE, disabled: true },
  { label: '链接', value: MESSAGE_TYPE.LINK, disabled: true },
  { label: '交易', value: MESSAGE_TYPE.transaction, disabled: true },
]
