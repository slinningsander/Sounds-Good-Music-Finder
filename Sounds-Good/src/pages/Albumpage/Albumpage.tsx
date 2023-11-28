import { Link } from 'react-router-dom'
import GetAlbum from '../../graphql/queries/getAlbum'
import styles from './Albumpage.module.css'
import Page from '../../components/Page/Page'
import formatDuration from '../../utils/formatDuration'
import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'
import BackIcon from '../../assets/icons/arrow-left.svg'

type trackProps = {
  track_title: string
  duration: number
  rank: number
}

const Albumpage = () => {
  const url = new URL(window.location.href)
  const album_title = url.pathname.split('/').pop()
  const artist_name = url.pathname.split('/')[2]
  const decodedArtistName = decodeURIComponent(artist_name || '')
  const decodedAlbumTitle = decodeURIComponent(album_title || '')
  const client = useApolloClient()

  useEffect(() => {
    client.resetStore()
  }, [client])

  const { data, loading, error } = GetAlbum(
    decodedAlbumTitle,
    decodedArtistName
  )
  const sanitizedSummary = data?.albums[0].summary.replace(
    /<a\b[^>]*>.*?<\/a>/g,
    '...'
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <>
      <Page>
        <div className={styles.container}>
          <div className={styles.albumDetailCard} data-cy="AlbumPageContainer">
            <img
              src={BackIcon}
              className={styles.goBackButton}
              onClick={() => window.history.back()}
              alt="Go back"
            />
            <div className={styles.infoContainer}>
              <h1 data-cy="AlbumTitleHeader">{data.albums[0].album_title}</h1>
              <h2 data-cy="AlbumArtistHeader">
                {data.albums[0].artistsCreatedAlbum[0].artist_name}
              </h2>
              <img
                className={styles.albumArt}
                src={data.albums[0].album_art}
                alt="Album art"
                data-cy="AlbumArt"
              />
              <h2>Summary</h2>
              <p className={styles.bio} data-cy="AlbumSummary">
                {sanitizedSummary}
              </p>
            </div>
            <div className={styles.trackListContainer}>
              <h2 className={styles.trackHeading}>Tracks</h2>
              <div
                className={styles.albumContainer}
                data-cy="AlbumSongsContainer"
              >
                {data.albums[0].hasTrackTracks.map((track: trackProps) => (
                  <div className={styles.track}>
                    <Link
                      className={styles.link}
                      to={'song/' + encodeURIComponent(track.track_title)}
                      data-cy="LinkToSong"
                    >
                      {track.rank}. {track.track_title}{' '}
                      {formatDuration(track.duration)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  )
}

export default Albumpage
