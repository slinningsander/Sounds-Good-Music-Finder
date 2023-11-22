import { gql, useMutation } from '@apollo/client'

//This mutation is used to delete a comment from the database
//It will only be used for testing purposes
const DELETE_COMMENT = gql`
  mutation DeleteComments($where: CommentWhere) {
    deleteComments(where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`

export default function DeleteComment() {
  const [deleteComments, { data, loading, error }] = useMutation(
    DELETE_COMMENT,
    {
      variables: {
        where: {
          text: null,
        },
      },
    }
  )

  return { deleteComments, data, loading, error }
}
