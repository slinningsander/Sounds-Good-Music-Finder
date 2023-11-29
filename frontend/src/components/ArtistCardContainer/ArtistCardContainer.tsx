import { useEffect, useState } from 'react'
import GetArtist from '../../graphql/queries/getArtistsBySearch'
import ArtistCard from '../ArtistCard/ArtistCard'
import styles from './ArtistCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'

const ArtistCardContainer = () => {
  // Using useSelector to access Redux store states
  const listenersList = useSelector(
    (state: RootState) => state.filterListeners.value
  )
  const maxListeners = listenersList[1]
  const minListeners = listenersList[0]
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )
  const searchInput = useSelector((state: RootState) => state.searchInput.value)

  // State variables for managing offset and 'show more' functionality
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)

  // Fetching data using GraphQL query with GetArtist function
  const { data, error, loading } = GetArtist(
    searchInput,
    offset,
    more,
    maxListeners,
    minListeners,
    sortingDirection,
    setMore
  )

  // Apollo Client instance for managing state and caching
  const client = useApolloClient()

  // useEffect to reset the store and offset when certain dependencies change
  useEffect(() => {
    client.resetStore() // Resets the Apollo Client store
    setOffset(0) // Resets the offset to 0 when searchInput, sortingDirection, maxListeners, or minListeners change
  }, [client, searchInput, sortingDirection, maxListeners, minListeners])

  return (
    <div className={styles.wrapper} data-cy="ArtistsContainer">
      {/* Conditional rendering based on loading, error, or retrieved data */}
      {loading ? ( // Display a loading spinner if data is still loading
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : error ? ( // Display an error message if there's an error fetching data
        <Alert severity="error">Search error, try something else!</Alert>
      ) : data.artists.length > 0 ? ( // Display artists' cards if data is available
        data.artists.map(
          (
            artist: { artist_name: string; listeners: number },
            index: number
          ) => (
            <div key={index}>
              {/* Adding a unique key for each mapped element */}
              <ArtistCard
                artistName={artist.artist_name}
                listeners={artist.listeners}
              />
            </div>
          )
        )
      ) : (
        // Display a message when no artists are found
        <Alert severity="info">No artists found :/</Alert>
      )}

      {/* Display 'Show More' button if there are more artists to load */}
      {data && data.artists.length === offset + 5 && (
        <button
          onClick={() => {
            setMore(true) // Set 'more' to true to fetch additional artists
            setOffset(data.artists.length) // Update the offset to load more artists
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </div>
  )
}

export default ArtistCardContainer
