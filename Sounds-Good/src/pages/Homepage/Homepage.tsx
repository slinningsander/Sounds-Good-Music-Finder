import { useEffect, useState } from 'react'
import Searchbar from '../../components/Search/subcomponents/Searchbar/Searchbar.tsx'
import { SearchFilter } from '../../components/FilterComponent/subcomponents/SearchFilter/SearchFilter.tsx'
import ArtistCardContainer from '../../components/ArtistCardContainer/ArtistCardContainer.tsx'
import AlbumCardContainer from '../../components/AlbumCardContainer/AlbumCardContainer.tsx'
import SongCardContainer from '../../components/SongCardContainer/SongCardContainer.tsx'

// import Search from '../../components/Search/Search.tsx'
export default function Homepage() {
  const [searchbarValue, setSearchbarValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('ARTIST')

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
      <SearchFilter
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      {searchbarValue && selectedValue === 'ARTIST' && (
        <ArtistCardContainer input={searchbarValue} />
      )}

      {searchbarValue && selectedValue === 'ALBUM' && (
        <AlbumCardContainer input={searchbarValue} />
      )}

      {searchbarValue && selectedValue === 'TRACK' && (
        <SongCardContainer input={searchbarValue} />
      )}
    </>
  )
}
