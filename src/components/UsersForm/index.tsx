import type { UserInfo } from '@/types'
import { Card } from 'antd'
import CustomForm from './CustomForm'

interface Props {
  userList: [UserInfo, UserInfo]
  onChange: (users: [UserInfo, UserInfo]) => void
}

export default function UsersForm({ userList, onChange }: Props) {
  const [recipient, sender] = userList

  const handleSenderChange = (form: UserInfo) => {
    onChange([recipient, { ...sender, ...form }])
  }
  const handleRecipientChange = (form: UserInfo) => {
    onChange([{ ...recipient, ...form }, sender])
  }

  return (
    <div className="flex w-full flex-col gap-4 h-full">
      <Card title="对方" className="flex-1">
        <CustomForm userInfo={recipient} onChange={handleRecipientChange} />
      </Card>

      <Card title="我" className="flex-1">
        <CustomForm userInfo={sender} onChange={handleSenderChange} />
      </Card>
    </div>
  )
}
