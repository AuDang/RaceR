import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {getOnePhoto } from '../../store/photo'
import { deletePhoto } from '../../store/photo'
import PhotoUpload from '../PhotoUpload'
import PhotoEdit from '../PhotoEdit'
import './PhotoDetails.css'

const PhotoDetails =() => {
 const history = useHistory()
 const {id} = useParams();
 const photos = useSelector((state) =>state.photos[id])


 const dispatch = useDispatch()


useEffect(() => {
 dispatch(getOnePhoto(id))
},[dispatch, id])

const handleDelete =(id) =>{
  dispatch(deletePhoto(id))
  history.push('/photos')
}

 return (
  <div className="photo-container">
   <div className='photo-contents'>
     <h1>{photos?.caption}</h1>
    <img className='photo-image' src={photos?.photoUrl } alt=''/>
      <p className='photo-username'>
        {/* {photos?.User?.username} */}
      </p>

        <button className='photo-delete' onClick={() => {handleDelete(id)}}>Delete Photo</button>
        <PhotoEdit />
        <PhotoUpload />

   </div>
  </div>
 )
}

export default PhotoDetails