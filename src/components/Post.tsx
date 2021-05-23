import { Card, Comment, message, Modal, Input, Form, Button } from 'antd';
import { DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { Opinion } from "./Opinion"
import { PostPropsType, OpinionType } from "../types"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../authContext"
import { db } from "../firebase"
import firebase from "firebase"

export const Post = (props: PostPropsType) => {

  const { photoUrl, postAuthorName, postAuthorEmail, description, id } = props.post
  const [opinions, setOpinions] = useState<any>([])
  const authCtxObj = useContext(AuthContext)

  const deletePosthandler = async (id: string) => {
    try {
      await db.collection("posts").doc(id).delete()
      message.success("Post deleted successfully")

    } catch (error) {
      console.log(error)
      message.error("Something went wrong. Post not deleted")
    }
  }


  // pull in opinions
  useEffect(() => {
    db.collection("posts").doc(id).collection("opinions").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      try {
        setOpinions(snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            opinionText: doc.data().opinionText,
            opinionAuthorName: doc.data().opinionAuthorName.split(' ').slice(0, 1).join(' '),
            timestamp: doc.data().timestamp,
          }
        }))
      } catch (error) {
        console.log(error)
      }
    })
  }, [id])

  // add new opinion modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState('')

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addNewOpinionHandler = (values: any) => {
    db.collection("posts").doc(id).collection("opinions").add({
      opinionText: text,
      opinionAuthorName: authCtxObj?.user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    handleOk()
  };


  return (
    <Card

      className="card-container"
      extra={
        <div>
          {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
          <span>{postAuthorName}</span>
        </div>
      }
      cover={
        <img
          alt="example"
          src={photoUrl}
        />
      }
      actions={authCtxObj?.user?.email === postAuthorEmail ? [

        <DeleteOutlined onClick={() => deletePosthandler(id)} key="delete" />,
        <CommentOutlined onClick={() => showModal()} key="comment" />
      ] : [<CommentOutlined onClick={() => showModal()} key="comment" />]}

    >

      <Comment
        author={postAuthorName}
        content={<p>{description}</p>}
      />

      {opinions && opinions.map((opinion: OpinionType) => {
        return (
          <Opinion key={opinion.id} opinion={opinion} />
        )
      })}

      <Modal
        footer={null}
        title="Add a comment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>

        <Form
          name="basic"
          onFinish={addNewOpinionHandler}
        >
          <Form.Item name="remember" valuePropName="checked">
            <Input.TextArea onChange={(e) => setText(e.target.value)} value={text} rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>


    </Card>
  )
}