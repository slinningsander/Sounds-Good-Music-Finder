import { render, fireEvent } from '@testing-library/react'
import { ArtistListenersFilter } from './ArtistListenersFilter'

describe('ArtistListenersFilter', () => {
  test('renders ArtistListenersFilter without crashing', () => {
    const { getAllByRole } = render(<ArtistListenersFilter />)
    const sliders = getAllByRole('slider')
    expect(sliders).toHaveLength(2)
  })

  test('displays initial min and max values', () => {
    const { getByText } = render(<ArtistListenersFilter />)
    expect(getByText('min: 0 listeners')).toBeInTheDocument()
    expect(getByText('max: 6500000 listeners')).toBeInTheDocument()
  })

  test('updates display of min and max values when slider values change', () => {
    const { getAllByRole, getByText } = render(<ArtistListenersFilter />)
    const [minSlider, maxSlider] = getAllByRole('slider')

    fireEvent.change(minSlider, { target: { value: '100' } })
    // We expect the min value to change, but this might not work due to the complexity of Material-UI slider.
    // More realistic tests are done in end-to-end tests.
    expect(getByText('min: 100 listeners')).toBeInTheDocument()

    fireEvent.change(maxSlider, { target: { value: '6000000' } })
    expect(getByText('max: 6000000 listeners')).toBeInTheDocument()
  })
})
