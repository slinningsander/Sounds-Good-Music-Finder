//import { useDispatch } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetSearchInput,
  updateSearchInput,
} from '../../redux/slices/searchInputSlice'
import styles from './Searchbar.module.css'
import { useEffect, useState } from 'react'
import { RootState } from '../../redux/store'
import SearchIcon from '@mui/icons-material/Search'

type SearchbarProps = {
  searchbarName: string
  isRequired: boolean
  placeholder: string
  ariaLabel: string
}

export function Searchbar({
  searchbarName,
  isRequired,
  placeholder,
  ariaLabel,
}: SearchbarProps) {
  // const isMobile = useMobile()
  const dispatch = useDispatch()
  const reduxInputValue = useSelector(
    (state: RootState) => state.searchInput.value
  )
  const [inputValue, setInputValue] = useState(reduxInputValue)

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    dispatch(updateSearchInput(inputValue))
  }

  useEffect(() => {
    if (inputValue === '' && reduxInputValue !== '') {
      dispatch(resetSearchInput())
    }
  }, [inputValue, reduxInputValue, dispatch])

  useEffect(() => {
    setInputValue(reduxInputValue)
  }, [reduxInputValue])

  return (
    <div className={styles.searchbarContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className={styles.searchbar}
          name={searchbarName}
          required={isRequired}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          autoComplete="off"
          data-cy="Searchbar"
        />
        <button
          type="submit"
          className={styles.searchBtn}
          onClick={handleSubmit}
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  )
}
export default Searchbar
