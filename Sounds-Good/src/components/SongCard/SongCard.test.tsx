import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SongCard from './SongCard'

test('Renders BasicInfoCard with provided props and link', () => {
  const mockProps = {
    song: 'Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    img: 'image-url.jpg',
  }

  const { getByText } = render(
    <MemoryRouter>
      <SongCard {...mockProps} />
    </MemoryRouter>
  )

  const songElement = getByText(mockProps.song)
  const artistElement = getByText(mockProps.artist)
  const albumElement = getByText(mockProps.album)

  expect(songElement).toBeInTheDocument()
  expect(artistElement).toBeInTheDocument()
  expect(albumElement).toBeInTheDocument()

  const linkElement = document.querySelector('a')

  const hrefAttribute = linkElement?.getAttribute('href')

  expect(hrefAttribute).toBe(
    `/project2/${encodeURIComponent(
      mockProps.artist
    )}/album/${encodeURIComponent(mockProps.album)}/song/${encodeURIComponent(
      mockProps.song
    )}`
  )
})
