import { useContext } from "react"
import { Post } from "./Post"
import { LogInHero } from "./LogInHero"
import { AuthContext } from "../authContext"
import { PostsContext } from "../postsContext"


export const PostList = () => {

  const authCtxObj = useContext(AuthContext)
  const postsCtxObj = useContext(PostsContext)

  return (
    <>
      {!authCtxObj?.user && <LogInHero />}

      {postsCtxObj && postsCtxObj.posts.map((post) => {
        return (
          <Post key={post.id} post={post} />
        )
      })}

    </>
  )
}