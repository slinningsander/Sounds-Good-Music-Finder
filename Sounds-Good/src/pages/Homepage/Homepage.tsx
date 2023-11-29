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
import { resetDurationState } from '../../redux/slices/filterDurationSlice.ts'
import { resetListenerState } from '../../redux/slices/filterListenersSlice.ts'
import { resetSearchFilterState } from '../../redux/slices/filterSearchSlice.ts'
import { resetTagFilterState } from '../../redux/slices/tagFilterSlice.ts'
import { initialState as initalStateDuration } from '../../redux/slices/filterDurationSlice.ts'
import { initialState as initalStateTags } from '../../redux/slices/tagFilterSlice.ts'
import { initialState as initialStateListenrs } from '../../redux/slices/filterListenersSlice.ts'
import { initialState as initialStateSort } from '../../redux/slices/sortingDirectionSlice.ts'

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

  const durationFilterState = useSelector(
    (state: RootState) => state.filterDuration.value
  )
  const tagsFilterState = useSelector(
    (state: RootState) => state.filterTags.value
  )
  const listenerFilterState = useSelector(
    (state: RootState) => state.filterListeners.value
  )

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible)
  }

  const clearFilter = () => {
    dispatch(resetDurationState())
    dispatch(resetListenerState())
    dispatch(resetSearchFilterState())
    dispatch(resetTagFilterState())
  }

  const isAnyFilterActive = () => {
    return (
      durationFilterState != initalStateDuration.value ||
      listenerFilterState != initialStateListenrs.value ||
      tagsFilterState != initalStateTags.value ||
      sortingDirection != initialStateSort.value
    )
  }

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.buttoContainer}>
          <button
            type="button"
            onClick={toggleFilterVisibility}
            className={styles.toggleFilterBtn}
          >
            {filterVisible ? 'Hide filter' : 'Show filter'}
          </button>
          {isAnyFilterActive() && (
            <button
              type="button"
              onClick={clearFilter}
              className={styles.resetFilterBtn}
            >
              Clear filters
            </button>
          )}
        </div>
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
