import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { pink, orange, green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { updateSearchFilter } from '../../../redux/slices/filterSearchSlice'

export function SearchFilter() {
  const dispatch = useDispatch()

  // Get the current search filter value from the Redux store
  const reduxSearchFilter = useSelector(
    (state: RootState) => state.searchFilter.value
  )

  // Set the initial search filter value to the value from the Redux store
  const [searchFilterValue, setSearchFilterValue] = useState(reduxSearchFilter)

  // Update the search filter value when the Redux store value changes
  useEffect(() => {
    setSearchFilterValue(reduxSearchFilter)
  }, [reduxSearchFilter])

  // Handle the change event when a radio button is selected
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilterValue(event.target.value)
    dispatch(updateSearchFilter(event.target.value))
  }

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          name="search-filter-radio-group"
          value={searchFilterValue}
          onChange={handleValue}
        >
          <FormControlLabel
            value="ARTIST"
            control={
              <Radio
                sx={{
                  color: orange[800],
                  '&.Mui-checked': { color: orange[600] },
                }}
                inputProps={{
                  'aria-label': 'Artist',
                }}
                data-cy="ArtistButton"
              />
            }
            label="Artist"
            labelPlacement="top"
          />
          <FormControlLabel
            value="ALBUM"
            control={
              <Radio
                sx={{
                  color: pink[800],
                  '&.Mui-checked': { color: pink[600] },
                }}
                inputProps={{
                  'aria-label': 'Album',
                }}
                data-cy="AlbumButton"
              />
            }
            label="Album"
            labelPlacement="top"
          />
          <FormControlLabel
            value="TRACK"
            control={
              <Radio
                sx={{
                  color: green[800],
                  '&.Mui-checked': { color: green[600] },
                }}
                inputProps={{
                  'aria-label': 'Tracks',
                }}
                data-cy="TrackButton"
              />
            }
            label="Track"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    </>
  )
}
