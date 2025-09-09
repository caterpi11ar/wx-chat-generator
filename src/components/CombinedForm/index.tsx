import type { FormProps, GetProp, UploadFile, UploadProps } from 'antd'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { MessageDetail, UserInfo } from '@/types'
import { DownloadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Radio, Select, Spin, TimePicker, Upload } from 'antd'
import dayjs from 'dayjs'
import html2canvas from 'html2canvas'
import { useState } from 'react'
import { MESSAGE_TYPE_FILTER, SENDER_FILTER } from '@/constants'
import { MESSAGE_TYPE, SENDER } from '@/types'

interface MetaInfo {
  time?: Dayjs | null
  backgroundImg?: string
}

interface CombinedFormData {
  // 用户信息
  recipientUsername?: string
  recipientAvatar?: string
  senderUsername?: string
  senderAvatar?: string
  // 元信息
  time?: Dayjs | null
  backgroundImg?: string
  // 消息
  type: MESSAGE_TYPE
  sender: SENDER
  text?: string
  url?: string
  duration?: number
}

interface Props {
  userList: [UserInfo, UserInfo]
  metaInfo: MetaInfo
  onUsersChange: (users: [UserInfo, UserInfo]) => void
  onMetaChange: (meta: MetaInfo) => void
  onMessageSubmit: (message: Omit<MessageDetail, 'id'>) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

function getBase64(img: Blob, callback: (url: string) => void) {
  console.log('getBase64 input file:', {
    name: (img as File).name || 'unknown',
    type: img.type,
    size: img.size,
    lastModified: (img as File).lastModified || 'unknown',
  })

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    const result = reader.result
    console.log('FileReader result type:', typeof result, 'constructor:', result?.constructor?.name)

    if (typeof result === 'string') {
      // 验证是否是有效的data URL
      if (result.startsWith('data:') && result.includes(',')) {
        console.log('Valid base64 generated, length:', result.length)
        callback(result)
      }
      else {
        console.error('Invalid data URL format:', result.substring(0, 100))
        callback('')
      }
    }
    else if (result instanceof ArrayBuffer) {
      console.error('FileReader returned ArrayBuffer instead of string - this should not happen with readAsDataURL')
      callback('')
    }
    else {
      console.error('getBase64: reader.result is unexpected type:', typeof result, result)
      callback('')
    }
  })

  reader.addEventListener('error', (event) => {
    console.error('getBase64: FileReader error:', event, reader.error)
    callback('')
  })

  try {
    reader.readAsDataURL(img)
  }
  catch (error) {
    console.error('Error calling readAsDataURL:', error)
    callback('')
  }
}

// 验证图片是否能正常渲染
function validateImageRendering(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log('validateImageRendering called with:', {
      type: typeof dataUrl,
      isString: typeof dataUrl === 'string',
      length: dataUrl?.length,
      prefix: dataUrl?.substring(0, 50),
    })

    // 检查数据URL是否有效
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      console.error('Invalid dataUrl for validation:', {
        dataUrl,
        type: typeof dataUrl,
        startsWithData: dataUrl?.startsWith?.('data:'),
      })
      resolve(false)
      return
    }

    const img = new Image()
    const timeoutId = setTimeout(() => {
      console.error('Image validation timeout after 10 seconds')
      resolve(false)
    }, 10000) // 10秒超时

    img.onload = () => {
      clearTimeout(timeoutId)
      console.log('Image loaded successfully:', {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        src: `${img.src.substring(0, 50)}...`,
      })
      // 检查图片是否有有效的尺寸
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        resolve(true)
      }
      else {
        console.error('Image has invalid dimensions:', {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        })
        resolve(false)
      }
    }

    img.onerror = (event) => {
      clearTimeout(timeoutId)
      console.error('Image failed to load:', event, {
        src: `${img.src.substring(0, 50)}...`,
      })
      resolve(false)
    }

    try {
      img.src = dataUrl
    }
    catch (error) {
      clearTimeout(timeoutId)
      console.error('Error setting image src:', error)
      resolve(false)
    }
  })
}

