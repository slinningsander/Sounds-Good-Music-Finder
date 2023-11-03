import { gql, useQuery } from '@apollo/client'

const GET_TRACKS_BY_SEARCH = gql`
  query GetTracksBySearch($where: TrackWhere) {
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

export default function GetTracksBySearch(input: string, offset: number) {
  const result = useQuery(GET_TRACKS_BY_SEARCH, {
    variables: {
      where: { track_title_STARTS_WITH: input },
      offset: { offset },
      limit: { limit: 10 },
    },
  })

  return result
}
