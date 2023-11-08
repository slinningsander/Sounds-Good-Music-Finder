import { gql, useQuery } from '@apollo/client'

const GET_TRACK = gql`
  query GetTrack($options: TrackOptions, $where: TrackWhere) {
    tracks(options: $options, where: $where) {
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

export default function GetArtist(
  input: string,
  offset: number,
  more: boolean,
  setMore: (more: boolean) => void
) {
  const result = useQuery(GET_TRACK, {
    variables: {
      where: { track_title_STARTS_WITH: input },
      options: {
        limit: 5,
        offset: offset,
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
