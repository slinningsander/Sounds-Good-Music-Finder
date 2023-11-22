import { Create } from '@mui/icons-material'
import GetComments from '../../queries/getComments'
import CommentComponent from '../CommentComponent/CommentComponent'
import styles from './CommentsContainer.module.css'
import CreateComment from '../../mutations/createComment'
import { useState } from 'react'

type Props = {
  title: string
  artist: string
  album: string
}

export const CommentsContainer = ({ title, artist, album }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const { createComments } = CreateComment(inputValue, title, album, artist)

  const addComment = async () => {
    await createComments()
    setInputValue('')
  }
  const { data, loading, error } = GetComments(title, album, artist)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  console.log(data)

  return (
    <>
      <div className={styles.CommentsWrapper}>
        <h2 data-cy="SongCommentsHeader">Comments</h2>
        <div className={styles.CommentsContainer} data-cy="CommentsContainer">
          {data.comments.length !== 0 ? (
            data.comments.map((comment: any) => (
              <CommentComponent key={comment.id} text={comment.text} />
            ))
          ) : (
            <p>No comments yet :(</p>
          )}
        </div>

        <div className={styles.commentForm}>
          <label htmlFor="commentInput">Add a comment:</label>
          <input
            type="text"
            id="commentInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            data-cy="CommentInput"
          />
          <button
            type="submit"
            onClick={() => addComment()}
            data-cy="CommentButton"
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}
