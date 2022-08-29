import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from "react";



const Search = ({query, setQuery, setSearchResults}) => {
    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state=>state.photos)
    console.log('photos', photos)
    // const spotValue = Object.values(photos).filter(photos => photos.name)
    // console.log('spotValue', spotValue)

  const photoResults = Object.values(photos)?.filter(
    photos => photos?.caption?.toLowerCase().includes(query?.toLowerCase()))
  
  console.log('photoresults', photoResults)

  const formatResult = result => {
  const index = result.toUpperCase().indexOf(query?.toUpperCase());
  const len = query.length;

  const subStringOne = result.slice(0, index);
  const match = result.slice(index, index + len);
  const subStringTwo = result.slice(index+len);

  return (
    <span>{subStringOne}<span className='match'>{match}</span>{subStringTwo}</span>
  )
}
 return (
    <div className='search-results'
    onClick={e=>e.stopPropagation()}>
      <ul>
        {photoResults.length ? photoResults.map(photo=>
        <li key={`search-card-${photo.id}`}>
          <div className='search-results-item'>
            <NavLink className='search-result-text' to={`/photos/${photo.id}`} onClick={e => {
              setSearchResults(false)
              setQuery('')
            }}>
              {formatResult(photo?.caption)}
            </NavLink>
          </div>
        </li>)
      :<div className='search-results-none'>
         <p>No results found...</p>
      </div>
      }</ul>

    </div>
 ) 
}

export default Search