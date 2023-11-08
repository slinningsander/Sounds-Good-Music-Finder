// import Search from '../../components/Search/Search.tsx'
import Searchbar from '../../components/Search/subcomponents/Searchbar/Searchbar.tsx'
export default function Homepage() {
  return (
    <>
      <h1>This is the Homepage!</h1>
      <Searchbar
        searchbarName="homePageSearch"
        isRequired={true}
        placeholder="Drake"
        labelValue="Search"
        ariaLabel="Searchbar"
      />
    </>
  )
}
