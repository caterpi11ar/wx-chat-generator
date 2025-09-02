import { MESSAGE_TYPE } from '@/types'
import Text from './Text'

const Options = {
  [MESSAGE_TYPE.TEXT]: Text,
  [MESSAGE_TYPE.IMAGE]: Text,
  [MESSAGE_TYPE.FILE]: Text,
  [MESSAGE_TYPE.LINK]: Text,
  [MESSAGE_TYPE.VIDEO]: Text,
  [MESSAGE_TYPE.transaction]: Text,
}

export default Options
