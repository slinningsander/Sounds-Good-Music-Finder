import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SongDetailsComponent from './SongDetailsComponent'

describe('SongDetailsComponent', () => {
  test('Renders with provided props and links', () => {
    const mockProps = {
      title: 'Song Title',
      artist: 'Artist Name',
      img: 'image-url.jpg',
      length: '3:30',
      album: 'Album Name',
    }

    const { getByText, getByAltText, getByRole } = render(
      <MemoryRouter>
        <SongDetailsComponent {...mockProps} />
      </MemoryRouter>
    )

    const titleElement = getByText(mockProps.title)
    const artistElement = getByText(mockProps.artist)
    const albumElement = getByText(mockProps.album)
    const imageElement = getByAltText(mockProps.title)
    const lengthElement = getByText(mockProps.length)
    const artistLink = getByRole('link', { name: mockProps.artist })
    const albumLink = getByRole('link', { name: mockProps.album })

    expect(titleElement).toBeInTheDocument()
    expect(artistElement).toBeInTheDocument()
    expect(albumElement).toBeInTheDocument()
    expect(imageElement).toBeInTheDocument()
    expect(lengthElement).toBeInTheDocument()
    expect(artistLink.getAttribute('href')).toBe(
      `/project2/${encodeURIComponent(mockProps.artist)}`
    )
    expect(albumLink.getAttribute('href')).toBe(
      `/project2/${encodeURIComponent(
        mockProps.artist
      )}/album/${encodeURIComponent(mockProps.album)}`
    )
  })
})
