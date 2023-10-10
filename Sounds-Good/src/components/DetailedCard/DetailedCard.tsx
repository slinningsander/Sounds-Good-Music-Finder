import './DetailedCard.css'

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
      <div className="contentWrapper">
        <div className="contentContainer">
          <h1 className="children">{title}</h1>
          <h2 className="children">{artist}</h2>
          <img src={img} alt={title} className="image" />
          <h3 className="children">{length}</h3>
          <h3 className="children">{credits}</h3>
          <h3 className="children">Lyrics</h3>
          <p className="children">{lyrics}</p>
        </div>
      </div>
    </>
  )
}

export default DetailedCard
