import { Box, Slider } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDurationFilter } from '../../../../redux/slices/filterDurationSlice'

// type TrackDurationFilterProps = {
//   setMaxDuration: (value: number) => void
//   setMinDuration: (value: number) => void
// }
// {
//   setMaxDuration,
//   setMinDuration,
// }: TrackDurationFilterProps
export function TrackDurationFilter() {
  const dispatch = useDispatch()
  const [value, setValue] = useState<number[]>([0, 600])

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    dispatch(updateDurationFilter(newValue))
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
        getAriaLabel={() => 'Duration range'}
        disableSwap
        // onChangeCommitted={(_, value) => {
        //   setValue(value as number[])
        //   setMinDuration(value[0])
        //   setMaxDuration(value[1])
        //   console.log(value)
        // }}
        onChangeCommitted={handleDurationChange}
        min={0}
        max={600}
      />
      <span>max: {value[1]} sekunder</span>
    </Box>
  )
}
