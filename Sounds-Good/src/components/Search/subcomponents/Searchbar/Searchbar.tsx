import styles from './Searchbar.module.css'
import React from 'react'

type SearchbarProps = {
  searchbarName: string
  isRequired: boolean
  placeholder: string
  ariaLabel: string
  setSearchbarValue: (searchbarValue: string) => void
}
export function Searchbar({
  searchbarName,
  isRequired,
  placeholder,
  ariaLabel,
  setSearchbarValue,
}: SearchbarProps) {
  return (
    <div className={styles.searchbarContainer}>
      {/*<form
        className="searchbar-form"
        method="get"
        action="/project2/searchResult"
      >*/}
      <input
        type="search"
        className={styles.searchbar}
        name={searchbarName}
        required={isRequired}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(event) => setSearchbarValue(event.target.value)}
        autoComplete="off"
      />
      {/*</form>*/}
    </div>
  )
}
export default Searchbar
