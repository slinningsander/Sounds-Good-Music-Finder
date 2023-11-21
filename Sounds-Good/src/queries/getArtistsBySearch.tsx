import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_ARTIST = gql`
  query GetArtist($options: ArtistOptions, $fulltext: ArtistFulltext) {
    artists(options: $options, fulltext: $fulltext) {
      artist_name
    }
  }
`

export default function GetArtist(
  input: string,
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  const result = useQuery(GET_ARTIST, {
    variables: {
      fulltext: {
        ArtistName: {
          phrase: input + '*',
        },
      },
      options: {
        limit: 5,
        offset: offset,
      },
    },
  })

  console.log(more)
  const fetchMoreArtists = () => {
    result
      .fetchMore({
        variables: {
          options: {
            limit: 5,
            offset: offset,
          },
        },
      })
      .then((res) => {
        setMore(false)
      })
  }

  useEffect(() => {
    if (more) {
      fetchMoreArtists()
    }
  }, [more, offset, input])

  return result
}
