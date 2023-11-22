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
  const formattedTags = tags.map((tag) => {
    return { tag_name: tag }
  })
  const result = useQuery(GET_ALBUMS_BY_TAGS, {
    variables: { tagsConnectionWhere: formattedTags },
  })

  return result
}
