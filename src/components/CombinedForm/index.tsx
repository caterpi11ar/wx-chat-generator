import type { FormProps, GetProp, UploadFile, UploadProps } from 'antd'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { MessageDetail, UserInfo } from '@/types'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Radio, Select, TimePicker, Upload } from 'antd'
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
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const CombinedForm: FC<Props> = ({ userList, metaInfo, onUsersChange, onMetaChange, onMessageSubmit }) => {
  const [form] = Form.useForm<CombinedFormData>()
  const [recipientFileList, setRecipientFileList] = useState<UploadFile[]>([])
  const [senderFileList, setSenderFileList] = useState<UploadFile[]>([])
  const [bgFileList, setBgFileList] = useState<UploadFile[]>([])

  const [recipient, sender] = userList

  const createUploadHandler = (type: 'recipient' | 'sender' | 'background') => (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传图片')
      return false
    }

    getBase64(file, (url) => {
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
    onMessageSubmit({
      type: values.type,
      sender: values.sender,
      text: values.text,
    })
    // 重置消息表单部分
    form.setFieldsValue({
      type: MESSAGE_TYPE.TEXT,
      sender: SENDER.Sender,
      text: '',
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
    <div className="h-screen bg-gray-50 flex flex-col p-x-4">
      {/* 紧凑顶部 */}
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
      <div className="flex-1 space-y-4">
        {/* 配置卡片 - 紧凑布局 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                >
                  {recipient?.avatar
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
                >
                  {sender?.avatar
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
                  >
                    {metaInfo.backgroundImg
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

              <Form.Item noStyle>
                <Button type="primary" htmlType="submit" block className="h-9 text-sm">
                  发送消息
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CombinedForm
