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

  useEffect(() => {
    setValue(reduxFilterState)
  }, [reduxFilterState])

  const handleDurationChange = (
    _event: unknown,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[])
    dispatch(updateDurationFilter(newValue))
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
        {formatDuration(value[0]) != '' ? formatDuration(value[0]) : '0'}{' '}
        minutes
      </span>
      <Slider
        size="small"
        value={value}
        getAriaLabel={() => 'Duration range'}
        disableSwap
        onChangeCommitted={handleDurationChange}
        min={0}
        max={1200}
        data-cy="Slider"
      />
      <span>
        {formatDuration(value[1]) != '' ? formatDuration(value[1]) : '0'}{' '}
        minutes
      </span>
    </Box>
  )
}
