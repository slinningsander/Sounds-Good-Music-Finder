import { gql, useQuery } from '@apollo/client'

const GET_ARTIST = gql`
  query GetArtist($options: ArtistOptions, $where: ArtistWhere) {
    artists(options: $options, where: $where) {
      artist_name
    }
  }
`

export default function GetArtist(
  input: string,
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  const result = useQuery(GET_ARTIST, {
    variables: {
      where: { artist_name_STARTS_WITH: input },
      options: {
        limit: 5,
        offset: offset,
      },
    },
  })

  console.log(more)
  const fetchMoreArtists = () => {
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
    fetchMoreArtists()
  }

  return result
}
