import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

const GET_TRACK = gql`
  query GetTrack(
    $options: TrackOptions
    $where: TrackWhere
    $fulltext: TrackFulltext
  ) {
    tracks(options: $options, where: $where, fulltext: $fulltext) {
      track_title
      albumsHasTrack {
        album_title
        album_art
      }
      artistsCreatedTrack {
        artist_name
      }
    }
  }
`

export default function GetSongBySearch(
  input: string,
  offset: number,
  more: boolean,
  maxDuration: number,
  minDuration: number,
  sortingDirection: string,
  setMore: (more: boolean) => void
) {
  let options = {}

  if (sortingDirection === 'Default') {
    options = {
      limit: 5,
      offset: offset,
    }
  } else {
    options = {
      limit: 5,
      offset: offset,
      sort: [
        {
          track_title: sortingDirection,
        },
      ],
    }
  }

  const result = useQuery(GET_TRACK, {
    variables: {
      where: {
        duration_LTE: maxDuration.toString(),
        duration_GTE: minDuration.toString(),
      },
      fulltext: {
        TrackTitle: {
          phrase: input + '*',
        },
      },
      options: options,
    },
  })

  console.log(more)

  const fetchMoreTracks = () => {
    result
      .fetchMore({
        variables: {
          options: options,
        },
      })
      .then((res) => {
        console.log(res)
        setMore(false)
      })
  }
  useEffect(() => {
    if (more) {
      fetchMoreTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [more, offset, input, maxDuration, minDuration, sortingDirection]) //Eslint disabled because of warning that would cause unnecessary fetching.

  return result
}
