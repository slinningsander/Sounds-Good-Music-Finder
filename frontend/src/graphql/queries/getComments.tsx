import { gql, useQuery } from '@apollo/client'

// eslint-disable-next-line react-refresh/only-export-components
export const GET_COMMENTS = gql`
  query Comments($where: CommentWhere) {
    comments(where: $where) {
      text
    }
  }
`
export default function GetComments(
  track_title: string | undefined,
  album_title: string | undefined,
  artist_name: string | undefined
) {
  const result = useQuery(GET_COMMENTS, {
    variables: {
      where: {
        commentedOnTrack_SINGLE: {
          track_title: track_title,
          artistsCreatedTrack_SINGLE: {
            artist_name: artist_name,
          },
          albumsHasTrack_SINGLE: {
            album_title: album_title,
          },
        },
      },
    },
  })

  return result
}
