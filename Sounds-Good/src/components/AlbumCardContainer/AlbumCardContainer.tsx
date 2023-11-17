import { useEffect, useState } from 'react'
import GetAlbumBySearch from '../../queries/getAlbumsBySearch'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'

type AlbumCardContainerProps = {
  input: string
}

const AlbumCardContainer = ({ input }: AlbumCardContainerProps) => {
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(true)
  const { data, error, loading } = GetAlbumBySearch(
    input,
    offset,
    more,
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
      console.log(data.albums)
      setOffset(0)
    }
  }, [input])

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <></>
      ) : (
        data.albums.map(
          (album: {
            album_title: string
            album_art: string
            artistsCreatedAlbum: string
          }) => (
            <div>
              <AlbumCard
                album={album.album_title}
                artist={album.artistsCreatedAlbum[0].artist_name}
                img={album.album_art}
              />
            </div>
          )
        )
      )}

      {more && data && data.albums.length == offset + 5 && (
        <button
          onClick={() => {
            setOffset(data.albums.length)
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </div>
  )
}

export default AlbumCardContainer
