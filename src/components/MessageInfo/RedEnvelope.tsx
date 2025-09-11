import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function RedEnvelope(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative z-2 text-gray-800 text-sm max-w-80 px-3 py-2 mx-4 rounded break-all font-sans'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  // 使用 text 作为祝福语
  const blessing = data.text || '恭喜发财，大吉大利'

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses} p-0 overflow-hidden`}>
        {/* 微信红包卡片样式 */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 relative">
          <div className="p-4">
            {/* 红包图标 */}
            <div className="text-center mb-3">
              <div className="inline-block w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                🧧
              </div>
            </div>
            
            {/* 祝福语 */}
            <div className="text-center mb-3">
              <div className="text-white text-sm">
                {blessing}
              </div>
            </div>
            
            {/* 开启按钮 */}
            {!isSender && (
              <div className="text-center">
                <button className="bg-white bg-opacity-20 text-white text-sm py-1.5 px-4 rounded-full border border-white border-opacity-30">
                  开启红包
                </button>
              </div>
            )}
            
            {/* 发送状态 */}
            {isSender && (
              <div className="text-center">
                <div className="text-white text-xs opacity-80">
                  红包已发出
                </div>
              </div>
            )}
          </div>
          
          {/* 底部标识 */}
          <div className="bg-black bg-opacity-10 px-3 py-1.5 text-center">
            <div className="text-white text-xs opacity-70">
              微信红包
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
