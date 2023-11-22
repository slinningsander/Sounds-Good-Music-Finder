import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_ARTIST = gql`
  query GetArtist(
    $options: ArtistOptions
    $where: ArtistWhere
    $fulltext: ArtistFulltext
  ) {
    artists(options: $options, where: $where, fulltext: $fulltext) {
      artist_name
    }
  }
`

export default function GetArtist(
  input: string,
  offset: number,
  more: boolean,
  maxListeners: number,
  minListeners: number,
  setMore: (more: boolean) => void
) {
  let where = {}

  if (maxListeners && minListeners) {
    where = {
      listeners_LTE: maxListeners.toString(),
      listeners_GTE: minListeners.toString(),
    }
  }
  const result = useQuery(GET_ARTIST, {
    variables: {
      where: where,
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
      .then(() => {
        //res
        setMore(false)
      })
  }

  useEffect(() => {
    if (more) {
      fetchMoreArtists()
    }
  }, [more, offset, input, maxListeners, minListeners])

  return result
}
