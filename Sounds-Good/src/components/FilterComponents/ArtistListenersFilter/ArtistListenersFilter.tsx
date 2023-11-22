import { Box, Slider } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateListenersFilter } from '../../../redux/slices/filterListenersSlice'

export function ArtistListenersFilter() {
  const dispatch = useDispatch()
  const [value, setValue] = useState<number[]>([0, 6500000])
  const handleListenerChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    dispatch(updateListenersFilter(newValue))
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
