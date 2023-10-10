import './CommentComponent.css'

type Props = {
  text: string
}

export const CommentComponent = (props: Props) => {
  return (
    <div className="CommentComponent">
      <h3>Username</h3>
      <p>{props.text}</p>
    </div>
  )
}

export default CommentComponent
