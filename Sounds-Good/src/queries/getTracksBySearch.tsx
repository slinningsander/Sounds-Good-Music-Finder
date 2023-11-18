import { gql, useQuery } from '@apollo/client'

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
      options: {
        limit: 5,
        offset: offset,
        sort: [
          {
            track_title: sortingDirection,
          },
        ],
      },
    },
  })

  console.log(more)

  const fetchMoreTracks = () => {
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
        console.log(res)
      })
    console.log('fetching more')
    console.log(result.data)
    setMore(false)
  }

  if (more) {
    fetchMoreTracks()
  }

  return result
}
