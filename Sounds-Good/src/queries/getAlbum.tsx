import { gql, useQuery } from '@apollo/client'

const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    albums(where: $where) {
      album_title
      album_art
      artistsCreatedAlbum {
        artist_name
      }
      tracksOnAlbum {
        track_title
        rank
        duration
      }
    }
  }
`
export default function GetAlbum(input: string) {
  const result = useQuery(GET_ALBUM, {
    variables: { where: { album_title: input } },
  })

  return result
}
