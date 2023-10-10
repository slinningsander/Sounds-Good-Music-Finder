import CommentComponent from '../CommentComponent/CommentComponent'
import './CommentsContainer.css'

export const CommentsContainer = () => {
  return (
    <>
      <div className="CommentsWrapper">
        <h2>Comments</h2>
        <div className="CommentsContainer">
          <CommentComponent text="This is a comment" />
          <CommentComponent text="This is another comment" />
          <CommentComponent text="This is yet another comment" />
        </div>
        <h2>Add a comment</h2>
        <div className="comment-form">
          <input type="text" />
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
