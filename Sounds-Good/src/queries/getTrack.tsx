import { gql, useQuery } from '@apollo/client'

const GET_TRACK = gql`
  query GetTrack($where: TrackWhere) {
    tracks(where: $where) {
      cover_art
      track_title
      albumsHasTrack {
        album_title
      }
      artistsCreatedTrack {
        artist_name
      }
    }
  }
`

export default function GetArtist(input: string, offset: number) {
  const result = useQuery(GET_TRACK, {
    variables: {
      where: { track_title_STARTS_WITH: input },
      offset: { offset },
      limit: { limit: 10 },
    },
  })

  return result
}
