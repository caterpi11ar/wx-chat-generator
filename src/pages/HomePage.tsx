import type { Dayjs } from 'dayjs'
import type { MessageDetail, UserInfo } from '@/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import CombinedForm from '@/components/CombinedForm'
import MessageList from '@/components/MessageList'
import { DEFAULT_MESSAGES, DEFAULT_META_INFO, DEFAULT_USERS } from '@/constants/defaultData'

interface MetaInfo {
  time?: Dayjs | null
  backgroundImg?: string
}

export default function HomePage() {
  const [messageList, setMessageList] = useState<MessageDetail[]>(DEFAULT_MESSAGES)
  const [userList, setUserList] = useState<[UserInfo, UserInfo]>(DEFAULT_USERS)
  const [metaInfo, setMetaInfo] = useState<MetaInfo>({ time: dayjs(DEFAULT_META_INFO.time, 'HH:mm') })

  const handleMessageSubmit = (messageData: Omit<MessageDetail, 'id'>) => {
    setMessageList([...messageList, { ...messageData, id: Date.now() }])
  }

  const handleUsersChange = (users: [UserInfo, UserInfo]) => {
    setUserList(users)
  }

  const handleMetaChange = (meta: MetaInfo) => {
    setMetaInfo(meta)
  }

  return (
    <div className="h-screen lg:flex lg:flex-row overflow-y-auto">
      <CombinedForm
        userList={userList}
        metaInfo={metaInfo}
        onUsersChange={handleUsersChange}
        onMetaChange={handleMetaChange}
        onMessageSubmit={handleMessageSubmit}
      />
      <MessageList messageData={messageList} userList={userList} metaInfo={metaInfo} />
    </div>
  )
}
