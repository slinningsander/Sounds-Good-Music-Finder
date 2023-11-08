import { gql, useQuery } from '@apollo/client'

const GET_ALBUM = gql`
  query GetAlbum(
    $where: AlbumWhere
    $artistsCreatedAlbumWhere2: ArtistWhere
    $options: TrackOptions
  ) {
    albums(where: $where) {
      album_title
      summary
      album_art
      artistsCreatedAlbum(where: $artistsCreatedAlbumWhere2) {
        artist_name
      }
      hasTrackTracks(options: $options) {
        track_title
        rank
        duration
      }
    }
  }
`
export default function GetAlbum(
  album_title: string | undefined,
  artist_name: string | undefined
) {
  const result = useQuery(GET_ALBUM, {
    variables: {
      where: {
        album_title: album_title,
      },
      artistsCreatedAlbumWhere2: {
        artist_name: artist_name,
      },
      options: {
        sort: [
          {
            rank: 'ASC',
          },
        ],
      },
    },
  })

  return result
}
