import { useLocation } from 'react-router-dom'
import DetailedCard from '../../components/DetailedCard/DetailedCard'
import { CommentsContainer } from '../../components/CommentsContainer/CommentsContainer'
import './Detailspage.css'
import Page from '../../components/Page/Page'

const Detailspage = () => {
  const location = useLocation()
  return (
    <>
      <Page>
        <div className="container">
          <DetailedCard
            title={location.state.title}
            artist={location.state.artist}
            img={location.state.img}
            length={location.state.length}
            credits={location.state.credits}
            lyrics={location.state.lyrics}
          />
          <CommentsContainer />
        </div>
      </Page>
    </>
  )
}

export default Detailspage
