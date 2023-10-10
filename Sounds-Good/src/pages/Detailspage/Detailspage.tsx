import { useLocation } from "react-router-dom";
import DetailedCard from "../../components/DetailedCard/DetailedCard";


const Detailspage = () => {
    const location = useLocation();
    return (
        <>
            <DetailedCard
            title={location.state.title}
            artist={location.state.artist}
            img={location.state.img}
            length={location.state.length}
            credits={location.state.credits}
            lyrics={location.state.lyrics} />
        </>
    )
}

export default Detailspage;