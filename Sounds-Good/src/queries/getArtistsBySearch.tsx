import { gql, useQuery } from '@apollo/client'

const GET_ARTISTS_BY_SEARCH = gql`
  query GetArtistsBySearch($where: ArtistWhere) {
    artists(where: $where) {
      artist_name
    }
  }
`

export default function GetArtistBySearch(input: string, offset: number) {
  const result = useQuery(GET_ARTISTS_BY_SEARCH, {
    variables: {
      where: { artist_name_STARTS_WITH: input },
      offset: { offset },
      limit: { limit: 10 },
    },
  })

  return result
}
