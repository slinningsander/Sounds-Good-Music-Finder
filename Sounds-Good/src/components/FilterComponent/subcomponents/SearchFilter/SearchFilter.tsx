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
  // const [selectedValue, setSelectedValue] = React.useState('ARTIST')
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    return selectedValue
  }

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="filter search radio group"
          name="search-filter-radio-group"
          defaultValue="TRACK"
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
                // checked={selectedValue === 'ARTIST'}
                onChange={handleValue}
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
                // checked={selectedValue === 'ALBUM'}
                onChange={handleValue}
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
                onChange={handleValue}
                // checked={selectedValue === 'TRACK'}
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
