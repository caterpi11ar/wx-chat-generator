import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Video(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative z-2 text-gray-800 text-sm max-w-80 px-3 py-2 mx-4 rounded break-all font-sans'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  // 模拟视频预览图，实际项目中应该是视频封面
  const videoThumbnail = data.url || '/placeholder-video.jpg'
  const duration = data.duration ? `${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}` : '0:30'

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses} p-1`}>
        <div className="relative w-48 h-32 bg-black rounded overflow-hidden">
          {/* 视频缩略图 */}
          <img 
            src={videoThumbnail} 
            alt="视频封面"
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果图片加载失败，显示占位符
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {/* 如果图片加载失败，显示占位符 */}
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📹</div>
              <div className="text-xs">视频</div>
            </div>
          </div>
          
          {/* 播放按钮 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
            </div>
          </div>
          
          {/* 时长显示 */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        </div>
      </div>
    </div>
  )
}
