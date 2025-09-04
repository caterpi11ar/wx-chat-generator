import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Image(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  console.log('Image component data:', data)
  console.log('Image component data.url:', data.url, 'typeof:', typeof data.url)

  const baseClasses = 'relative max-w-80 mx-4 rounded-lg overflow-hidden'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'before:bg-white before:-left-1 before:-mt-1'

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses}`}>
        {data.url
          ? (
              <img
                src={data.url}
                alt="消息图片"
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '300px', minWidth: '120px' }}
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
