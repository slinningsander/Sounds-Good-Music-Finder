import React from 'react'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import searchInputReducer from '../../redux/slices/searchInputSlice'
// updateSearchInput,
import Searchbar from './Searchbar'
import { RootState } from '../../redux/store'

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>
  store?: EnhancedStore
}

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { searchInput: searchInputReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Searchbar component', () => {
  it('renders correctly with props', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Searchbar
        searchbarName="test-search"
        isRequired={true}
        placeholder="Search..."
        ariaLabel="searchbar"
      />
    )

    const searchbar = getByPlaceholderText('Search...')
    expect(searchbar).toBeInTheDocument()
    expect(searchbar).toBeRequired()
    expect(getByRole('searchbox')).toHaveAttribute('name', 'test-search')
  })

  it('updates the store on submit', () => {
    const store = configureStore({
      reducer: { searchInput: searchInputReducer },
    })
    const { getByPlaceholderText, getByRole } = render(
      <Searchbar
        searchbarName="test-search"
        isRequired={true}
        placeholder="Search..."
        ariaLabel="searchbar"
      />,
      { store }
    )

    const searchbar = getByPlaceholderText('Search...')
    const searchButton = getByRole('button')

    fireEvent.change(searchbar, { target: { value: 'test input' } })
    fireEvent.click(searchButton)

    expect(store.getState().searchInput.value).toBe('test input')
  })
})
