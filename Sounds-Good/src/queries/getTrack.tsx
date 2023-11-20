import { gql, useQuery } from '@apollo/client'

const GET_TRACK = gql`
  query GetTrack($where: TrackWhere) {
    tracks(where: $where) {
      duration
      track_title
      cover_art
      albumsHasTrack {
        album_title
      }
      artistsCreatedTrack {
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
        albumsHasTrack_SINGLE: {
          album_title: album,
        },
        artistsCreatedTrack_SINGLE: {
          artist_name: artist,
        },
      },
    },
  })

  return result
}
