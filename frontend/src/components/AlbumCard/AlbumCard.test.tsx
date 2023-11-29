import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AlbumCard from './AlbumCard'

const mockProps = {
  artist: 'Artist Name',
  album: 'Album Name',
  img: 'album_image.jpg',
}

describe('AlbumCard component', () => {
  test('Renders with correct content', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <AlbumCard {...mockProps} />
      </Router>
    )

    const albumTitle = getByText(mockProps.album)
    const artistName = getByText(mockProps.artist)
    const albumCover = getByAltText(`${mockProps.album} album cover`)

    expect(albumTitle).toBeInTheDocument()
    expect(artistName).toBeInTheDocument()
    expect(albumCover).toBeInTheDocument()
  })
})
