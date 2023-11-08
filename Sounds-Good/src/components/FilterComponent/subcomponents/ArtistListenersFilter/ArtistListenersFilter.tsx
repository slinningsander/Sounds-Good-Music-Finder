import { Box, Slider } from '@mui/material'
import React from 'react'

export function ArtistListenersFilter() {
  const [value, setValue] = React.useState<number[]>([0, 6500000])

  const handleListenerChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    console.log(value[0])
    console.log(value[1])
  }
  return (
    <Box
      sx={{
        width: '300px',
        border: '2px solid #cc99cc',
        borderRadius: '1.5em',
        padding: '0.5em',
      }}
    >
      <span>min: {value[0]} listeners</span>
      <Slider
        size="small"
        disableSwap
        value={value}
        onChangeCommitted={handleListenerChange}
        min={0}
        max={6500000}
      />
      <span>max: {value[1]} listeners</span>
    </Box>
  )
}
