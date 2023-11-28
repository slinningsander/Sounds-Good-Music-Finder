import { useEffect, useState } from 'react'
import Searchbar from '../../components/Searchbar/Searchbar.tsx'
import { SearchFilter } from '../../components/FilterComponents/SearchFilter/SearchFilter.tsx'
import ArtistCardContainer from '../../components/ArtistCardContainer/ArtistCardContainer.tsx'
import AlbumCardContainer from '../../components/AlbumCardContainer/AlbumCardContainer.tsx'
import SongCardContainer from '../../components/SongCardContainer/SongCardContainer.tsx'
import { TrackDurationFilter } from '../../components/FilterComponents/TrackDurationFilter/TrackDurationFilter.tsx'
import styles from './Homepage.module.css'
import { AlbumTagFilter } from '../../components/FilterComponents/AlbumTagFilter/AlbumTagFilter.tsx'
import { ArtistListenersFilter } from '../../components/FilterComponents/ArtistListenersFilter/ArtistListenersFilter.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { updateSortingDirection } from '../../redux/slices/sortingDirectionSlice.ts'
import { RootState } from '../../redux/store.ts'

export default function Homepage() {
  const [searchbarValue, setSearchbarValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('TRACK')
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSortingChange = (event: any) => {
    //sets value in redux store
    dispatch(updateSortingDirection(event.target.value))
  }
  //gets sortingDirectionState from store
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )

  useEffect(() => {
    console.log(searchbarValue)
  }, [searchbarValue])

  return (
    <>
      <Searchbar
        searchbarName="homePageSearch"
        isRequired={true}
        placeholder="Search..."
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
            <div className={styles.children} data-cy="SliderContainer">
              <TrackDurationFilter />
            </div>
            <div className={styles.children}>
              <label htmlFor="select" className={styles.label}>
                Sorting:
              </label>
              <select
                id="select"
                value={sortingDirection}
                onChange={setSortingChange}
                data-cy="Select"
              >
                <option value="Default">Default</option>
                <option value="ASC">Alphabetically(a-z)</option>
                <option value="DESC">Alphabetically(z-a)</option>
              </select>
            </div>
          </>
        )}
        {selectedValue === 'ALBUM' && (
          <>
            <div className={styles.children}>
              <AlbumTagFilter />
            </div>
            <div className={styles.children}>
              <label htmlFor="select" className={styles.label}>
                Sorting:
              </label>
              <select
                id="select"
                value={sortingDirection}
                onChange={setSortingChange}
              >
                <option value="Default">Default</option>
                <option value="ASC">Alphabetically(a-z)</option>
                <option value="DESC">Alphabetically(z-a)</option>
              </select>
            </div>
          </>
        )}
        {selectedValue == 'ARTIST' && (
          <>
            <div className={styles.children}>
              <ArtistListenersFilter />
            </div>
            <div className={styles.children}>
              <label htmlFor="select" className={styles.label}>
                Sorting:
              </label>
              <select
                id="select"
                value={sortingDirection}
                onChange={setSortingChange}
              >
                <option value="Default">Default</option>
                <option value="ASC">Alphabetically(a-z)</option>
                <option value="DESC">Alphabetically(z-a)</option>
              </select>
            </div>
          </>
        )}
      </div>

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
