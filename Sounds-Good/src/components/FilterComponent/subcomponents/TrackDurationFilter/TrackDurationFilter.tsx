import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  resetDurationState,
  updateDurationFilter,
} from '../../../../redux/slices/filterDurationSlice'

export function TrackDurationFilter() {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(resetDurationState())
    }
  }, [dispatch])

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
      <span>min: {value[0]} seconds</span>
      <Slider
        size="small"
        value={value}
        getAriaLabel={() => 'Duration range'}
        disableSwap
        onChangeCommitted={handleDurationChange}
        min={0}
        max={600}
      />
      <span>max: {value[1]} seconds</span>
    </Box>
  )
}
