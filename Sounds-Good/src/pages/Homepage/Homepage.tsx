import { Searchbar } from '../../components/Searchbar/Searchbar'
import { Searchresult } from '../../components/Searchresult/Searchresult.tsx'
export default function Homepage() {
  return (
    <>
      <h1>This is the Homepage!</h1>
      <Searchbar
        isRequired={true}
        searchbarName="searchbarHome"
        labelValue="Search music. Do it!"
        placeholder="Dancing Que..."
        ariaLabel="Search for music result"
      />
      <Searchresult />
    </>
  )
}
