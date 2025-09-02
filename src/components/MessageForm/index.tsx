import type { FC } from 'react'
import { Button, Card, Form, Input, Radio, Select } from 'antd'
import {
  MESSAGE_TYPE_FILTER,
  SENDER_FILTER,
} from '@/constants'
import {
  MESSAGE_TYPE,
  SENDER,
} from '@/types'

interface FieldType {
  id: number
  type: MESSAGE_TYPE
  sender: SENDER
  text?: string
}

export interface MessageFormProps {
  onSubmit?: (formData: FieldType) => void
}

const MessageForm: FC<MessageFormProps> = (props) => {
  const [form] = Form.useForm<FieldType>()
  return (
    <Card title="消息" className="h-full flex flex-col">
      <Form
        name="message_info"
        layout="vertical"
        form={form}
        initialValues={{ type: MESSAGE_TYPE.TEXT, sender: SENDER.Sender }}
        onFinish={value => props.onSubmit?.(value)}
        className="flex-1 flex flex-col"
      >
        <Form.Item<FieldType>
          label="对方"
          name="sender"
          rules={[{ required: true, message: '请选择对方' }]}
        >
          <Radio.Group>
            {SENDER_FILTER.map(({ value, label }, i) => (
              <Radio value={value} key={i}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType>
          label="消息类型"
          name="type"
          rules={[{ required: true, message: '请选择消息类型' }]}
        >
          <Select style={{ width: 150 }} options={MESSAGE_TYPE_FILTER} />
        </Form.Item>

        <Form.Item<FieldType>
          label="文本内容"
          name="text"
          rules={[{ required: true, message: '文本内容不可为空' }]}
          className="flex-1"
        >
          <Input.TextArea rows={4} placeholder="请输入文本内容" maxLength={200} className="flex-1" />
        </Form.Item>

        <Form.Item noStyle className="mt-auto">
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default MessageForm
