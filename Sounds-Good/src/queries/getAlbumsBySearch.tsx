import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_ALBUM = gql`
  query GetAlbum($options: AlbumOptions, $fulltext: AlbumFulltext) {
    albums(options: $options, fulltext: $fulltext) {
      album_art
      album_title
      artistsCreatedAlbum {
        artist_name
      }
    }
  }
`

export default function GetAlbum(
  input: string,
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  const result = useQuery(GET_ALBUM, {
    variables: {
      fulltext: {
        AlbumTitle: {
          phrase: input + '*',
        },
      },
      options: {
        limit: 5,
        offset: offset,
      },
    },
  })

  const fetchMoreAlbums = () => {
    result
      .fetchMore({
        variables: {
          options: {
            limit: 5,
            offset: offset,
          },
        },
      })
      .then((res) => {
        if (res.data.albums.length < 5) {
          // If there are no more albums to fetch, set more to false
          setMore(false)
        }
      })
  }

  // Only call fetchMoreAlbums if more is true
  useEffect(() => {
    if (more) {
      fetchMoreAlbums()
    }
  }, [more, offset, input])

  return result
}
