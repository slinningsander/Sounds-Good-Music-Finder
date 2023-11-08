import './subcomponents/Searchbar/Searchbar.tsx'
import './subcomponents/Searchresult/Searchresult.tsx'
import { useState } from 'react'
import Searchbar from './subcomponents/Searchbar/Searchbar.tsx'
import Searchresult from './subcomponents/Searchresult/Searchresult.tsx'

export function Search() {
  const [inputValue, setInputValue] = useState('')
  return (
    <>
      <div className="container">
        <Searchbar
          isRequired={true}
          searchbarName="searchbarHome"
          labelValue="Search music. Do it!"
          placeholder="Dancing Que..."
          ariaLabel="Search for music result"
          onChange={(e) => {
            return setInputValue(e.target.value)
          }}
        />
        <Searchresult isVisible={inputValue.length > 0} />
      </div>
    </>
  )
}
export default Search
