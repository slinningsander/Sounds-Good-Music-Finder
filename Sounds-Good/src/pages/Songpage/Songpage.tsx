import DetailedCard from '../../components/DetailedCard/DetailedCard'
import { CommentsContainer } from '../../components/CommentsContainer/CommentsContainer'
import styles from './Songpage.module.css'
import Page from '../../components/Page/Page'
import GetTrack from '../../queries/getTrack'
import formatDuration from '../../utils/formatDuration'
import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'

const Songpage = () => {
  const url = new URL(window.location.href)
  const song_title = url.pathname.split('/').pop()
  const album_title = url.pathname.split('/')[4]
  const artist_name = url.pathname.split('/')[2]
  const decodedArtistName = decodeURIComponent(artist_name || '')
  const decodedAlbumTitle = decodeURIComponent(album_title || '')
  const decodedSongTitle = decodeURIComponent(song_title || '')
  const { data, loading, error } = GetTrack(
    decodedSongTitle,
    decodedArtistName,
    decodedAlbumTitle
  )
  const client = useApolloClient()
  useEffect(() => {
    client.resetStore()
  }, [client])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <>
      <Page>
        <div className={styles.container}>
          <DetailedCard
            title={data.tracks[0].track_title}
            artist={data.tracks[0].artistsCreatedTrack[0].artist_name}
            img={data.tracks[0].cover_art}
            length={formatDuration(data.tracks[0].duration)}
            album={data.tracks[0].albumsHasTrack[0].album_title}
          />
          <CommentsContainer />
        </div>
      </Page>
    </>
  )
}

export default Songpage
