
import { Divider, Space } from 'antd';
import { LogInModal } from "./LogInModal"

export const LogInHero = () => {
  return (
    <div>
      <Divider />
      <Space align="center" direction="vertical">
        <p>
          Welcome! Sign up or log in to post photos and comment. You can also remove your posts.
        </p>
        <LogInModal />
      </Space>
      <Divider />
    </div>
  )
}
