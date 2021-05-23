
import { Comment } from 'antd';
import { OpinionPropsType } from "../types"

export const Opinion = (props: OpinionPropsType) => {

  const { opinionAuthorName, opinionText } = props.opinion



  return (
    <Comment
      author={opinionAuthorName}
      content={<p>{opinionText}</p>}
    />
  )
}