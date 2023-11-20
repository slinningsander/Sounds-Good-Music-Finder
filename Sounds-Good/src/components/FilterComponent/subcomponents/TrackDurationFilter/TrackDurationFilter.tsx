import { Box, Slider } from '@mui/material'
import React from 'react'

type TrackDurationFilterProps = {
  setMaxDuration: (value: number) => void
  setMinDuration: (value: number) => void
}

export function TrackDurationFilter({
  setMaxDuration,
  setMinDuration,
}: TrackDurationFilterProps) {
  const [value, setValue] = React.useState<number[]>([0, 600])

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
        onChangeCommitted={(_, value) => {
          setValue(value as number[])
          setMinDuration(value[0])
          setMaxDuration(value[1])
          console.log(value)
        }}
        min={0}
        max={600}
        data-cy="Slider"
      />
      <span>max: {value[1]} sekunder</span>
    </Box>
  )
}
