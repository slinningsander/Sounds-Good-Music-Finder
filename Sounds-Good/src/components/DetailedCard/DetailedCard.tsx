import { useNavigate } from 'react-router-dom'
import styles from './DetailedCard.module.css'

type Props = {
  title: string
  artist: string
  img: string
  length: string
  album: string
}

const DetailedCard = ({ title, artist, img, length, album }: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.children}>{title}</h1>
          <div
            className={styles.linkContainer}
            onClick={() => navigate('/project2/' + encodeURIComponent(artist))}
          >
            <h2 className={styles.children}>{artist}</h2>
          </div>
          <div
            onClick={() =>
              navigate(
                '/project2/' +
                  encodeURIComponent(artist) +
                  '/album/' +
                  encodeURIComponent(album)
              )
            }
            className={styles.linkContainer}
          >
            <h3 className={styles.children}>{album}</h3>
          </div>
          <img src={img} alt={title} className={styles.image} />
          <h3 className={styles.children}>{length}</h3>
        </div>
      </div>
    </>
  )
}

export default DetailedCard
