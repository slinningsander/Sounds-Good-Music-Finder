import { useEffect, useRef, useState } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import GetAlbumBySearchAndTag from '../../graphql/queries/getAlbumBySearchAndTag'
import { useSelector } from 'react-redux'
import { Alert, Box, CircularProgress } from '@mui/material'
import { RootState } from '../../redux/store'
import { AlbumEdgeType } from '../../types'

const AlbumCardContainer = () => {
  const selectedTags = useSelector((state: RootState) => state.filterTags.value)
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  const searchInput = useSelector((state: RootState) => state.searchInput.value)
  const { data, error, loading } = GetAlbumBySearchAndTag(
    searchInput,
    selectedTags,
    offset,
    more,
    sortingDirection,
    setMore
  )
  const client = useApolloClient()

  const prevSrchInpRef = useRef<string | null>(null)

  useEffect(() => {
    if (prevSrchInpRef.current !== searchInput) {
      client.resetStore()
      setOffset(0)
    }
    prevSrchInpRef.current = searchInput
  }, [client, searchInput, selectedTags, sortingDirection])

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
          {data.albumsFulltextAlbumTitle.map((edge: AlbumEdgeType) => (
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
