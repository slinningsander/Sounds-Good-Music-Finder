import { useEffect, useState } from 'react'
import GetArtist from '../../queries/getArtistsBySearch'
import ArtistCard from '../ArtistCard/ArtistCard'
import styles from './ArtistCardContainer.module.css'

type ArtistCardContainerProps = {
  input: string
}
const ArtistCardContainer = ({ input }: ArtistCardContainerProps) => {
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetArtist(input, offset, more, setMore)

  const getArtists = () => {
    setOffset(data.artists.length)
  }

  useEffect(() => {
    if (loading) {
      console.log('loading')
    } else if (error) {
      console.log(error)
    } else {
      console.log(data.artists)
      getArtists()
    }
  }, [data, error])

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <></>
      ) : (
        data.artists.map((artist: { artist_name: string }) => (
          <div>
            <ArtistCard artistName={artist.artist_name} />
          </div>
        ))
      )}

      <button onClick={() => setMore(true)}>Show More</button>
    </div>
  )
}

export default ArtistCardContainer
