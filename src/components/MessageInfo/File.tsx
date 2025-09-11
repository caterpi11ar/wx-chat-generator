import type { MessageDetail } from '@/types'
import { SENDER } from '@/types'

interface Props {
  data: MessageDetail
  sender: SENDER
}

export default function File(props: Props) {
  const { data, sender } = props
  const isSender = sender === SENDER.Sender

  const baseClasses = 'relative z-2 text-gray-800 text-sm max-w-80 px-3 py-2 mx-4 rounded break-all font-sans'
  const beforeClasses = 'before:content-empty before:block before:w-2.5 before:h-2.5 before:absolute before:top-4 before:transform before:rotate-45 before:rounded-tl'

  const senderClasses = isSender
    ? 'bg-[#95ec69] before:z-1 before:bg-[#95ec69] before:-right-1 before:-mt-1'
    : 'bg-white before:z-1 before:bg-white before:-left-1 before:-mt-1'

  // 获取文件名，优先使用 text 字段，如果没有则从 url 提取
  const fileName = data.text || (data.url ? data.url.split('/').pop() || '未知文件' : '未知文件')
  
  // 简化文件图标，根据文件扩展名显示
  const getFileIcon = (name: string): string => {
    const ext = name.toLowerCase().split('.').pop() || ''
    switch (ext) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📝'
      case 'xls':
      case 'xlsx': return '📊'
      case 'ppt':
      case 'pptx': return '📋'
      case 'zip':
      case 'rar': return '🗜️'
      case 'mp3':
      case 'wav': return '🎵'
      case 'jpg':
      case 'png':
      case 'gif': return '🖼️'
      default: return '📎'
    }
  }

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`${baseClasses} ${beforeClasses} ${senderClasses}`}>
        <div className="flex items-center">
          {/* 文件图标 */}
          <div className="text-2xl mr-3 flex-shrink-0">
            {getFileIcon(fileName)}
          </div>
          
          {/* 文件信息 */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">
              {fileName}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
