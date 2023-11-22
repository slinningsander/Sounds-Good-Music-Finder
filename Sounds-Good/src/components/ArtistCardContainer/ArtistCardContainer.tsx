import { useEffect, useState } from 'react'
import GetArtist from '../../queries/getArtistsBySearch'
import ArtistCard from '../ArtistCard/ArtistCard'
import styles from './ArtistCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'

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
    listenersList[0],
    listenersList[1],
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
      console.log(data)
      setOffset(0)
      console.log('listeners', listenersList[1])
    }
  }, [input, listenersList[1], listenersList[0]])

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
