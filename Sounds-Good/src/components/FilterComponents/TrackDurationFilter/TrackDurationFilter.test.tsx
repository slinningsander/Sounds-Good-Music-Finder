import { render, fireEvent } from '@testing-library/react'
import { TrackDurationFilter } from './TrackDurationFilter'

describe('TrackDurationFilter', () => {
  let setMaxDuration: (value: number) => void
  let setMinDuration: (value: number) => void

  beforeEach(() => {
    setMaxDuration = vi.fn()
    setMinDuration = vi.fn()
  })

  test('calls setMinDuration and setMaxDuration when slider values change', () => {
    const { getAllByRole } = render(
      <TrackDurationFilter
        setMaxDuration={setMaxDuration}
        setMinDuration={setMinDuration}
      />
    )
    const sliders = getAllByRole('slider')
    fireEvent.change(sliders[0], { target: { value: '100' } })
    expect(setMinDuration).toHaveBeenCalledWith(100)
    fireEvent.change(sliders[1], { target: { value: '200' } })
    expect(setMaxDuration).toHaveBeenCalledWith(200)
  })

  test('updates display of min and max values when slider values change', () => {
    const { getAllByRole, getByText } = render(
      <TrackDurationFilter
        setMaxDuration={setMaxDuration}
        setMinDuration={setMinDuration}
      />
    )
    const sliders = getAllByRole('slider')
    fireEvent.change(sliders[0], { target: { value: '200' } })
    expect(getByText('min: 200 sekunder')).toBeInTheDocument()
    fireEvent.change(sliders[1], { target: { value: '300' } })
    expect(getByText('max: 300 sekunder')).toBeInTheDocument()
  })
})
