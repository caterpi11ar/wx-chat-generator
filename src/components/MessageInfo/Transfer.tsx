import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function Transfer(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative z-2 text-gray-800 text-sm max-w-80 px-3 py-2 mx-4 rounded break-all font-sans'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  // 使用 text 作为金额，简化处理
  const amount = data.text || '0.00'

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses} p-0 overflow-hidden`}>
        {/* 微信转账卡片样式 */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mr-3">
              💰
            </div>
            <div className="text-white font-semibold text-sm">
              微信转账
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-white text-xl font-bold">
              ¥{amount}
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-white border-opacity-20">
            <div className="text-white text-xs text-center opacity-80">
              {isSender ? '已发起转账' : '待确认收款'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
