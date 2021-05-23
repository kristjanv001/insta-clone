import 'antd/dist/antd.css'
import "./styles.css"
import { Layout } from 'antd';
import { Header } from "./components/Header"
import { PostList } from "./components/PostList"
const { Content, Footer } = Layout;


function App() {


  return (
    <>
      <Layout style={{ minHeight: "100vh" }} >
        <Header />
        <Content className="content-container" >
          <PostList />
        </Content>
        <Footer className="footer" >2021</Footer>
      </Layout>
    </>
  );
}

export default App;
