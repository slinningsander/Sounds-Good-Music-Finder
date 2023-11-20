import { gql, useQuery } from '@apollo/client'

const GET_ALBUMS_BY_TAGS = gql`
  query AlbumsConnection($tagsConnectionWhere: [TagWhere!]) {
    albumsConnection(where: { hasTagTags_SOME: { OR: $tagsConnectionWhere } }) {
      edges {
        node {
          album_title
        }
      }
    }
  }
`
// interface TagWhere {
//   tag_name?: string
// }

export default function GetAlbumsByTags(tags: string[]) {
  const result = useQuery(GET_ALBUMS_BY_TAGS, {
    variables: { tagsConnectionWhere: tags },
  })

  return result
}
