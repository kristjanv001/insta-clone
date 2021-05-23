import { FC, createContext, useState, useContext, useEffect } from "react"
import { PostType, PostsContextType } from "./types"
import { AuthContext } from "./authContext"
import { db } from "./firebase"
import { message } from 'antd';
import firebase from "firebase"


const PostsContext = createContext<PostsContextType | null>(null)

const PostsContextProvider: FC = ({ children }) => {

  const authCtxObj = useContext(AuthContext)
  const [posts, setPosts] = useState<PostType[]>([])

  // pull in posts
  useEffect(() => {

    db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snap) => {
      try {
        setPosts(snap.docs.map((doc) => {
          return {
            id: doc.id,
            description: doc.data().description,
            photoUrl: doc.data().photoUrl,
            postAuthorName: doc.data().postAuthorName.split(' ').slice(0, 1).join(' '),
            postAuthorEmail: doc.data().postAuthorEmail,
            timestamp: doc.data().timestamp,
          }
        }))

      } catch (error) {
        console.log(error)
      } finally {
        // set loading to false

      }
    })

  }, [])

  // add a new post
  const postHandler = async (descriptionText: string, photUrl: string) => {
    try {
      await db.collection("posts").add({
        postAuthorName: authCtxObj?.user?.displayName,
        postAuthorEmail: authCtxObj?.user?.email,
        photoUrl: photUrl,
        description: descriptionText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      message.success('Post has been successful');
    } catch (error) {
      message.error('Something went wrong while trying to add a post');
    }

  }

  const postsCtxObj: PostsContextType = {
    posts,
    postHandler
  }

  return <PostsContext.Provider value={postsCtxObj}>{children}</PostsContext.Provider>;

}

export { PostsContextProvider, PostsContext }

