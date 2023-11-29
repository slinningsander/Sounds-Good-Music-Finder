import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatDuration from '../../../utils/formatDuration'
import { updateDurationFilter } from '../../../redux/slices/filterDurationSlice'
import { RootState } from '../../../redux/store'

export function TrackDurationFilter() {
  const dispatch = useDispatch()
  const reduxFilterState = useSelector(
    (state: RootState) => state.filterDuration.value
  )
  const [value, setValue] = useState<number[]>(reduxFilterState)

  // Update the value state when reduxFilterState changes
  useEffect(() => {
    setValue(reduxFilterState)
  }, [reduxFilterState])

  // Handle the change event of the Slider component
  const handleDurationChange = (
    _event: unknown,
    newValue: number | number[]
  ) => {
    dispatch(updateDurationFilter(newValue))
  }

  // Update the value state when the Slider component value changes
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
      <span>
        {/* Display the formatted duration value or '0' if empty */}
        {formatDuration(value[0]) != '' ? formatDuration(value[0]) : '0'}{' '}
        minutes
      </span>
      {/* Slider component for selecting duration range */}
      <Slider
        size="small"
        value={value}
        getAriaLabel={() => 'Duration range'}
        disableSwap
        onChangeCommitted={handleDurationChange}
        onChange={onChange}
        min={0}
        max={1200}
        data-cy="Slider"
        sx={{
          ':hover': {
            cursor: 'grab',
          },
          ':active': {
            cursor: 'grabbing',
          },
        }}
      />
      <span>
        {/* Display the formatted duration value or '0' if empty */}
        {formatDuration(value[1]) != '' ? formatDuration(value[1]) : '0'}{' '}
        minutes
      </span>
    </Box>
  )
}
