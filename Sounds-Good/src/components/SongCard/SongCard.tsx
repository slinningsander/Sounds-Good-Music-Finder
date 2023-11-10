import { Card, CardContent, Typography } from '@mui/material'
import styles from './SongCard.module.css'
import { useNavigate } from 'react-router-dom'

type Props = {
  song: string
  artist: string
  album: string
  img: string
}

export default function BasicInfoCard(props: Props) {
  const navigate = useNavigate()
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        navigate(
          '/project2/' +
            encodeURIComponent(props.artist) +
            '/album/' +
            encodeURIComponent(props.album) +
            '/song/' +
            encodeURIComponent(props.song)
        )
      }}
    >
      <Card
        variant="outlined"
        sx={{ width: 1, backgroundColor: 'white', cursor: 'pointer' }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <img
            className={styles.albumCover}
            src={props.img}
            alt="Album cover"
          />
          <div>
            <Typography variant="h6" component="div">
              {props.song}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.artist}
            </Typography>
            <Typography variant="body2">{props.album}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
