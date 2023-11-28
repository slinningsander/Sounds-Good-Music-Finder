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
    dispatch(updateDurationFilter(newValue))
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
        onChange={onChange}
        min={0}
        max={600}
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
        {formatDuration(value[1]) != '' ? formatDuration(value[1]) : '0'}{' '}
        minutes
      </span>
    </Box>
  )
}
