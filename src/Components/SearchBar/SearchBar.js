import React, { useState } from 'react'
import './SearchBar.css'

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const search = () => {
    props.onSearch(searchTerm)
  }

  const handleTermChange = (event) => {
    const userSearch = event.target.value
    setSearchTerm(userSearch)
  }

  return (
    <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={handleTermChange}
        />
        <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  )
}

export default Searchbar