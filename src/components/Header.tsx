import { Layout } from 'antd';
import { DrawerMenu } from "./DrawerMenu"
import { useContext } from "react"
import { AuthContext } from "../authContext"

export const Header = () => {

  const authCtxObj = useContext(AuthContext)

  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="header-content-container">
        <h1 className="header-logo">📷 Insta</h1>

        {authCtxObj?.user && <DrawerMenu />}

      </div>
    </Header>
  )
}