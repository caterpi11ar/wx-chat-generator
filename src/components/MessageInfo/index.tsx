import { MESSAGE_TYPE } from '@/types'
import File from './File'
import Image from './Image'
import Link from './Link'
import RedEnvelope from './RedEnvelope'
import Text from './Text'
import Time from './Time'
import Transfer from './Transfer'
import Video from './Video'
import Voice from './Voice'

const Options = {
  [MESSAGE_TYPE.TEXT]: Text,
  [MESSAGE_TYPE.IMAGE]: Image,
  [MESSAGE_TYPE.VOICE]: Voice,
  [MESSAGE_TYPE.VIDEO]: Video,
  [MESSAGE_TYPE.FILE]: File,
  [MESSAGE_TYPE.LINK]: Link,
  [MESSAGE_TYPE.TRANSFER]: Transfer,
  [MESSAGE_TYPE.RED_ENVELOPE]: RedEnvelope,
  [MESSAGE_TYPE.TIME]: Time,
}

export default Options
