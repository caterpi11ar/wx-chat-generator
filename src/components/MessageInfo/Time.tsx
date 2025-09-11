import type { MessageDetail } from '@/types'

interface Props {
  data: MessageDetail
  sender?: never // Time 消息不需要 sender 属性
}

export default function Time(props: Props) {
  const { data } = props
  
  // 直接使用 text 字段作为时间显示，如果没有则显示当前时间
  const timeText = data.text || new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <div className="flex justify-center my-4">
      <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
        {timeText}
      </div>
    </div>
  )
}