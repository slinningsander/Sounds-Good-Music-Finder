import { gql, useQuery } from '@apollo/client'

const GET_ALBUMS_BY_SEARCH = gql`
  query GetAlbumsBySearch($where: AlbumWhere) {
    albums(where: $where) {
      album_art
      album_title
      artistsCreatedAlbum {
        artist_name
      }
    }
  }
`

export default function GetAlbumsBySearch(input: string) {
  const result = useQuery(GET_ALBUMS_BY_SEARCH, {
    variables: { where: { track_title_STARTS_WITH: input } },
  })

  return result
}
