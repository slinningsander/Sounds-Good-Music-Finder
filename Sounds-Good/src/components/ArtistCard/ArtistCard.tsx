import './ArtistCard.module.css'

type ArtistCardProps = {
  artistName: string
}

const ArtistCard = ({ artistName }: ArtistCardProps) => {
  return (
    <div className="container">
      <h3>{artistName}</h3>
    </div>
  )
}

export default ArtistCard
