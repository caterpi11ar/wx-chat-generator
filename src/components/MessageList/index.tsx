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

const MessageList: FC<MessageListProps> = (props) => {
  const { messageData, userList, metaInfo } = props
  const [recipient, sender] = userList

  const list = messageData?.map((item) => {
    if (!item.type)
      return null
    const Com = Options[item.type]
    const messageSender = item.sender
    const currentUser = messageSender === SENDER.Recipient ? recipient : sender
    const imgSrc = currentUser?.avatar

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
          className="font-400 mx-4 truncate"
          style={{ color: '#181818' }}
        >
          {recipient?.username || '匿名'}
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
