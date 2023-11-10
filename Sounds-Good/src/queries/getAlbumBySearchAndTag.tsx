import { gql, useQuery } from '@apollo/client'

const GET_ALBUM_BY_TAGS_AND_SEARCH = gql`
  query AlbumsConnection(
    $tagsConnectionWhere: [TagWhere!]
    $albumTitleStartsWith: String
  ) {
    albumsConnection(
      where: {
        hasTagTags_SOME: { OR: $tagsConnectionWhere }
        AND: { album_title_STARTS_WITH: $albumTitleStartsWith }
      }
    ) {
      edges {
        node {
          album_title
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
  const result = useQuery(GET_ALBUM_BY_TAGS_AND_SEARCH, {
    variables: {
      where: {
        album_title_STARTS_WITH: searchInput,
        hasTagTags_SOME: tagInput,
      },
      options: {
        limit: 5,
        offset: offset,
      },
    },
  })

  console.log('more search by tag', more)

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
        console.log(res)
      })
    console.log('fetching more | more search by tag |')
    console.log(result.data)
    setMore(false)
  }

  if (more) {
    fetchMoreAlbums()
  }

  return result
}
