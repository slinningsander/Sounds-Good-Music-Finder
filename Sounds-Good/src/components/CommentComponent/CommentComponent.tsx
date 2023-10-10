import styles from './CommentComponent.module.css'

type Props = {
  text: string
}

export const CommentComponent = (props: Props) => {
  return (
    <div className={styles.CommentComponent}>
      <h3>Username</h3>
      <p>{props.text}</p>
    </div>
  )
}

export default CommentComponent
