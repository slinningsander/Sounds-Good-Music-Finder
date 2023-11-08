import { gql, useQuery } from '@apollo/client'

const GET_TRACK = gql`
  query GetTrack(
    $where: TrackWhere
    $albumsHasTrackWhere2: AlbumWhere
    $artistsCreatedTrackWhere2: ArtistWhere
  ) {
    tracks(where: $where) {
      duration
      track_title
      cover_art
      albumsHasTrack(where: $albumsHasTrackWhere2) {
        album_title
      }
      artistsCreatedTrack(where: $artistsCreatedTrackWhere2) {
        artist_name
      }
    }
  }
`

export default function GetTrack(track: string, artist: string, album: string) {
  const result = useQuery(GET_TRACK, {
    variables: {
      where: {
        track_title: track,
      },
      albumsHasTrackWhere2: {
        album_title: album,
      },
      artistsCreatedTrackWhere2: {
        artist_name: artist,
      },
    },
  })

  return result
}
