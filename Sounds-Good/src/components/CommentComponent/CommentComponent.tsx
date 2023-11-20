import styles from './CommentComponent.module.css'

type Props = {
  text: string
}

export const CommentComponent = (props: Props) => {
  return (
    <div className={styles.CommentComponent}>
      <p>{props.text}</p>
    </div>
  )
}

export default CommentComponent
