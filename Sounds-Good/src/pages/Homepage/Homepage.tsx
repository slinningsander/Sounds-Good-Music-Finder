import { useEffect, useState } from 'react'
import Searchbar from '../../components/Search/subcomponents/Searchbar/Searchbar.tsx'
import SongCardContainer from '../../components/SongCardContainer/SongCardContainer.tsx'
export default function Homepage() {
  const [searchbarValue, setSearchbarValue] = useState('')

  useEffect(() => {
    console.log(searchbarValue)
  }, [searchbarValue])

  return (
    <>
      <h1>This is the Homepage!</h1>
      <Searchbar
        searchbarName="homePageSearch"
        isRequired={true}
        placeholder="Drake"
        labelValue="Search"
        ariaLabel="Searchbar"
        setSearchbarValue={setSearchbarValue}
      />
    </>
  )
}
