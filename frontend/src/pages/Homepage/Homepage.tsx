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
import { initialState as initalStateDuration } from '../../redux/slices/filterDurationSlice.ts'
import { initialState as initalStateTags } from '../../redux/slices/tagFilterSlice.ts'
import { initialState as initialStateListenrs } from '../../redux/slices/filterListenersSlice.ts'
import { initialState as initialStateSort } from '../../redux/slices/sortingDirectionSlice.ts'
import { MenuItem, Select } from '@mui/material'

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

  // Clear all filters
  const clearFilter = () => {
    dispatch(resetDurationState())
    dispatch(resetListenerState())
    dispatch(resetTagFilterState())
    dispatch(resetSortingDirectionState())
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
            data-cy="ToggleFilter"
          >
            {filterVisible ? 'Hide filter' : 'Show filter'}
          </button>
          {isAnyFilterActive() && (
            <button
              type="button"
              onClick={clearFilter}
              className={styles.resetFilterBtn}
              data-cy="ClearFilter"
            >
              Clear filters
            </button>
          )}
        </div>
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
                  <Select
                    sx={{
                      width: '11.5em',
                      backgroundColor: '#1D267D',
                      color: 'white',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: '#1D267D',
                          color: 'white',
                        },
                      },
                    }}
                    id="select"
                    value={sortingDirection}
                    onChange={setSortingChange}
                    data-cy="Select"
                  >
                    <MenuItem value="Default" data-cy="DefaultOption">
                      Default
                    </MenuItem>
                    <MenuItem value="ASC" data-cy="ASCOption">
                      Alphabetically(a-z)
                    </MenuItem>
                    <MenuItem value="DESC" data-cy="DESCOption">
                      Alphabetically(z-a)
                    </MenuItem>
                  </Select>
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
                  <Select
                    sx={{
                      width: '11.5em',
                      backgroundColor: '#1D267D',
                      color: 'white',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: '#1D267D',
                          color: 'white',
                        },
                      },
                    }}
                    id="select"
                    value={sortingDirection}
                    onChange={setSortingChange}
                    data-cy="Select"
                  >
                    <MenuItem value="Default" data-cy="DefaultOption">
                      Default
                    </MenuItem>
                    <MenuItem value="ASC" data-cy="ASCOption">
                      Alphabetically(a-z)
                    </MenuItem>
                    <MenuItem value="DESC" data-cy="DESCOption">
                      Alphabetically(z-a)
                    </MenuItem>
                  </Select>
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
                  <Select
                    sx={{
                      width: '11.5em',
                      backgroundColor: '#1D267D',
                      color: 'white',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: '#1D267D',
                          color: 'white',
                        },
                      },
                    }}
                    id="select"
                    value={sortingDirection}
                    onChange={setSortingChange}
                    data-cy="Select"
                  >
                    <MenuItem value="Default" data-cy="DefaultOption">
                      Default
                    </MenuItem>
                    <MenuItem value="ASC" data-cy="ASCOption">
                      Alphabetically(a-z)
                    </MenuItem>
                    <MenuItem value="DESC" data-cy="DESCOption">
                      Alphabetically(z-a)
                    </MenuItem>
                  </Select>
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
        {searchInput && (
          <h2 className={styles.searchHeader}>
            Showing results for "{searchInput}":
          </h2>
        )}
        {searchInput && searchFilter === 'ARTIST' && <ArtistCardContainer />}

        {/* Render AlbumCardContainer if searchInput is not empty and searchFilter is 'ALBUM' */}
        {searchInput && searchFilter === 'ALBUM' && <AlbumCardContainer />}

        {/* Render SongCardContainer if searchInput is not empty and searchFilter is 'TRACK' */}
        {searchInput && searchFilter === 'TRACK' && <SongCardContainer />}
      </div>
    </Page>
  )
}
