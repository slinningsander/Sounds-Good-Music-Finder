import { useEffect, useState } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import GetAlbumBySearchAndTagTwo from '../../graphql/queries/getAlbumBySearchAndTag'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'

type AlbumCardContainerProps = {
  input: string
}

const AlbumCardContainer = ({ input }: AlbumCardContainerProps) => {
  const selectedTags = useSelector((state) => state.filterTags.value)
  const sortingDirection = useSelector((state) => state.sortingDirection.value)
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const { data, error, loading } = GetAlbumBySearchAndTagTwo(
    input,
    selectedTags,
    offset,
    more,
    sortingDirection,
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
  }, [input, selectedTags, sortingDirection])

  return (
    <div className={styles.wrapper} data-cy="AlbumsContainer">
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
        <div data-cy="DivForTest">
          {data.albumsFulltextAlbumTitle.map((edge) => (
            <div key={edge.album.album_title} className={styles.childWrapper}>
              <AlbumCard
                album={edge.album.album_title}
                artist={edge.album.artistsCreatedAlbum[0].artist_name}
                img={edge.album.album_art}
              />
            </div>
          ))}
        </div>
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
          data-cy="ShowMoreButton"
        >
          Show More
        </button>
      )}
    </div>
  )
}
export default AlbumCardContainer
