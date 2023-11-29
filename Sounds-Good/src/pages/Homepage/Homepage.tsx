import { useState } from 'react'
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
import Page from '../../components/Page/Page.tsx'

export default function Homepage() {
  const [filterVisible, setFilterVisible] = useState(false)
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSortingChange = (event: any) => {
    dispatch(updateSortingDirection(event.target.value))
  }
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )

  const searchInput = useSelector((state: RootState) => state.searchInput.value)

  const searchFilter = useSelector(
    (state: RootState) => state.searchFilter.value
  )

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible)
  }

  return (
    <Page>
      <div className={styles.container}>
        <button
          type="button"
          onClick={toggleFilterVisibility}
          className={styles.toggleFilterBtn}
        >
          {filterVisible ? 'Hide filter' : 'Show filter'}
        </button>
        {filterVisible && (
          <div className={styles.filterContainer}>
            {searchFilter === 'TRACK' && (
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
            {searchFilter === 'ALBUM' && (
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
            {searchFilter == 'ARTIST' && (
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
        )}

        <div className={styles.searchContainer}>
          <Searchbar
            searchbarName="homePageSearch"
            isRequired={true}
            placeholder="Search..."
            ariaLabel="Searchbar"
          />
          <div className={styles.children}>
            <SearchFilter />
          </div>
        </div>

        {searchInput && searchFilter === 'ARTIST' && <ArtistCardContainer />}

        {searchInput && searchFilter === 'ALBUM' && <AlbumCardContainer />}

        {searchInput && searchFilter === 'TRACK' && <SongCardContainer />}
      </div>
    </Page>
  )
}

//input={searchbarValue}
