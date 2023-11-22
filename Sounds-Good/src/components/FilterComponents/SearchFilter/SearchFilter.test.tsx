import { render, fireEvent } from '@testing-library/react'
import { SearchFilter } from './SearchFilter'

describe('SearchFilter', () => {
  let setSelectedValue: (value: string) => void

  beforeEach(() => {
    setSelectedValue = vi.fn()
  })

  test('renders SearchFilter without crashing', () => {
    const { getByRole } = render(
      <SearchFilter
        selectedValue="ARTIST"
        setSelectedValue={setSelectedValue}
      />
    )
    expect(getByRole('radiogroup')).toBeInTheDocument()
  })

  test('calls setSelectedValue when radio button value changes', () => {
    const { getByLabelText } = render(
      <SearchFilter
        selectedValue="ARTIST"
        setSelectedValue={setSelectedValue}
      />
    )

    fireEvent.click(getByLabelText('Album'))
    expect(setSelectedValue).toHaveBeenCalledWith('ALBUM')

    fireEvent.click(getByLabelText('Track'))
    expect(setSelectedValue).toHaveBeenCalledWith('TRACK')
  })

  test('selectedValue prop determines which radio button is initially selected', () => {
    const { getByLabelText } = render(
      <SearchFilter selectedValue="ALBUM" setSelectedValue={setSelectedValue} />
    )
    expect(getByLabelText('Album')).toBeChecked()
    expect(getByLabelText('Artist')).not.toBeChecked()
    expect(getByLabelText('Track')).not.toBeChecked()
  })
})
