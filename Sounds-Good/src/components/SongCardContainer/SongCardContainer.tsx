import { useEffect, useState } from 'react'
import GetSongBySearch from '../../queries/getTracksBySearch'
import SongCard from '../SongCard/SongCard'
import styles from './SongCardContainer.module.css'

type SongCardContainerProps = {
  input: string
}

const SongCardContainer = ({ input }: SongCardContainerProps) => {
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetSongBySearch(input, offset, more, setMore)

  useEffect(() => {
    if (loading) {
      console.log('loading')
    } else if (error) {
      console.log(error)
    } else {
      console.log(data.tracks)
      setOffset(data.tracks.length)
    }
  }, [data, error])

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
                img={song.cover_art}
              />
            </div>
          )
        )
      )}

      <button onClick={() => setMore(true)}>Show More</button>
    </div>
  )
}

export default SongCardContainer
