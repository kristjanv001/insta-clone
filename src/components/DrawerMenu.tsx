import { Button, Drawer } from 'antd';
import { LogoutOutlined } from "@ant-design/icons"
import { useContext, useState } from "react"
import { AuthContext } from "../authContext"
import { AddNewPostModal } from "./AddNewPostModal"


export const DrawerMenu = () => {

  const authCtxObj = useContext(AuthContext)

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  return (
    <div >
      <div>
        <Button onClick={showDrawer}>
          Menu
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
        >
          <p>Logged in as {authCtxObj?.user?.email}</p>
          <AddNewPostModal onClose={onClose} />
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={() => authCtxObj?.logOut()}
          >
            Log Out
          </Button>
        </Drawer>
      </div>
    </div>
  )
}