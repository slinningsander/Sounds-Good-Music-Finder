import { useEffect, useState } from 'react'
import Searchbar from '../../components/Search/subcomponents/Searchbar/Searchbar.tsx'
import { SearchFilter } from '../../components/FilterComponent/subcomponents/SearchFilter/SearchFilter.tsx'

import Search from '../../components/Search/Search.tsx'
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
      <SearchFilter />
    </>
  )
}
