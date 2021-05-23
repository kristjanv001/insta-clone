import { useState, useContext } from 'react';
import { Modal, Button } from 'antd';
import { AuthContext } from "../authContext"

export const LogInModal = () => {

  const authCtxObj = useContext(AuthContext)

  const [isModalVisible, setIsModalVisible] = useState(false);


  const signInWithGoogleHandler = () => {
    authCtxObj?.signInWithGoogle()
    setIsModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Log In or sign up here
      </Button>
      <Modal
        title="Log In / Sign Up"
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Right now it's only possible to log in with a Google account.</p>
        <Button onClick={signInWithGoogleHandler}>Log in with Google</Button>
      </Modal>
    </>
  );
};