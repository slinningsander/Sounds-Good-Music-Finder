import { gql, useQuery } from '@apollo/client'

const GET_ALBUM = gql`
  query GetAlbum($options: AlbumOptions, $where: AlbumWhere) {
    albums(options: $options, where: $where) {
      album_art
      album_title
      artistsCreatedAlbum {
        artist_name
      }
    }
  }
`

export default function GetArtist(
  input: string,
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  const result = useQuery(GET_ALBUM, {
    variables: {
      where: { album_title_STARTS_WITH: input },
      options: {
        limit: 5,
        offset: offset,
      },
    },
  })

  console.log(more)

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
    console.log('fetching more')
    console.log(result.data)
    setMore(false)
  }

  if (more) {
    fetchMoreAlbums()
  }

  return result
}
