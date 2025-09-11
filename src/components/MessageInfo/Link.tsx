import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Link(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative z-2 text-gray-800 text-sm max-w-80 px-3 py-2 mx-4 rounded break-all font-sans'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  // 使用 text 作为链接标题，url 作为链接地址
  const linkTitle = data.text || '链接'
  const linkUrl = data.url || 'https://example.com'
  
  // 提取域名用于显示
  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses} p-0 overflow-hidden`}>
        {/* 简化的链接卡片样式，类似微信 */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            {/* 链接图标 */}
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 text-lg">
              🔗
            </div>
            
            {/* 链接信息 */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 mb-1 truncate">
                {linkTitle}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {getDomain(linkUrl)}
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部显示 "网页链接" */}
        <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500">
          网页链接
        </div>
      </div>
    </div>
  )
}
