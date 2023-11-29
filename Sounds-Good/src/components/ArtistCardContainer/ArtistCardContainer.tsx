import { useEffect, useState } from 'react'
import GetArtist from '../../graphql/queries/getArtistsBySearch'
import ArtistCard from '../ArtistCard/ArtistCard'
import styles from './ArtistCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'

const ArtistCardContainer = () => {
  const listenersList = useSelector(
    (state: RootState) => state.filterListeners.value
  )
  const maxListeners = listenersList[1]
  const minListeners = listenersList[0]
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )
  const searchInput = useSelector((state: RootState) => state.searchInput.value)
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetArtist(
    searchInput,
    offset,
    more,
    maxListeners,
    minListeners,
    sortingDirection,
    setMore
  )
  const client = useApolloClient()

  useEffect(() => {
    client.resetStore()
    setOffset(0)
  }, [client, searchInput, sortingDirection, maxListeners, minListeners])

  return (
    <div className={styles.wrapper} data-cy="ArtistsContainer">
      {loading ? (
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
      ) : error ? (
        <Alert severity="error">Search error, try something else!</Alert>
      ) : data.artists.length > 0 ? (
        data.artists.map(
          (artist: { artist_name: string; listeners: number }) => (
            <div>
              <ArtistCard
                artistName={artist.artist_name}
                listeners={artist.listeners}
              />
            </div>
          )
        )
      ) : (
        <Alert severity="info">No artists found :/</Alert>
      )}

      {data && data.artists.length == offset + 5 && (
        <button
          onClick={() => {
            setMore(true)
            setOffset(data.artists.length)
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
