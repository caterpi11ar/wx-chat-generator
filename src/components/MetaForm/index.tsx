import type {
  FormProps,
  GetProp,
  UploadFile,
  UploadProps,
} from 'antd'
import type { Dayjs } from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import {
  Card,
  Form,
  message,
  TimePicker,
  Upload,
} from 'antd'
import { useState } from 'react'

const format = 'HH:mm'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
interface MetaInfo {
  time?: Dayjs | null
  backgroundImg?: string
}

interface Props {
  metaInfo: MetaInfo
  onChange: (meta: MetaInfo) => void
}

function getBase64(img: Blob, callback: (url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default function MetaForm({ metaInfo, onChange }: Props) {
  const [form] = Form.useForm<MetaInfo>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传图片')
    }
    getBase64(file, (url) => {
      onChange({
        ...metaInfo,
        backgroundImg: url,
      })
      setFileList([file])
    })
    return false
  }

  const handleValuesChange: FormProps['onValuesChange'] = (
    _changedValues,
    values,
  ) => {
    onChange({ ...values, backgroundImg: metaInfo.backgroundImg })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const imageUrl = metaInfo.backgroundImg
  return (
    <Card title="元信息" className="h-full flex flex-col">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...metaInfo }}
        onValuesChange={handleValuesChange}
        className="flex-1 flex flex-col"
      >
        <Form.Item<MetaInfo> label="时间" name="time">
          <TimePicker format={format} />
        </Form.Item>
        <Form.Item<MetaInfo> label="背景" name="backgroundImg">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            fileList={fileList}
          >
            {
              imageUrl
                ? <img src={imageUrl} alt="avatar" className="h-full" />
                : uploadButton
            }
          </Upload>
        </Form.Item>
      </Form>
    </Card>
  )
}
