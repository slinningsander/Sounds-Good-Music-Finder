import BasicInfoCard from '../../../BasicInfoCard/BasicInfoCard.tsx'
import graduation from '../../assets/Graduation.jpeg'

type SearchresultProps = {
  isVisible: boolean
}
export function Searchresult({ isVisible }: SearchresultProps) {
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
  return (
    isVisible && (
      <>
        <div>{resultDisplay}</div>
      </>
    )
  )
}

export default Searchresult
