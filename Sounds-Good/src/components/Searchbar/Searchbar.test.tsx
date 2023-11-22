import { render, fireEvent } from '@testing-library/react'
import Searchbar from './Searchbar'

describe('Searchbar component', () => {
  it('renders correctly with props', () => {
    const setSearchbarValue = vi.fn()
    const { getByPlaceholderText, getByRole } = render(
      <Searchbar
        searchbarName="test-search"
        isRequired={true}
        placeholder="Search..."
        ariaLabel="searchbar"
        setSearchbarValue={setSearchbarValue}
      />
    )

    const searchbar = getByPlaceholderText('Search...')
    expect(searchbar).toBeInTheDocument()
    expect(searchbar).toBeRequired()
    expect(getByRole('searchbox')).toHaveAttribute('name', 'test-search')
  })

  it('calls setSearchbarValue on change', () => {
    const setSearchbarValue = vi.fn()
    const { getByPlaceholderText } = render(
      <Searchbar
        searchbarName="test-search"
        isRequired={true}
        placeholder="Search..."
        ariaLabel="searchbar"
        setSearchbarValue={setSearchbarValue}
      />
    )

    const searchbar = getByPlaceholderText('Search...')
    fireEvent.change(searchbar, { target: { value: 'test input' } })
    expect(setSearchbarValue).toHaveBeenCalledWith('test input')
  })
})
