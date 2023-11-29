import { Card, CardContent, Typography } from '@mui/material'
import styles from './SongCard.module.css'
import { Link } from 'react-router-dom'
import formatDuration from '../../utils/formatDuration'

type Props = {
  song: string
  artist: string
  album: string
  img: string
  tracklength: number
}

export default function BasicInfoCard(props: Props) {
  return (
    <Link
      className={styles.container}
      to={
        '/project2/' +
        encodeURIComponent(props.artist) +
        '/album/' +
        encodeURIComponent(props.album) +
        '/song/' +
        encodeURIComponent(props.song)
      }
    >
      <Card
        variant="outlined"
        sx={{ width: 1, backgroundColor: '#1D267D', cursor: 'pointer' }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <img
            className={styles.albumCover}
            src={props.img}
            alt={props.album + ' album cover'}
          />
          <div>
            <Typography variant="h6" component="div" color="white">
              {props.song}
              {props.tracklength != 0 &&
                ' ' + '(' + formatDuration(props.tracklength) + ')'}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white">
              {props.artist}
            </Typography>
            <Typography variant="body2" color="white">
              {props.album}{' '}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
