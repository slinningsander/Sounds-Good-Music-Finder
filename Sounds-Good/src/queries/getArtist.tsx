import { gql, useQuery } from '@apollo/client'

const GET_ARTIST = gql`
  query GetArtist($where: ArtistWhere) {
    artists(where: $where) {
      artist_name
    }
  }
`

export default function GetArtist(input: string, offset: number) {
  const result = useQuery(GET_ARTIST, {
    variables: {
      where: { artist_name_STARTS_WITH: input },
      offset: { offset },
      limit: { limit: 10 },
    },
  })

  return result
}
