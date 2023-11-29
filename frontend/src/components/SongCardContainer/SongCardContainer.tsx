import { useEffect, useState } from 'react'
import GetSongBySearch from '../../graphql/queries/getTracksBySearch'
import SongCard from '../SongCard/SongCard'
import styles from './SongCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'

// Define the SongCardContainer component
const SongCardContainer = () => {
  // Define state variables
  const [offset, setOffset] = useState(0) // Offset for pagination
  const [more, setMore] = useState(false) // Flag to indicate if more tracks should be fetched
  const durationList = useSelector(
    (state: RootState) => state.filterDuration.value
  ) // Get the duration filter values from Redux store
  const maxDuration = durationList[1] // Maximum duration value
  const minDuration = durationList[0] // Minimum duration value
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  ) // Get the sorting direction from Redux store

  const searchInput = useSelector((state: RootState) => state.searchInput.value) // Get the search input from Redux store

  // Call the GetSongBySearch function to fetch song data based on search criteria
  const { data, error, loading } = GetSongBySearch(
    searchInput,
    offset,
    more,
    maxDuration,
    minDuration,
    sortingDirection,
    setMore
  )

  const client = useApolloClient() // Apollo Client instance

  // Reset the Apollo Client store and set the offset to 0 when search input, sorting direction, or duration filters change
  useEffect(() => {
    client.resetStore()
    setOffset(0)
  }, [client, searchInput, sortingDirection, minDuration, maxDuration, data])

  return (
    <>
      <div className={styles.wrapper} data-cy="SongsContainer">
        {loading ? (
          // Show a loading spinner if data is still loading
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
          // Show an error message if there is an error fetching data
          <Alert severity="error">Search error, try something else!</Alert>
        ) : data.tracks.length > 0 ? (
          // Render the SongCard component for each track in the data
          data.tracks.map(
            (song: {
              track_title: string
              duration: string
              cover_art: string
              albumsHasTrack: { album_art: string; album_title: string }[]
              artistsCreatedTrack: { artist_name: string }[]
            }) => (
              <div className={styles.childWrapper}>
                <SongCard
                  song={song.track_title}
                  artist={song.artistsCreatedTrack[0].artist_name}
                  img={song.albumsHasTrack[0].album_art}
                  album={song.albumsHasTrack[0].album_title}
                  tracklength={Number(song.duration)}
                />
              </div>
            )
          )
        ) : (
          // Show a message if no tracks are found
          <Alert severity="info">No tracks found :/</Alert>
        )}

        {data && data.tracks.length == offset + 5 && (
          // Show a "Show More" button if there are more tracks to fetch
          <button
            onClick={() => {
              setMore(true)
              setOffset(data.tracks.length)
            }}
            className={styles.button}
          >
            Show More
          </button>
        )}
      </div>
    </>
  )
}

export default SongCardContainer
