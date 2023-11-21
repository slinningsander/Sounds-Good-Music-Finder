import { useEffect, useState } from 'react'
import Searchbar from '../../components/Search/subcomponents/Searchbar/Searchbar.tsx'
import { SearchFilter } from '../../components/FilterComponent/subcomponents/SearchFilter/SearchFilter.tsx'
import ArtistCardContainer from '../../components/ArtistCardContainer/ArtistCardContainer.tsx'
import AlbumCardContainer from '../../components/AlbumCardContainer/AlbumCardContainer.tsx'
import SongCardContainer from '../../components/SongCardContainer/SongCardContainer.tsx'
import { TrackDurationFilter } from '../../components/FilterComponent/subcomponents/TrackDurationFilter/TrackDurationFilter.tsx'
import styles from './Homepage.module.css'
import { AlbumTagFilter } from '../../components/FilterComponent/subcomponents/AlbumTagFilter/AlbumTagFilter.tsx'

export default function Homepage() {
  const [searchbarValue, setSearchbarValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('TRACK')
  const [maxDuration, setMaxDuration] = useState(600)
  const [minDuration, setMinDuration] = useState(0)
  const [sortingDirection, setSortingDirection] = useState('Default') // State for sorting direction
  const handleSortingChange = (event: any) => {
    setSortingDirection(event.target.value) // Update sorting direction state when the user changes the selection
  }

  useEffect(() => {
    console.log(searchbarValue)
  }, [searchbarValue])

  return (
    <>
      <Searchbar
        searchbarName="homePageSearch"
        isRequired={true}
        placeholder="Search..."
        labelValue="Search"
        ariaLabel="Searchbar"
        setSearchbarValue={setSearchbarValue}
      />
      <div className={styles.filterContainer}>
        <div className={styles.children}>
          <SearchFilter
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
        {selectedValue === 'TRACK' && (
          <>
            <div className={styles.children}>
              <TrackDurationFilter
                setMaxDuration={setMaxDuration}
                setMinDuration={setMinDuration}
              />
            </div>
            <div className={styles.children}>
              <label htmlFor="select" className={styles.label}>
                Sorting:
              </label>
              <select
                id="select"
                value={sortingDirection}
                onChange={handleSortingChange}
              >
                <option value="Default">Default</option>
                <option value="ASC">Alphabetically(a-z)</option>
                <option value="DESC">Alphabetically(z-a)</option>
              </select>
            </div>
          </>
        )}
        {selectedValue === 'ALBUM' && <AlbumTagFilter />}
      </div>

      {searchbarValue && selectedValue === 'ARTIST' && (
        <ArtistCardContainer input={searchbarValue} />
      )}

      {searchbarValue && selectedValue === 'ALBUM' && (
        <AlbumCardContainer input={searchbarValue} />
      )}

      {searchbarValue && selectedValue === 'TRACK' && (
        <SongCardContainer
          input={searchbarValue}
          maxDuration={maxDuration}
          minDuration={minDuration}
          sortingDirection={sortingDirection}
        />
      )}
    </>
  )
}
