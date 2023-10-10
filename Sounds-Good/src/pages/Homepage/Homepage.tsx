import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Searchbar } from '../../components/Searchbar/Searchbar'

export default function Homepage() {
  return (
    <>
      <Navbar />
      <h1>This is the Homepage!</h1>
      <Searchbar
        isRequired={true}
        searchbarName="searchbarHome"
        labelValue="Search music. Do it!"
        placeholder="Dancing Que..."
        ariaLabel="Search for music result"
      />
    </>
  )
}
