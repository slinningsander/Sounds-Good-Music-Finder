import './Searchbar.css'
import React from 'react'

type SearchbarProps = {
  searchbarName: string
  isRequired: boolean
  labelValue: string
  placeholder: string
  ariaLabel: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function Searchbar({
  searchbarName,
  isRequired,
  labelValue,
  placeholder,
  ariaLabel,
  onChange,
}: SearchbarProps) {
  return (
    <div className="searchbar-container">
      {/*<form
        className="searchbar-form"
        method="get"
        action="/project2/searchResult"
      >*/}
      <label className="searchbar-label" htmlFor={searchbarName}>
        {labelValue}
      </label>
      <input
        type="search"
        className="searchbar"
        name={searchbarName}
        required={isRequired}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
      />
      {/*</form>*/}
    </div>
  )
}
export default Searchbar
