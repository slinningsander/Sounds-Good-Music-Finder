import { useEffect, useState } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import GetAlbumBySearchAndTagTwo from '../../queries/getAlbumBySearchAndTag'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'

type AlbumCardContainerProps = {
  input: string
}

const AlbumCardContainer = ({ input }: AlbumCardContainerProps) => {
  const selectedTags = useSelector((state) => state.filterTags.value)
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetAlbumBySearchAndTagTwo(
    input,
    selectedTags,
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
      setOffset(0)
    }
  }, [input, selectedTags])

  return (
    <div className={styles.wrapper}>
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
      ) : data.albumsFulltextAlbumTitle.length > 0 ? (
        data.albumsFulltextAlbumTitle.map((edge) => (
          <div key={edge.album.album_title}>
            <AlbumCard
              album={edge.album.album_title}
              artist={edge.album.artistsCreatedAlbum[0].artist_name}
              img={edge.album.album_art}
            />
          </div>
        ))
      ) : (
        <Alert severity="info">No albums found :/</Alert>
      )}

      {data && data.albumsFulltextAlbumTitle.length == offset + 5 && (
        <button
          onClick={() => {
            setMore(true)
            setOffset(data.albumsFulltextAlbumTitle.length)
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
