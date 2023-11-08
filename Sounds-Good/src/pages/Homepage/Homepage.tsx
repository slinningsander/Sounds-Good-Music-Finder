import { SearchFilter } from '../../components/FilterComponent/subcomponents/SearchFilter/SearchFilter.tsx'

import Search from '../../components/Search/Search.tsx'
export default function Homepage() {
  return (
    <>
      <h1>This is the Homepage!</h1>
      <Search />
      <SearchFilter />
    </>
  )
}
