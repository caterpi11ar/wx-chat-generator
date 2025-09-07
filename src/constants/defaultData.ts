import type { MessageDetail, UserInfo } from '@/types'
import avatar1 from '@/assets/avatar001.jpg'
import avatar2 from '@/assets/avatar002.jpg'
import waibao from '@/assets/image001.jpg'
import { MESSAGE_TYPE, SENDER } from '@/types'

// 默认用户信息
export const DEFAULT_USERS: [UserInfo, UserInfo] = [
  {
    username: '女神',
    avatar: avatar2,
  },
  {
    username: '我',
    avatar: avatar1,
  },
]

// 默认示例消息
export const DEFAULT_MESSAGES: MessageDetail[] = [
  {
    id: 1,
    type: MESSAGE_TYPE.TEXT,
    sender: SENDER.Recipient,
    text: '以后别联系了',
  },
  {
    id: 2,
    type: MESSAGE_TYPE.TEXT,
    sender: SENDER.Sender,
    text: '为什么',
  },
  {
    id: 3,
    type: MESSAGE_TYPE.TEXT,
    sender: SENDER.Recipient,
    text: '因为你是外包',
  },
  {
    id: 4,
    type: MESSAGE_TYPE.IMAGE,
    sender: SENDER.Sender,
    url: waibao,
  },
]

// 默认环境信息
export const DEFAULT_META_INFO = {
  time: '12:30',
  backgroundImage: '',
}
