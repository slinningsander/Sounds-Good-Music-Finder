import { gql, useMutation } from '@apollo/client'
import { GET_COMMENTS } from '../queries/getComments'

const CREATE_COMMENT = gql`
  mutation CreateComment($input: [CommentCreateInput!]!) {
    createComments(input: $input) {
      comments {
        text
      }
    }
  }
`
export default function CreateComment(
  text: string | undefined,
  track_title: string | undefined,
  album_title: string | undefined,
  artist_name: string | undefined
) {
  const [createComments, { data, loading, error }] = useMutation(
    CREATE_COMMENT,
    {
      refetchQueries: [GET_COMMENTS, 'Comments'],
      variables: {
        input: [
          {
            text: text,
            commentedOnTrack: {
              connect: [
                {
                  where: {
                    node: {
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
              ],
            },
          },
        ],
      },
    }
  )

  return { createComments, data, loading, error }
}
