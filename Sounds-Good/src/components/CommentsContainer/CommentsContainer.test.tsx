import { render, fireEvent, waitFor } from '@testing-library/react'
import { CommentsContainer } from './CommentsContainer'
import createComment from '../../graphql/mutations/createComment'

vi.mock('../../queries/getComments', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: {
      comments: [
        { id: 1, text: 'Comment 1' },
        { id: 2, text: 'Comment 2' },
      ],
    },
    loading: false,
    error: null,
  })),
}))

vi.mock('../../mutations/createComment', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    createComments: vi.fn(),
  })),
}))

describe('CommentsContainer', () => {
  test('Renders comments and adds a new comment', async () => {
    const title = 'Title'
    const artist = 'Artist'
    const album = 'Album'

    const { getByText, getByTestId } = render(
      <CommentsContainer title={title} artist={artist} album={album} />
    )

    // Check if comments are rendered
    await waitFor(() => {
      expect(getByText('Comment 1')).toBeInTheDocument()
      expect(getByText('Comment 2')).toBeInTheDocument()
    })

    // Check if the form elements are present
    const commentInput = getByTestId('comment-input') as HTMLInputElement
    const addButton = getByText('Add')

    // Simulate adding a new comment
    fireEvent.change(commentInput, { target: { value: 'New Comment' } })
    fireEvent.click(addButton)

    // Ensure createComments function was called after clicking the Add button
    await waitFor(() => {
      expect(commentInput.value).toBe('')
      expect(createComment).toHaveBeenCalledWith(
        'New Comment',
        title,
        album,
        artist
      )
    })
  })
})
