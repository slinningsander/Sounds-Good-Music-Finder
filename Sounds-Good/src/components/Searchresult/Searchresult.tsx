import './Searchresult.module.css'
import BasicInfoCard from '../BasicInfoCard/BasicInfoCard.tsx'
import graduation from '../../assets/Graduation.jpeg'

export function Searchresult() {
  const CARD_AMOUNT = 10
  const resultDisplay = Array(CARD_AMOUNT)
    .fill(null)
    .map((_, index) => (
      <BasicInfoCard
        key={index}
        album={'Donda'}
        artist={'Kanye East'}
        img={graduation}
        song={'Junjoe'}
      />
    ))
  return <div className="search-container">{resultDisplay}</div>
}
export default Searchresult
