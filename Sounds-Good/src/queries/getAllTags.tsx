import { gql, useQuery } from '@apollo/client'

const GET_ALL_TAGS = gql`
  query ExampleQuery {
    tags {
      tag_name
    }
  }
`

export default function GetAllTags() {
  const result = useQuery(GET_ALL_TAGS, {})
  return result
}
