import React, { useState, useEffect } from 'react';
import Search from '.';

const SearchInput = () => {
   const [query, setQuery] = useState("")
   const [searchResults, setSearchResults] = useState(false)


   useEffect(() => {
      if (!query.length) return setSearchResults(false)
      setSearchResults(true)
   }, [query])

   const icon = (<i className="fa fa-search" aria-hidden="true"></i>)

   return (
      <div className='search-container' onMouseLeave={e=>e.stopPropagation()}>
         {<div>
         {icon}
            <input
            className='search-input'
            placeholder='Search photos...'
            value={query}
            onChange={e=> setQuery(e.target.value)}
            onClick={e=> e.stopPropagation}/>
            
            {searchResults && <Search query={query} setQuery={setQuery} setSearchResults={setSearchResults}/>}
         </div>}

      </div>
   )
}

export default SearchInput