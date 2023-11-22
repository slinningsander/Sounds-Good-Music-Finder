import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_ALBUM_BY_TAGS_AND_SEARCH = gql`
  query GET_ALBUM_BY_TAGS_AND_SEARCH_TWO(
    $limit: Int
    $offset: Int
    $phrase: String!
    $where: AlbumFulltextWhere
    $sort: [AlbumFulltextSort!]
  ) {
    albumsFulltextAlbumTitle(
      limit: $limit
      offset: $offset
      phrase: $phrase
      where: $where
      sort: $sort
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
  sortingDirection: string,
  setMore: (more: boolean) => void
) {
  let where = {}
  let variables = {}

  if (tagInput.length > 0) {
    where = {
      album: {
        hasTagTags_SOME: {
          tag_name_IN: tagInput,
        },
      },
    }
  }

  if (sortingDirection === 'Default') {
    variables = {
      where: where,
      phrase: searchInput + '*',
      limit: 5,
      offset: offset,
    }
  } else {
    variables = {
      where: where,
      phrase: searchInput + '*',
      limit: 5,
      offset: offset,
      sort: [
        {
          album: {
            album_title: sortingDirection,
          },
        },
      ],
    }
  }

  const result = useQuery(GET_ALBUM_BY_TAGS_AND_SEARCH, {
    variables: variables,
  })

  const fetchMoreAlbums = () => {
    result
      .fetchMore({
        variables: variables,
      })
      .then(() => {
        setMore(false)
      })
  }
  useEffect(() => {
    if (more) {
      fetchMoreAlbums()
    }
  }, [more, offset, searchInput, sortingDirection])

  return result
}
