import styles from './ArtistCard.module.css'
import { Link } from 'react-router-dom'

type ArtistCardProps = {
  artistName: string
}

const ArtistCard = ({ artistName }: ArtistCardProps) => {
  return (
    <Link
      className={styles.container}
      to={'/project2/' + encodeURIComponent(artistName)}
    >
      <h3>{artistName}</h3>
    </Link>
  )
}

export default ArtistCard
