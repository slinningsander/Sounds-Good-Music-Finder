import { gql } from '@apollo/client'

//This mutation is used to delete a comment from the database
//It will only be used for testing purposes
export const DELETE_COMMENT = gql`
  mutation DeleteComments($where: CommentWhere) {
    deleteComments(where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
