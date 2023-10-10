import "./DetailedCard.css";

type Props = {
  title: string;
  artist: string;
  img: string;
  length: string;
  credits: string;
  lyrics: string;
};

const DetailedCard= ({title, artist, img, length, credits, lyrics}: Props) => {
  return (
    <div style={{justifyContent: "center", alignItems:"center", display:"flex"}}>
      <div className="container">
        <h1 className="title">{title}</h1>
        <h2>{artist}</h2>
        <img src={img} alt={title} />
        <h3>{length}</h3>
        <h3>{credits}</h3>
        <h3>Lyrics</h3>
        <p>{lyrics}</p>
      </div>
    </div>
  );
};


export default DetailedCard;
