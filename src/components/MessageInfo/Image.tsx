import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Image(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative max-w-80 mx-4 rounded-lg flex items-center'
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses}`}>
        {data.url
          ? (
              <img
                src={data.url}
                alt="消息图片"
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '300px', maxWidth: '120px' }}
              />
            )
          : (
              <div className="w-40 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                图片加载失败
              </div>
            )}
      </div>
    </div>
  )
}
