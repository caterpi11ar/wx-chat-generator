import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { MessageDetail, UserInfo } from '@/types'
import bottomBar from '@/assets/images/bottom-bar.png'
import back from '@/assets/images/wechat-nav-back.png'
import right from '@/assets/images/wechat-nav-right.png'
import Options from '@/components/MessageInfo'
import { SENDER } from '@/types'
import Header from './components/header'

interface MetaInfo {
  time?: Dayjs | null
  backgroundImg?: string
}

interface MessageListProps {
  messageData?: MessageDetail[]
  userList: [UserInfo, UserInfo]
  metaInfo: MetaInfo
}

// 临时默认数据，稍后会用 Context 替换
const defaultRecipientUser = {
  username: '匿名',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNEREREREQiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iNiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNNCAxNkE5IDkgMCAwIDAgMjggMTZBOSA5IDAgMCAwIDQgMTZaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=',
}

const defaultSenderUser = {
  username: '我',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM5NWVjNjkiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iNiIgZmlsbD0iI2ZmZmZmZiIvPgo8cGF0aCBkPSJNNCAxNkE5IDkgMCAwIDAgMjggMTZBOSA5IDAgMCAwIDQgMTZaIiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=',
}

const MessageList: FC<MessageListProps> = (props) => {
  const { messageData, userList, metaInfo } = props
  const [recipient, sender] = userList

  const list = messageData?.map((item) => {
    if (!item.type)
      return null
    const Com = Options[item.type]
    const messageSender = item.sender
    const currentUser = messageSender === SENDER.Recipient ? recipient : sender
    const imgSrc = currentUser?.avatar || (messageSender === SENDER.Recipient ? defaultRecipientUser?.avatar : defaultSenderUser?.avatar)

    return (
      <div
        className={`flex ${messageSender === SENDER.Recipient ? 'flex-row-reverse' : ''} px-6 pt-6 `}
        key={item.id}
      >
        <div className="flex-1">
          <Com data={item} sender={messageSender} />
        </div>
        <div className="w-8 h-8 overflow-hidden ">
          <img src={imgSrc} className="w-8 h-8 bg-white rounded" />
        </div>
      </div>
    )
  })

  return (
    <div className="message-list-container flex flex-col h-screen w-full lg:w-[400px] bg-[#ededed]">
      <Header time={metaInfo.time} />
      <div
        className="nav-bar flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid rgb(230, 230, 230)' }}
      >
        <div>
          <img src={back} style={{ height: '16px' }} />
        </div>
        <div
          className="font-semibold mx-4 truncate"
          style={{ color: '#181818' }}
        >
          {recipient?.username || defaultRecipientUser?.username || '匿名'}
        </div>
        <div>
          <img src={right} style={{ width: '20px' }} />
        </div>
      </div>
      <div
        className="overflow-auto flex-1 "
        style={{
          backgroundImage: metaInfo.backgroundImg
            ? `url(${metaInfo.backgroundImg})`
            : 'none',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {list}
      </div>
      <img className="max-w-full h-auto" src={bottomBar} alt="" />
    </div>
  )
}

export default MessageList
