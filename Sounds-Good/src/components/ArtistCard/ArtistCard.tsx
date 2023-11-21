import styles from './ArtistCard.module.css'
import { Link, useNavigate } from 'react-router-dom'

type ArtistCardProps = {
  artistName: string
}

const ArtistCard = ({ artistName }: ArtistCardProps) => {
  const navigate = useNavigate()

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
