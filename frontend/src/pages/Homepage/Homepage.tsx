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
import {
  resetSortingDirectionState,
  updateSortingDirection,
} from '../../redux/slices/sortingDirectionSlice.ts'
import { RootState } from '../../redux/store.ts'
import Page from '../../components/Page/Page.tsx'
import { resetDurationState } from '../../redux/slices/filterDurationSlice.ts'
import { resetListenerState } from '../../redux/slices/filterListenersSlice.ts'
import { resetTagFilterState } from '../../redux/slices/tagFilterSlice.ts'

// Define the Homepage component
export default function Homepage() {
  // Define state variables
  const [filterVisible, setFilterVisible] = useState(false)
  const dispatch = useDispatch()

  // Handle sorting direction change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSortingChange = (event: any) => {
    dispatch(updateSortingDirection(event.target.value))
  }

  // Get sorting direction from Redux store
  const sortingDirection = useSelector(
    (state: RootState) => state.sortingDirection.value
  )

  // Get search input from Redux store
  const searchInput = useSelector((state: RootState) => state.searchInput.value)

  // Get search filter from Redux store
  const searchFilter = useSelector(
    (state: RootState) => state.searchFilter.value
  )

  // Toggle filter visibility
  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible)
  }

  // Clear all filters
  const clearFilter = () => {
    dispatch(resetDurationState())
    dispatch(resetListenerState())
    dispatch(resetTagFilterState())
    dispatch(resetSortingDirectionState())
  }

  // Render the Homepage component
  return (
    <Page>
      <div className={styles.container}>
        {/* Toggle filter visibility button */}
        <button
          type="button"
          onClick={toggleFilterVisibility}
          className={styles.toggleFilterBtn}
          data-cy="ToggleFilter"
        >
          {filterVisible ? 'Hide filter' : 'Show filter'}
        </button>

        {/* Clear filters button */}
        <button
          type="button"
          onClick={clearFilter}
          className={styles.resetFilterBtn}
          data-cy="ClearFilter"
        >
          Clear filters
        </button>

        {/* Render filter components if filterVisible is true */}
        {filterVisible && (
          <div className={styles.filterContainer}>
            {/* Render TrackDurationFilter component if searchFilter is 'TRACK' */}
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

            {/* Render AlbumTagFilter component if searchFilter is 'ALBUM' */}
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
                    data-cy="Select"
                  >
                    <option value="Default">Default</option>
                    <option value="ASC">Alphabetically(a-z)</option>
                    <option value="DESC">Alphabetically(z-a)</option>
                  </select>
                </div>
              </>
            )}

            {/* Render ArtistListenersFilter component if searchFilter is 'ARTIST' */}
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
                    data-cy="Select"
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

        {/* Searchbar and SearchFilter components */}
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

        {/* Render ArtistCardContainer if searchInput is not empty and searchFilter is 'ARTIST' */}
        {searchInput && searchFilter === 'ARTIST' && <ArtistCardContainer />}

        {/* Render AlbumCardContainer if searchInput is not empty and searchFilter is 'ALBUM' */}
        {searchInput && searchFilter === 'ALBUM' && <AlbumCardContainer />}

        {/* Render SongCardContainer if searchInput is not empty and searchFilter is 'TRACK' */}
        {searchInput && searchFilter === 'TRACK' && <SongCardContainer />}
      </div>
    </Page>
  )
}
