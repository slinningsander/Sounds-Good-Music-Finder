import { Box, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import formatDuration from '../../../utils/formatDuration'
import {
  resetDurationState,
  updateDurationFilter,
} from '../../../redux/slices/filterDurationSlice'

export function TrackDurationFilter() {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      console.log(resetDurationState())
      dispatch(resetDurationState())
    }
  }, [dispatch])

  const [value, setValue] = useState<number[]>([0, 600])

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
        border: '2px solid #0099cc',
        borderRadius: '1.5em',
        padding: '0.5em',
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
        max={600}
        data-cy="Slider"
      />
      <span>
        {formatDuration(value[1]) != '' ? formatDuration(value[1]) : '0'} min
      </span>
    </Box>
  )
}
