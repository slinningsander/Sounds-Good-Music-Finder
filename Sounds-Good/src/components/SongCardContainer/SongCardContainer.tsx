import { useEffect, useState } from 'react'
import GetSongBySearch from '../../queries/getTracksBySearch'
import SongCard from '../SongCard/SongCard'
import styles from './SongCardContainer.module.css'
import { useApolloClient } from '@apollo/client'

type SongCardContainerProps = {
  input: string
}

const SongCardContainer = ({ input }: SongCardContainerProps) => {
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetSongBySearch(input, offset, more, setMore)

  const client = useApolloClient()

  useEffect(() => {
    client.resetStore()
    console.log(input)
    if (loading) {
      console.log('loading')
    } else if (error) {
      console.log(error)
    } else {
      console.log(data.tracks)
      setOffset(0)
    }
  }, [input])

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <></>
      ) : (
        data.tracks.map(
          (song: {
            track_title: string
            cover_art: string
            albumsHasTrack: string
            artistsCreatedTrack: string
          }) => (
            <div>
              <SongCard
                song={song.track_title}
                artist={song.artistsCreatedTrack[0].artist_name}
                img={song.albumsHasTrack[0].album_art}
                album={song.albumsHasTrack[0].album_title}
              />
            </div>
          )
        )
      )}

      <button
        onClick={() => {
          setMore(true)
          setOffset(data.tracks.length)
        }}
        className={styles.button}
      >
        Show More
      </button>
    </div>
  )
}

export default SongCardContainer
