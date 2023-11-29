import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateListenersFilter } from '../../../redux/slices/filterListenersSlice'
import { RootState } from '../../../redux/store'
import formatListeners from '../../../utils/formatListeners'

export function ArtistListenersFilter() {
  const dispatch = useDispatch()
  const reduxFilterState = useSelector(
    (state: RootState) => state.filterListeners.value
  )
  const [value, setValue] = useState<number[]>(reduxFilterState)

  // Update the local state when the redux filter state changes
  useEffect(() => {
    setValue(reduxFilterState)
  }, [reduxFilterState])

  // Handle the change event of the slider
  const handleListenerChange = (
    _event: unknown,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[])
    dispatch(updateListenersFilter(newValue))
  }

  // Update the local state when the slider value changes
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
      {/* Display the formatted value of the first slider thumb */}
      <span>{formatListeners(value[0])} listeners</span>

      {/* Render the slider component */}
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

      {/* Display the formatted value of the second slider thumb */}
      <span>{formatListeners(value[1])} listeners</span>
    </Box>
  )
}
