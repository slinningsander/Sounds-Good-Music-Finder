import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  resetListenerState,
  updateListenersFilter,
} from '../../../redux/slices/filterListenersSlice'

export function ArtistListenersFilter() {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(resetListenerState())
    }
  }, [dispatch])
  const [value, setValue] = useState<number[]>([0, 6500000])
  const handleListenerChange = (
    _event: unknown,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[])
    dispatch(updateListenersFilter(newValue))
  }
  const onChange = (_event: unknown, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  return (
    <Box
      sx={{
        width: '400px',
        margin: '0.5em',
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
      }}
    >
      <span>{value[0]} listeners</span>
      <Slider
        size="small"
        disableSwap
        value={value}
        onChangeCommitted={handleListenerChange}
        onChange={onChange}
        min={0}
        max={6500000}
        data-cy="ListenerSlider"
        sx={{
          ':hover': {
            cursor: 'grab',
          },
          ':active': {
            cursor: 'grabbing',
          },
        }}
      />
      <span>{value[1]} listeners</span>
    </Box>
  )
}
