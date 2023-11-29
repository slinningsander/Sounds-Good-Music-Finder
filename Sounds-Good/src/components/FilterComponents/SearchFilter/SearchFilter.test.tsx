import React from 'react'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import searchFilterReducer from '../../../redux/slices/filterSearchSlice'
import { SearchFilter } from './SearchFilter'
import { RootState } from '../../../redux/store'

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>
  store?: EnhancedStore
}

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { searchFilter: searchFilterReducer },
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

describe('SearchFilter', () => {
  let setSelectedValue: (value: string) => void

  beforeEach(() => {
    setSelectedValue = vi.fn()
  })

  test('renders SearchFilter without crashing', () => {
    const { getByRole } = render(<SearchFilter />)
    expect(getByRole('radiogroup')).toBeInTheDocument()
  })

  // test('calls setSelectedValue when radio button value changes', () => {
  //   const { getByLabelText } = render(<SearchFilter />)

  //   fireEvent.click(getByLabelText('Album'))
  //   expect(setSelectedValue).toHaveBeenCalledWith('ALBUM')

  //   fireEvent.click(getByLabelText('Track'))
  //   expect(setSelectedValue).toHaveBeenCalledWith('TRACK')
  // })
  test('calls updateSearchFilter when radio button value changes', () => {
    const store = configureStore({
      reducer: { searchFilter: searchFilterReducer },
    })
    const { getByLabelText } = render(<SearchFilter />, { store })

    fireEvent.click(getByLabelText('Album'))
    expect(store.getState().searchFilter.value).toBe('ALBUM')

    fireEvent.click(getByLabelText('Track'))
    expect(store.getState().searchFilter.value).toBe('TRACK')
  })

  test('selectedValue prop determines which radio button is initially selected', () => {
    const { getByLabelText } = render(<SearchFilter />)
    expect(getByLabelText('Album')).toBeChecked()
    expect(getByLabelText('Artist')).not.toBeChecked()
    expect(getByLabelText('Track')).not.toBeChecked()
  })
})
