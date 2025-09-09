import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Voice(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender
  
  // 语音时长，优先使用duration字段，否则从text中解析，默认为1秒
  const duration = data.duration || (data.text ? parseInt(data.text) || 1 : 1)
  
  const baseClasses = 'relative z-2 text-gray-800 text-sm px-3 py-2 mx-4 rounded flex items-center gap-2 min-w-16'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'
  
  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses}`}>
        {/* 语音图标 */}
        <div className="flex items-center gap-1">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
            className="text-gray-600"
          >
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V14h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-1.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
          </svg>
          
          {/* 音频波形动画 */}
          <div className="flex items-center gap-0.5">
            <div className="w-0.5 h-2 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-0.5 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-0.5 h-2.5 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-0.5 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
        
        {/* 语音时长 */}
        <span className="text-xs text-gray-600 ml-1">{duration}"</span>
      </div>
    </div>
  )
}