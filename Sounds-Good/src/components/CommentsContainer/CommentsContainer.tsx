import CommentComponent from '../CommentComponent/CommentComponent'
import styles from './CommentsContainer.module.css'

export const CommentsContainer = () => {
  return (
    <>
      <div className={styles.CommentsWrapper}>
        <h2>Comments (not implemented)</h2>
        <div className={styles.CommentsContainer}>
          <CommentComponent text="This is a comment" />
          <CommentComponent text="This is another comment" />
          <CommentComponent text="This is yet another comment" />
        </div>
        <div className={styles.commentForm}>
          <label htmlFor="commentInput">Add a comment:</label>
          <input type="text" id="commentInput" />
          <button
            type="submit"
            onClick={() =>
              alert(
                'This will add the comment to the database. Not yet implemented.'
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}
