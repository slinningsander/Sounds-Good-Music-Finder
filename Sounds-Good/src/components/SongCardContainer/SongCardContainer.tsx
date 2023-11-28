import { useEffect, useState } from 'react'
import GetSongBySearch from '../../graphql/queries/getTracksBySearch'
import SongCard from '../SongCard/SongCard'
import styles from './SongCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'

type SongCardContainerProps = {
  input: string
}

const SongCardContainer = ({ input }: SongCardContainerProps) => {
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const durationList = useSelector(
    (state: RootState) => state.filterDuration.value
  )
  const maxDuration = durationList[1]
  const minDuration = durationList[0]
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )
  const { data, error, loading } = GetSongBySearch(
    input,
    offset,
    more,
    maxDuration,
    minDuration,
    sortingDirection,
    setMore
  )

  const client = useApolloClient()

  useEffect(() => {
    client.resetStore()
    // console.log('minDuration: ' + durationList[0])
    // console.log('maxDuration: ' + durationList[1])
    // console.log(input)
    // if (loading) {
    //   console.log('loading')
    // } else if (error) {
    //   console.log(error)
    // } else {
    //   console.log(data.tracks)
    setOffset(0)
    // }
  }, [client, input, sortingDirection, minDuration, maxDuration])
  // durationList[1], durationList[0],
  return (
    <div className={styles.wrapper} data-cy="SongsContainer">
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
      ) : data.tracks.length > 0 ? (
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
        <Alert severity="info">No tracks found :/</Alert>
      )}

      {data && data.tracks.length == offset + 5 && (
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
  )
}

export default SongCardContainer
