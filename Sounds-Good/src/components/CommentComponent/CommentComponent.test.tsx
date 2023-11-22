import { render } from '@testing-library/react'
import { CommentComponent } from './CommentComponent'
import styles from './CommentComponent.module.css'

const mockText = 'This is a test comment.'

describe('CommentComponent', () => {
  test('Renders with provided text', () => {
    const { getByText } = render(<CommentComponent text={mockText} />)

    const commentTextElement = getByText(mockText)

    expect(commentTextElement).toBeInTheDocument()
    expect(commentTextElement.tagName.toLowerCase()).toBe('p')

    const commentComponent = commentTextElement.closest(
      `.${styles.CommentComponent}`
    )

    expect(commentComponent).toBeInTheDocument()
  })
})
