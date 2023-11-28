import styles from './ArtistCard.module.css'
import { Link } from 'react-router-dom'

type ArtistCardProps = {
  artistName: string
  listeners: number
}

const ArtistCard = ({ artistName, listeners }: ArtistCardProps) => {
  return (
    <Link
      className={styles.container}
      to={'/project2/' + encodeURIComponent(artistName)}
    >
      <h3 className={styles.text}>{artistName}</h3>
      <p className={styles.text}>LastFM listeners: {listeners}</p>
    </Link>
  )
}

export default ArtistCard
