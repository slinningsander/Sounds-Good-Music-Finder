import { Box, Slider } from '@mui/material'
import React from 'react'

export function TrackDurationFilter() {
  const [value, setValue] = React.useState<number[]>([0, 5000000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    console.log(value[0])
    console.log(value[1])
  }
  return (
    <Box
      sx={{
        width: '300px',
        border: '2px solid #0099cc',
        borderRadius: '1.5em',
        padding: '0.5em',
      }}
    >
      <span>min: {value[0]}</span>
      <Slider
        size="small"
        value={value}
        onChangeCommitted={handleChange}
        min={0}
        max={5000000}
      />
      <span>max: {value[1]}</span>
    </Box>
  )
}
