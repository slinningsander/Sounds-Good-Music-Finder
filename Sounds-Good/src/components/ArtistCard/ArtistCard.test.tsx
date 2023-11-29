import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ArtistCard from './ArtistCard'

const mockArtistName = 'Mock Artist'

const mockListeners = 10000000

describe('ArtistCard component', () => {
  test('Renders with correct content and link', () => {
    const { getByText } = render(
      <Router>
        <ArtistCard artistName={mockArtistName} listeners={mockListeners} />
      </Router>
    )

    const artistNameElement = getByText(mockArtistName)

    expect(artistNameElement).toBeInTheDocument()

    const linkElement = artistNameElement.parentElement

    expect(linkElement?.tagName).toBe('A')
    expect(linkElement).toHaveAttribute(
      'href',
      `/project2/${encodeURIComponent(mockArtistName)}`
    )
  })

  test('Navigates to correct route on click', () => {
    const { getByText } = render(
      <Router>
        <ArtistCard artistName={mockArtistName} listeners={mockListeners} />
      </Router>
    )

    const artistNameElement = getByText(mockArtistName)

    fireEvent.click(artistNameElement)

    // Perform assertions on the expected URL after clicking the artist name
    expect(window.location.pathname).toBe(
      `/project2/${encodeURIComponent(mockArtistName)}`
    )
  })
})
