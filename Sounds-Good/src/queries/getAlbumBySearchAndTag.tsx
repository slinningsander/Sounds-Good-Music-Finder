import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_ALBUM_BY_TAGS_AND_SEARCH = gql`
  query GET_ALBUM_BY_TAGS_AND_SEARCH_TWO(
    $limit: Int
    $offset: Int
    $phrase: String!
    $where: AlbumFulltextWhere
  ) {
    albumsFulltextAlbumTitle(
      limit: $limit
      offset: $offset
      phrase: $phrase
      where: $where
    ) {
      album {
        album_title
        album_art
        artistsCreatedAlbum {
          artist_name
        }
      }
    }
  }
`
export default function GetAlbumBySearchAndTag(
  searchInput: string,
  tagInput: string[],
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  let where = {}

  if (tagInput.length > 0) {
    where = {
      album: {
        hasTagTags_SOME: {
          tag_name_IN: tagInput,
        },
      },
    }
  }

  const result = useQuery(GET_ALBUM_BY_TAGS_AND_SEARCH, {
    variables: {
      phrase: searchInput + '*',
      where: where,
      limit: 5,
      offset: offset,
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
        setMore(false)
      })
  }
  useEffect(() => {
    if (more) {
      fetchMoreAlbums()
    }
  }, [more, offset, searchInput])

  return result
}
