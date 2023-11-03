import { gql, useQuery } from '@apollo/client'

const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    albums(where: $where) {
      album_art
      album_title
      artistsCreatedAlbum {
        artist_name
      }
    }
  }
`

export default function GetArtist(input: string) {
  const result = useQuery(GET_ALBUM, {
    variables: { where: { track_title_STARTS_WITH: input } },
  })

  return result
}
