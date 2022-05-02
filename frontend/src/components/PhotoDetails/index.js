import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getOnePhoto } from '../../store/photo'
import PhotoUpload from '../PhotoUpload'
import './PhotoDetails.css'

const PhotoDetails =() => {
 const {id} = useParams();
 const photos = useSelector((state) =>state.photos[id])
 const dispatch = useDispatch()

useEffect(() => {
 dispatch(getOnePhoto(id))
},[dispatch, id])

 return (
  <div className="photo-container">
   <div className='photo-contents'>
     <h1>{photos?.content}</h1>
    <img className='photo-image' src={photos?.photoUrl}/>
   </div>
   <PhotoUpload />
  </div>
 )
}

export default PhotoDetails