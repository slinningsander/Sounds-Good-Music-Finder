import { gql, useQuery } from '@apollo/client'

const GET_ARTIST = gql`
  query GetArtistsBySearch($where: ArtistWhere) {
    artists(where: $where) {
      artist_name
      artist_bio
      listeners
      createdAlbumAlbums {
        album_title
        album_art
      }
    }
  }
`

export default function GetArtist(input: string) {
  const result = useQuery(GET_ARTIST, {
    variables: { where: { artist_name: input } },
  })

  return result
}
