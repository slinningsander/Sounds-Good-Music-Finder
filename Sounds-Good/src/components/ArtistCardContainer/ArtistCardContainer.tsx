import { useEffect, useState } from 'react'
import GetArtist from '../../queries/getArtistsBySearch'
import ArtistCard from '../ArtistCard/ArtistCard'
import styles from './ArtistCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'

type ArtistCardContainerProps = {
  input: string
}

const ArtistCardContainer = ({ input }: ArtistCardContainerProps) => {
  const listenersList = useSelector((state) => state.filterListeners.value)
  console.log('REDUX DATA: ', listenersList)
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetArtist(
    input,
    offset,
    more,
    listenersList[1],
    listenersList[0],
    setMore
  )
  const client = useApolloClient()

  useEffect(() => {
    client.resetStore()
    if (loading) {
      console.log('loading')
    } else if (error) {
      console.log(error)
    } else {
      setOffset(0)
    }
  }, [input, listenersList[1], listenersList[0]])

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
        data.artists.map((artist: { artist_name: string }) => (
          <div>
            <ArtistCard artistName={artist.artist_name} />
          </div>
        ))
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
