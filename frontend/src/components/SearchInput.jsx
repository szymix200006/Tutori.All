import React from 'react'
import '../styles/SearchInput.css'

const SearchInput = () => {
  return (
    <div className='search-input-container'>
      <span className="material-symbols-outlined search-input-icon">search</span>
      <input type="text" name="search" placeholder="Find your tutorial" className='search-input' onFocus={(e) => console.log(document.getElementsByClassName('search-input-icon').style.color)}/>
    </div>
  )
}

export default SearchInput
