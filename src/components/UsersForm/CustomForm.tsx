import type {
  GetProp,
  UploadFile,
  UploadProps,
} from 'antd'
import type { FC } from 'react'
import type { UserInfo } from '@/types'
import { PlusOutlined } from '@ant-design/icons'
import {
  Form,
  Input,
  message,
  Upload,
} from 'antd'
import { useState } from 'react'

export interface CustomFormProps {
  userInfo?: UserInfo
  onChange?: (form: UserInfo) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

function getBase64(img: any, callback: (url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const CustomForm: FC<CustomFormProps> = (props) => {
  const [form] = Form.useForm<UserInfo>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传图片')
    }
    getBase64(file, (url) => {
      setFileList([file])
      props.onChange?.({ avatar: url })
    })
    return false
  }

  const uploadButton = (
    <button className="border-0 bg-none" type="button">
      <PlusOutlined />
      <div className="mt-2">Upload</div>
    </button>
  )

  const imageUrl = props.userInfo?.avatar

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ ...props.userInfo }}
      className="h-full"
    >
      <Form.Item<UserInfo> label="头像" name="avatar">
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          fileList={fileList}
        >
          {
            imageUrl
              ? <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" />
              : uploadButton
          }
        </Upload>
      </Form.Item>
      <Form.Item<UserInfo> label="用户名" name="username">
        <Input
          placeholder="请输入用户名"
          onChange={({ currentTarget }) =>
            props.onChange?.({ username: currentTarget.value })}
        />
      </Form.Item>
    </Form>
  )
}

export default CustomForm
