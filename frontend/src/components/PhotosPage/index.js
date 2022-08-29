import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadAllPhotos } from '../../store/photo'
import './PhotosPage.css'


const PhotosPage = () => {
 const dispatch = useDispatch()
 const photos = useSelector((state) => state.photos)
 const photoData = Object.values(photos)
 const [username, setUsername] = useState('') 


//  console.log('test', photoData)



 useEffect(() => {
  dispatch(loadAllPhotos())
 },[dispatch])


//  const onHover = (username) => {
//   setUsername(username) 
//  }
// onMouseEnter={(e)=>onHover(photo.User.username)} 
 return (
  <div className="photos-container">
   <div className='photo-card'>
    {photoData?.reverse().map((photo) => (
     <>
      <div className='photos' key={photo.id}>
       <NavLink className='photoId' key={photo.id}  to={`/photos/${photo.id}`}>
        <div className='single-photo'>
         <img className='photo-url'src={photo.photoUrl} alt=''/>
        </div>
        <div className='photo-content'>
         <p className='photo-words'> {photo.caption}</p>
        </div>
       </NavLink>
        <p className='userName'>Posted By: {photo.User?.username}</p>
      </div>
     </>
    ))}
   </div>
  </div>
 )
}

export default PhotosPage