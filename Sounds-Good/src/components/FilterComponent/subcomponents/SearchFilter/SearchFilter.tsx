import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'

import { pink, orange, green } from '@mui/material/colors'
import React from 'react'

type SearchFilterProps = {
  selectedValue: string
  setSelectedValue: (selectedValue: string) => void
}

export function SearchFilter({
  selectedValue,
  setSelectedValue,
}: SearchFilterProps) {
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          name="search-filter-radio-group"
          value={selectedValue}
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