const CombinedForm: FC<Props> = ({ userList, metaInfo, onUsersChange, onMetaChange, onMessageSubmit }) => {
  const [form] = Form.useForm<CombinedFormData>()
  const [recipientFileList, setRecipientFileList] = useState<UploadFile[]>([])
  const [senderFileList, setSenderFileList] = useState<UploadFile[]>([])
  const [bgFileList, setBgFileList] = useState<UploadFile[]>([])

  // 图片验证状态
  const [imageValidating, setImageValidating] = useState<{
    recipient: boolean
    sender: boolean
    background: boolean
    message: boolean
  }>({
    recipient: false,
    sender: false,
    background: false,
    message: false,
  })

  const [recipient, sender] = userList

  const createUploadHandler = (type: 'recipient' | 'sender' | 'background' | 'message') => (file: FileType) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('请上传图片文件（支持 JPG、PNG、GIF、WebP 等格式）')
      return false
    }

    // 检查文件大小，限制在 5MB 以内
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB')
      return false
    }

    // 设置验证状态为加载中
    setImageValidating(prev => ({ ...prev, [type]: true }))

    getBase64(file, async (url) => {
      try {
        // 检查 base64 数据是否有效
        if (!url || typeof url !== 'string' || !url.startsWith('data:image/')) {
          message.error('图片文件读取失败，请重试')
          setImageValidating(prev => ({ ...prev, [type]: false }))
          return
        }

        // 验证图片是否能正常渲染
        const isValidImage = await validateImageRendering(url)

        if (!isValidImage) {
          message.error('图片文件已损坏或格式不支持，无法正常显示')
          setImageValidating(prev => ({ ...prev, [type]: false }))
          return
        }

        // 图片验证通过，设置到相应位置
        if (type === 'recipient') {
          setRecipientFileList([file])
          onUsersChange([{ ...recipient, avatar: url }, sender])
        }
        else if (type === 'sender') {
          setSenderFileList([file])
          onUsersChange([recipient, { ...sender, avatar: url }])
        }
        else if (type === 'background') {
          setBgFileList([file])
          onMetaChange({ ...metaInfo, backgroundImg: url })
        }
        else if (type === 'message') {
          console.log('Setting message image url:', url, 'typeof:', typeof url)
          // 不设置原始文件对象到 fileList，避免干扰表单值
          form.setFieldValue('url', url)

          // 验证设置后的值
          setTimeout(() => {
            const fieldValue = form.getFieldValue('url')
            console.log('Field value after setting:', fieldValue, 'typeof:', typeof fieldValue)
          }, 0)
        }

        setImageValidating(prev => ({ ...prev, [type]: false }))
      }
      catch (error) {
        console.error('图片验证失败:', error)
        message.error('图片验证失败，请重试')
        setImageValidating(prev => ({ ...prev, [type]: false }))
      }
    })
    return false
  }

  const handleValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    // 处理用户名变更
    if ('recipientUsername' in changedValues) {
      onUsersChange([{ ...recipient, username: changedValues.recipientUsername }, sender])
    }
    if ('senderUsername' in changedValues) {
      onUsersChange([recipient, { ...sender, username: changedValues.senderUsername }])
    }
    // 处理时间变更
    if ('time' in changedValues) {
      onMetaChange({ ...metaInfo, time: changedValues.time })
    }
  }

  const handleFinish = (values: CombinedFormData) => {
    console.log('handleFinish values:', values)
    console.log('values.url type:', typeof values.url, 'value:', values.url)

    const messageData = {
      type: values.type,
      sender: values.sender,
      text: values.text,
      url: values.url,
      duration: values.duration,
    }

    console.log('Submitting message:', messageData)
    onMessageSubmit(messageData)

    // 重置消息表单部分
    form.setFieldsValue({
      type: MESSAGE_TYPE.TEXT,
      sender: SENDER.Sender,
      text: '',
      url: '',
      duration: undefined,
    })
  }

  const handleExportImage = async () => {
    try {
      const messageListElement = document.querySelector('.message-list-container')
      if (!messageListElement) {
        message.error('未找到聊天区域')
        return
      }

      const canvas = await html2canvas(messageListElement as HTMLElement, {
        backgroundColor: '#ededed',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      // 创建下载链接
      const link = document.createElement('a')
      link.download = `chat-history-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      message.success('导出成功')
    }
    catch (error) {
      console.error('导出失败:', error)
      message.error('导出失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-x-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-900">微信聊天成器</h1>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="small"
            onClick={handleExportImage}
            className="text-xs"
          >
            导出图片
          </Button>
        </div>
      </div>

      {/* 滚动内容区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
          <h2 className="text-sm font-medium text-gray-900">配置</h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
          initialValues={{
            recipientUsername: recipient.username,
            senderUsername: sender.username,
            time: metaInfo.time || dayjs(),
            type: MESSAGE_TYPE.TEXT,
            sender: SENDER.Sender,
          }}
          size="small"
        >
          {/* 用户信息 - 水平紧凑布局 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* 发送方 */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-2 border-blue-500">
              <Upload
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={createUploadHandler('recipient')}
                fileList={recipientFileList}
                className="flex-shrink-0"
                accept="image/*"
              >
                {imageValidating.recipient
                  ? (
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center">
                        <Spin indicator={<LoadingOutlined className="text-blue-500" />} size="small" />
                      </div>
                    )
                  : recipient?.avatar
                    ? (
                        <img src={recipient.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                      )
                    : (
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
                          <PlusOutlined className="text-blue-500" />
                        </div>
                      )}
              </Upload>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-blue-600 font-medium mb-1">对方</div>
                <Form.Item name="recipientUsername" className="mb-0">
                  <Input placeholder="昵称" size="small" className="text-xs" />
                </Form.Item>
              </div>
            </div>

            {/* 接收方 */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-2 border-green-500">
              <Upload
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={createUploadHandler('sender')}
                fileList={senderFileList}
                className="flex-shrink-0"
                accept="image/*"
              >
                {imageValidating.sender
                  ? (
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-green-300 flex items-center justify-center">
                        <Spin indicator={<LoadingOutlined className="text-green-500" />} size="small" />
                      </div>
                    )
                  : sender?.avatar
                    ? (
                        <img src={sender.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                      )
                    : (
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-green-300 flex items-center justify-center hover:border-green-400 transition-colors cursor-pointer">
                          <PlusOutlined className="text-green-500" />
                        </div>
                      )}
              </Upload>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-green-600 font-medium mb-1">我</div>
                <Form.Item name="senderUsername" className="mb-0">
                  <Input placeholder="昵称" size="small" className="text-xs" />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* 环境设置 - 水平布局 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Form.Item name="time" label="时间" className="mb-0">
                <TimePicker format="HH:mm" size="small" className="w-full" placeholder="时间" />
              </Form.Item>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-xs font-medium text-gray-700 mb-2">背景</div>
              <div className="w-full h-16">
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={createUploadHandler('background')}
                  fileList={bgFileList}
                  className="w-full h-full [&_.ant-upload-select]:!w-full [&_.ant-upload-select]:!h-full [&_.ant-upload-select]:!min-h-0"
                  accept="image/*"
                >
                  {imageValidating.background
                    ? (
                        <div className="flex flex-col items-center justify-center h-full text-purple-500">
                          <Spin indicator={<LoadingOutlined className="text-sm" />} size="small" />
                          <span className="text-xs mt-1">验证中</span>
                        </div>
                      )
                    : metaInfo.backgroundImg
                      ? (
                          <img src={metaInfo.backgroundImg} alt="background" className="w-full h-full object-cover rounded" />
                        )
                      : (
                          <div className="flex flex-col items-center justify-center h-full text-purple-500 hover:text-purple-600 transition-colors">
                            <PlusOutlined className="text-sm" />
                            <span className="text-xs mt-1">上传</span>
                          </div>
                        )}
                </Upload>
              </div>
            </div>
          </div>

          {/* 消息发送区域 - 在同一个 Form 内 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-orange-500 rounded-sm"></div>
              <h3 className="text-sm font-medium text-gray-900">发送消息</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <Form.Item name="sender" label="发送方" rules={[{ required: true, message: '请选择发送方' }]}>
                <Radio.Group size="small" className="grid grid-cols-2 gap-1">
                  {SENDER_FILTER.map(({ value, label }, i) => (
                    <Radio.Button value={value} key={i} className="text-center text-xs">
                      {label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item name="type" label="消息类型" rules={[{ required: true, message: '请选择消息类型' }]}>
                <Select options={MESSAGE_TYPE_FILTER} placeholder="类型" size="small" />
              </Form.Item>
            </div>

            <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type}>
              {({ getFieldValue }) => {
                const messageType = getFieldValue('type')
                
                if (messageType === MESSAGE_TYPE.IMAGE) {
                  return (
                    <Form.Item
                      name="url"
                      label="选择图片"
                      rules={[{ required: true, message: '请选择图片' }]}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={createUploadHandler('message')}
                        className="w-full"
                        accept="image/*"
                      >
                        {imageValidating.message
                          ? (
                              <div className="flex flex-col items-center justify-center h-20 text-gray-500">
                                <Spin indicator={<LoadingOutlined className="text-lg mb-1" />} size="small" />
                                <span className="text-xs">验证图片中...</span>
                              </div>
                            )
                          : getFieldValue('url')
                            ? (
                                <img src={getFieldValue('url')} alt="message" className="w-full h-full object-cover rounded" />
                              )
                            : (
                                <div className="flex flex-col items-center justify-center h-20 text-gray-500">
                                  <PlusOutlined className="text-lg mb-1" />
                                  <span className="text-xs">选择图片</span>
                                </div>
                              )}
                      </Upload>
                    </Form.Item>
                  )
                } else if (messageType === MESSAGE_TYPE.VOICE) {
                  return (
                    <Form.Item
                      name="duration"
                      label="语音时长（秒）"
                      rules={[{ required: true, message: '请输入语音时长' }]}
                    >
                      <InputNumber
                        placeholder="请输入语音时长"
                        size="small"
                        min={1}
                        max={60}
                        suffix="秒"
                        style={{ width: '100%' }}
                        precision={0}
                      />
                    </Form.Item>
                  )
                } else {
                  return (
                    <Form.Item
                      name="text"
                      label="消息内容"
                      rules={[{ required: true, message: '请输入消息内容' }]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="输入消息内容..."
                        maxLength={200}
                        showCount
                        size="small"
                      />
                    </Form.Item>
                  )
                }
              }}
            </Form.Item>

            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-9 text-sm"
                loading={imageValidating.message}
                disabled={imageValidating.message}
              >
                {imageValidating.message ? '验证图片中...' : '发送消息'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

    </div>
  )
}

export default CombinedForm
