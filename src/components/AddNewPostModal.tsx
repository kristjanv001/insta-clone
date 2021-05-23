import { useState, useContext } from 'react';
import { Modal, Button, Upload, Form, Input, message } from 'antd';
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons"
import { PostsContext } from "../postsContext"
import { storage } from "../firebase"

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const { TextArea } = Input;

export const AddNewPostModal = (props: { onClose: () => void }) => {

  const { onClose } = props

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  const postsCtxObj = useContext(PostsContext)

  const showModal = () => {
    onClose()
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Something went wrong ');
  };


  const postSubmitHandler = () => {
    postsCtxObj?.postHandler(description, url)
    setIsModalVisible(false);
  }

  const handleUploadChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

  }

  const beforeUpload = (file: any) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      message.error('You can only upload an image file!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  }


  const customRequest = ({ file, onSuccess }: any) => {

    const uploadTask = storage.ref(`images/${file.name}`).put(file)

    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error)
      message.error("Something went wrong with the upload")
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      onSuccess(null, file);
      storage.ref("images").child(file.name).getDownloadURL().then((url) => {
        setUrl(url)
      })

    }
    );


  }



  return (
    <>
      <Button
        onClick={showModal}
        type="link"
        icon={<FileImageOutlined />}
      >
        Add a new post
      </Button>
      <Modal
        title="Add a new post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={postSubmitHandler}
          onFinishFailed={onFinishFailed}
        >
          {/* MESSAGE ITEM */}
          <Form.Item
            label="Message"
            name="message"
            valuePropName="fileList"
          >
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          {/* UPLOAD ITEM */}
          <Form.Item
            name="upload"
            label="Upload"
          >
            <Upload
              name="file"
              onChange={handleUploadChange}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
};
