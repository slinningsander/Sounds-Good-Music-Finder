import { gql, useQuery } from '@apollo/client'

const GET_ALBUM_BY_TAGS_AND_SEARCH_TWO = gql`
  query GET_ALBUM_BY_TAGS_AND_SEARCH_TWO(
    $phrase: String!
    $where: AlbumFulltextWhere
  ) {
    albumsFulltextAlbumTitle(phrase: $phrase, where: $where) {
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
export default function GetAlbumBySearchAndTagTwo(
  searchInput: string,
  tagInput: string[],
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  let where = {}
  //const tagsQueryFormat = tagInput.map((tag) => (tag_name: tag ))
  const result = useQuery(GET_ALBUM_BY_TAGS_AND_SEARCH_TWO, {
    variables: {
      phrase: searchInput + '*',
      where: {
        album: {
          hasTagTags_SOME: {
            tag_name_IN: tagInput,
          },
        },
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
