import { Card, CardContent, Typography } from '@mui/material'
import styles from './AlbumCard.module.css'
import { Link } from 'react-router-dom'

type Props = {
  artist: string
  album: string
  img: string
}

export default function BasicInfoCard(props: Props) {
  return (
    <Link
      className={styles.container}
      to={
        '/project2/' +
        encodeURIComponent(props.artist) +
        '/album/' +
        encodeURIComponent(props.album)
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
            <Typography
              sx={{ mb: 1 }}
              variant="h6"
              component="div"
              color="white"
            >
              {props.album}
            </Typography>
            <Typography color="white">{props.artist}</Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
