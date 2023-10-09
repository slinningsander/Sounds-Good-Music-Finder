import { Card, CardContent, Typography } from '@mui/material'
import './BasicInfoCard.css'

type Props = {
  song: string
  artist: string
  album: string
  img: string
}

export default function BasicInfoCard(props: Props) {
  return (
    <div className="wrapper">
      <Card variant="outlined" sx={{ width: 1, backgroundColor: 'white' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <img className="albumCover" src={props.img} alt="Album cover" />
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
