import { Link } from 'react-router-dom'
import styles from './SongDetailsComponent.module.css'

type Props = {
  title: string
  artist: string
  img: string
  length: string
  album: string
}

const SongDetailsComponent = ({ title, artist, img, length, album }: Props) => {
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.header} data-cy="SongTitleHeader">
            {title}
          </h1>
          <Link
            className={styles.linkContainer}
            to={'/project2/' + encodeURIComponent(artist)}
            data-cy="LinkToArtistFromSong"
          >
            <h2 className={styles.header}>{artist}</h2>
          </Link>
          <Link
            className={styles.linkContainer}
            to={
              '/project2/' +
              encodeURIComponent(artist) +
              '/album/' +
              encodeURIComponent(album)
            }
            data-cy="LinkToAlbumFromSong"
          >
            <h3 className={styles.header}>{album}</h3>
          </Link>
          <img
            src={img}
            alt={title}
            className={styles.image}
            data-cy="SongAlbumImage"
          />
          <h3 className={styles.header} data-cy="SongLength">
            {length}
          </h3>
        </div>
      </div>
    </>
  )
}

export default SongDetailsComponent
