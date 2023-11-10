import styles from './ArtistCard.module.css'
import { useNavigate } from 'react-router-dom'

type ArtistCardProps = {
  artistName: string
}

const ArtistCard = ({ artistName }: ArtistCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={styles.container}
      onClick={() => navigate('/project2/' + encodeURIComponent(artistName))}
    >
      <h3>{artistName}</h3>
    </div>
  )
}

export default ArtistCard
