import { useEffect } from 'react'
import styles from './Artistpage.module.css'
import Page from '../../components/Page/Page'
import GetArtist from '../../queries/getArtist'
import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

type Album = {
  album_art: string | undefined
  album_title: string
}

const Artistpage = () => {
  const url = new URL(window.location.href)
  const navigate = useNavigate()
  const client = useApolloClient()

  // Extract the value of the parameter "name" from the URL
  const artistName = url.pathname.split('/').pop() // Extracts "Kanye%20West"

  // Decode the URI component to get the actual artist name
  const decodedArtistName = decodeURIComponent(artistName || '')

  const { data, loading, error } = GetArtist(decodedArtistName)

  const sanitizedBio = data?.artists[0].artist_bio.replace(
    /<a\b[^>]*>.*?<\/a>/g,
    '...'
  )
  const formattedlisteners = new Intl.NumberFormat('UK').format(
    data?.artists[0].listeners
  )

  useEffect(() => {
    client.resetStore()
  }, [client])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <>
      <Page>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <h1>{data.artists[0].artist_name}</h1>
            <h3>Last.fm listeners: {formattedlisteners}</h3>
            <h2>About</h2>
            <p className={styles.bio}>{sanitizedBio}</p>
          </div>
          <h2>Most Popular Albums</h2>
          <div className={styles.albumContainer}>
            {data.artists[0].createdAlbumAlbums.map((album: Album) => (
              <div className={styles.albums}>
                <p> {album.album_title}</p>
                <img
                  src={album.album_art}
                  className={styles.albumCover}
                  onClick={() =>
                    navigate('album/' + encodeURIComponent(album.album_title))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Artistpage
