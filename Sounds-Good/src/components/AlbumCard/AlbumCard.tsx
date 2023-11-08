import { Card, CardContent, Typography } from '@mui/material'
import styles from './AlbumCard.module.css'
import { useNavigate } from 'react-router-dom'

type Props = {
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
            encodeURIComponent(props.album),
          {
            state: {
              artist: props.artist,
              album: props.album,
              img: props.img,
              length: '3:57',
              credits: 'Kanye West, Eric Hudson',
              lyrics: 'Flashing Lights',
            },
          }
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
            <Typography sx={{ mb: 1 }} variant="h6" component="div">
              {props.album}
            </Typography>
            <Typography color="text.secondary">{props.artist}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
