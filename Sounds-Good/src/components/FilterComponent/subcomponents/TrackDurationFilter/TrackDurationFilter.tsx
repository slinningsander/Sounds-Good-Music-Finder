import { Box, Slider } from '@mui/material'
import React from 'react'

export function TrackDurationFilter() {
  const [value, setValue] = React.useState<number[]>([0, 600])

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
      <span>min: {value[0]} sekunder</span>
      <Slider
        size="small"
        value={value}
        disableSwap
        onChangeCommitted={handleChange}
        min={0}
        max={600}
      />
      <span>max: {value[1]} sekunder</span>
    </Box>
  )
}
