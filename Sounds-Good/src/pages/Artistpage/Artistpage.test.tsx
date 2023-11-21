import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Artistpage from './Artistpage'
import { MockedProvider } from '@apollo/client/testing'

// Mock the GetArtist query function
vi.mock('../../queries/getArtist', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: {
      artists: [
        {
          artist_name: 'Artist Name',
          listeners: 1000000,
          artist_bio: '<p>Artist Bio</p>',
          createdAlbumAlbums: [
            {
              album_art: 'album-image.jpg',
              album_title: 'Album Title 1',
            },
            // Add more mock albums as needed
          ],
        },
      ],
    },
    loading: false,
    error: null,
  })),
}))

describe('Artistpage', () => {
  test('Renders Artistpage with artist information and albums', async () => {
    const { getByText, getAllByAltText, queryByText } = render(
      <MemoryRouter>
        <MockedProvider>
          <Artistpage />
        </MockedProvider>
      </MemoryRouter>
    )

    // Wait for the component to render with the artist data
    await waitFor(() => {
      // Check if the artist name is displayed
      expect(getByText(/Artist Name/i)).toBeInTheDocument()

      // Check for listeners count text using regex
      expect(getByText(/Last.fm listeners: [0-9,.]+/i)).toBeInTheDocument()

      // Check if "About" section is present
      expect(getByText(/About/i)).toBeInTheDocument()

      // Check if albums are rendered with their titles
      expect(getByText(/Album Title 1/i)).toBeInTheDocument()

      // Check if album cover images are rendered
      const albumImages = getAllByAltText(/album cover/i)
      expect(albumImages.length).toBeGreaterThan(0)

      // Ensure an error message is not displayed
      expect(queryByText(/Error/i)).toBeNull()
    })
  })
})
