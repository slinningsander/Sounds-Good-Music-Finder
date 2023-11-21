import { useEffect, useState } from 'react'
//import GetAlbumBySearch from '../../queries/getAlbumsBySearch'
import AlbumCard from '../AlbumCard/AlbumCard'
import styles from './AlbumCardContainer.module.css'
import { useApolloClient } from '@apollo/client'
import GetAlbumBySearchAndTagTwo from '../../queries/getAlbumBySearchAndTagTwo'
import { useSelector } from 'react-redux'
type AlbumCardContainerProps = {
  input: string
}

const AlbumCardContainer = ({ input }: AlbumCardContainerProps) => {
  const selectedTags = useSelector((state) => state.filterTags.value)
  const [offset, setOffset] = useState(0)
  const [more, setMore] = useState(false)
  // const { data, error, loading } = GetAlbumBySearch(
  //   input,
  //   offset,
  //   more,
  //   setMore
  // )
  const { data, error, loading } = GetAlbumBySearchAndTagTwo(
    input,
    selectedTags,
    offset,
    more,
    setMore
  )
  const client = useApolloClient()

  if (loading) {
    console.log(loading)
  } else if (error) {
    console.log('ERROR: ' + error)
  } else {
    console.log(data.albumsFulltextAlbumTitle)

    console.log()
  }
  // useEffect(() => {
  //   client.resetStore()
  //   if (loading) {
  //     console.log('loading')
  //   } else if (error) {
  //     console.log(error)
  //   } else {
  //     console.log(data.albums)
  //     setOffset(0)
  //   }
  // }, [input])

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data ? (
        data.albumsFulltextAlbumTitle.map((edge) => (
          <div key={edge.album.album_title}>
            {' '}
            {/* Use edge.node for accessing album details */}
            <AlbumCard
              album={edge.album.album_title}
              artist={edge.album.artistsCreatedAlbum[0].artist_name}
              img={edge.album.album_art}
            />
          </div>
        ))
      ) : (
        <div>No albums found</div>
      )}

      {data &&
        data.albumsConnection &&
        data.albumsConnection.edges &&
        data.albumsConnection.edges.length > 0 && (
          <button
            onClick={() => {
              setMore(true)
              setOffset(data.albumsConnection.edges.length)
            }}
            className={styles.button}
          >
            Show More
          </button>
        )}
    </div>
    //   <div className={styles.wrapper}>
    //     {loading ? (
    //       <div>Loading...</div> // Show loading state
    //     ) : error ? (
    //       <div>Error: {error.message}</div> // Show error message
    //     ) : data && data.albums ? ( // Check if data and data.albums are defined
    //       data.albums.map((album) => (
    //         <div key={album.album_title}>
    //           {' '}
    //           {/* Add a key here for each album */}
    //           <AlbumCard
    //             album={album.album_title}
    //             artist={album.artistsCreatedAlbum[0].artist_name}
    //             img={album.album_art}
    //           />
    //         </div>
    //       ))
    //     ) : (
    //       <div>No albums found</div> // Show a message if no albums are found
    //     )}

    //     {data && data.albums && data.albums.length > 0 && (
    //       <button
    //         onClick={() => {
    //           setMore(true)
    //           setOffset(data.albums.length)
    //         }}
    //         className={styles.button}
    //       >
    //         Show More
    //       </button>
    //     )}
    //   </div>
    // )
  )
}
export default AlbumCardContainer
