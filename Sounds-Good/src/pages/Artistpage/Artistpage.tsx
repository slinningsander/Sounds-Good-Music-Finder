import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './Artistpage.module.css'
import Page from '../../components/Page/Page'

interface Album {
  img: string
  title: string
}

interface Artist {
  name: string
  bio: string
  albums: Album[]
}

const Artistpage = () => {
  const { artistId } = useParams<{ artistId: string }>()

  // Replace with actual artist data
  const artist: Artist = {
    name: 'The Beatles',
    bio: 'The Beatles were an English rock band formed in Liverpool in 1960. With a line-up comprising John Lennon, Paul McCartney, George Harrison and Ringo Starr, they are regarded as the most influential band of all time.',
    albums: [
      {
        title: 'Please Please Me',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: 'With the Beatles',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: "A Hard Day's Night",
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: 'Beatles for Sale',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: 'Help!',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: 'Rubber Soul',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      {
        title: 'Revolver',
        img: '//upload.wikimedia.org/wikipedia/commons/thumb/3/33/Are_You_Experienced_-_US_cover-edit.jpg/1920px-Are_You_Experienced_-_US_cover-edit.jpg',
      },
      { title: "Sgt. Pepper's Lonely Hearts Club Band", img: 1967 },
      { title: 'Magical Mystery Tour', img: 1967 },
      { title: 'The Beatles (White Album)', img: 1968 },
      { title: 'Yellow Submarine', img: 1969 },
      { title: 'Abbey Road', img: 1969 },
      { title: 'Let It Be', img: 1970 },
    ],
  }

  return (
    <>
      <Page>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <h1>{artist.name}</h1>
            <p className={styles.bio}>{artist.bio}</p>
          </div>
          <h2>Albums</h2>
          <div className={styles.albumContainer}>
            {artist.albums.map((album, index) => (
              <div key={index} className={styles.albums}>
                <p> {album.title}</p>
                <img src={album.img} className={styles.albumCover} />
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Artistpage
