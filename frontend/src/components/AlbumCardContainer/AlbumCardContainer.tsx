import { useEffect, useState } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import GetAlbumBySearchAndTag from '../../graphql/queries/getAlbumBySearchAndTag'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'
import { AlbumEdgeType } from '../../types'

const AlbumCardContainer = () => {
  // Using useSelector to access Redux store states
  const selectedTags = useSelector((state: RootState) => state.filterTags.value)
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )

  // State variables for managing offset and 'show more' functionality
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)

  // Retrieving search input from Redux store
  const searchInput = useSelector((state: RootState) => state.searchInput.value)

  // Fetching data using GraphQL query with GetAlbumBySearchAndTag function
  const { data, error, loading } = GetAlbumBySearchAndTag(
    searchInput,
    selectedTags,
    offset,
    more,
    sortingDirection,
    setMore
  )

  // Apollo Client instance for managing state and caching
  const client = useApolloClient()

  // useEffect to reset the store and offset when certain dependencies change
  useEffect(() => {
    client.resetStore() // Resets the Apollo Client store
    setOffset(0) // Resets the offset to 0 when searchInput, selectedTags, or sortingDirection change
  }, [client, searchInput, selectedTags, sortingDirection])

  return (
    <div className={styles.wrapper} data-cy="AlbumsContainer">
      {/* Conditional rendering based on loading, error, or retrieved data */}
      {loading ? ( // Display a loading spinner if data is still loading
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="success" />
          </Box>
        </>
      ) : error ? ( // Display an error message if there's an error fetching data
        <Alert severity="error">Search error, try something else!</Alert>
      ) : data.albumsFulltextAlbumTitle.length > 0 ? ( // Display albums' cards if data is available
        <div data-cy="DivForTest">
          {data.albumsFulltextAlbumTitle.map((edge: AlbumEdgeType) => (
            <div key={edge.album.album_title} className={styles.childWrapper}>
              <AlbumCard
                album={edge.album.album_title}
                artist={edge.album.artistsCreatedAlbum[0].artist_name}
                img={edge.album.album_art}
              />
            </div>
          ))}
        </div>
      ) : (
        // Display a message when no albums are found
        <Alert severity="info">No albums found :/</Alert>
      )}

      {/* Display 'Show More' button if there are more albums to load */}
      {data && data.albumsFulltextAlbumTitle.length === offset + 5 && (
        <button
          onClick={() => {
            setMore(true) // Set 'more' to true to fetch additional albums
            setOffset(data.albumsFulltextAlbumTitle.length) // Update the offset to load more albums
          }}
          className={styles.button}
          data-cy="ShowMoreButton"
        >
          Show More
        </button>
      )}
    </div>
  )
}

export default AlbumCardContainer
