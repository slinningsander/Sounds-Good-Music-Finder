import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateListenersFilter } from '../../../redux/slices/filterListenersSlice'
import { RootState } from '../../../redux/store'

export function ArtistListenersFilter() {
  const dispatch = useDispatch()
  const reduxFilterState = useSelector(
    (state: RootState) => state.filterListeners.value
  )
  const [value, setValue] = useState<number[]>(reduxFilterState)

  useEffect(() => {
    setValue(reduxFilterState)
  }, [reduxFilterState])

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
