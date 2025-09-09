import { MESSAGE_TYPE } from '@/types'
import Image from './Image'
import Text from './Text'
import Voice from './Voice'

const Options = {
  [MESSAGE_TYPE.TEXT]: Text,
  [MESSAGE_TYPE.IMAGE]: Image,
  [MESSAGE_TYPE.FILE]: Text,
  [MESSAGE_TYPE.LINK]: Text,
  [MESSAGE_TYPE.VIDEO]: Text,
  [MESSAGE_TYPE.TRANSFER]: Text,
  [MESSAGE_TYPE.RED_ENVELOPE]: Text,
  [MESSAGE_TYPE.TIME]: Text,
  [MESSAGE_TYPE.VOICE]: Voice,
}

export default Options
