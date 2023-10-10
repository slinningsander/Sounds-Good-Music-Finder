import styles from './DetailedCard.module.css'

type Props = {
  title: string
  artist: string
  img: string
  length: string
  credits: string
  lyrics: string
}

const DetailedCard = ({
  title,
  artist,
  img,
  length,
  credits,
  lyrics,
}: Props) => {
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.children}>{title}</h1>
          <h2 className={styles.children}>{artist}</h2>
          <img src={img} alt={title} className={styles.image} />
          <h3 className={styles.children}>{length}</h3>
          <h3 className={styles.children}>{credits}</h3>
          <h3 className={styles.children}>Lyrics</h3>
          <p className={styles.children}>{lyrics}</p>
        </div>
      </div>
    </>
  )
}

export default DetailedCard
