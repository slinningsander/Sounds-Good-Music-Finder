import { useEffect } from 'react'
import styles from './Artistpage.module.css'
import Page from '../../components/Page/Page'
import GetArtist from '../../graphql/queries/getArtist'
import { Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

type Album = {
  album_art: string | undefined
  album_title: string
}

const Artistpage = () => {
  const url = new URL(window.location.href)
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
        <div className={styles.container} data-cy="ArtistPageContainer">
          <div className={styles.infoContainer}>
            <h1 data-cy="ArtistNameHeader">{data.artists[0].artist_name}</h1>
            <sub data-cy="ArtistListeners">
              Last.fm listeners: {formattedlisteners}
            </sub>
            <h2>About</h2>
            <p className={styles.bio} data-cy="ArtistBio">
              {sanitizedBio}
            </p>
          </div>
          <h2 data-cy="ArtistsAlbumsHeader">Most Popular Albums</h2>
          <div className={styles.albumContainer} data-cy="ArtistsAlbums">
            {data.artists[0].createdAlbumAlbums.map((album: Album) => (
              <div className={styles.albums}>
                <p data-cy="ArtistsAlbumTitle"> {album.album_title}</p>
                <Link
                  to={'album/' + encodeURIComponent(album.album_title)}
                  data-cy="LinkToAlbumPage"
                >
                  <img
                    src={album.album_art}
                    className={styles.albumCover}
                    alt={album.album_title + 'album cover'}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Artistpage
