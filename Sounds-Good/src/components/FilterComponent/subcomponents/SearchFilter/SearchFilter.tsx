import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'

import { pink, orange, green } from '@mui/material/colors'
import React from 'react'

export function SearchFilter() {
  const [selectedValue, setSelectedValue] = React.useState('ARTIST')
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    return selectedValue
  }

  return (
    <>
      <p>{selectedValue}</p>
      <FormControl>
        <FormLabel id="search-filter-radio-group">Filter search</FormLabel>
        <RadioGroup
          row
          aria-labelledby="filter search radio group"
          name="search-filter-radio-group"
          defaultValue="ARTIST"
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
