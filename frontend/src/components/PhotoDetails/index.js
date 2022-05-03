import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {getOnePhoto } from '../../store/photo'
import { deletePhoto } from '../../store/photo'
import PhotoUpload from '../PhotoUploadModal/PhotoUploadForm'
import PhotoEditModal from '../PhotoEdit'
import PhotoEdit from '../PhotoEdit/PhotoEditForm'
import './PhotoDetails.css'

const PhotoDetails =() => {
 const history = useHistory()
 const {id} = useParams();
 const photos = useSelector((state) =>state.photos[id])
 const sessionUser = useSelector((state) => state.session.user)
 const dispatch = useDispatch()
 const photo = useSelector((state) => state.photos)
 console.log('user',sessionUser)
 const photoValue = Object.values(photo)
//  console.log(photoValue)
 const [showForm, setShowForm] = useState(false);
 const [errors, setErrors] = useState([])

useEffect(() => {
 dispatch(getOnePhoto(id))
 setShowForm(false)
},[dispatch, id,])

const handleDelete =(id) =>{
  dispatch(deletePhoto(id))
  history.push('/photos')
}

let content = null
let deleteButton =null
let editButton=null
console.log('id',photos)
// if (photoValue) {
//   filtered =photoValue.filter((photo) => photo.id !== photos.id)
//   console.log('test', filtered)
// }
if (sessionUser) {
  if (sessionUser.id === photos.userId) {
    deleteButton = (<button className='photo-delete' onClick={() => {handleDelete(id)}}>Delete Photo</button>)
    editButton = (<PhotoEditModal/>)
  }
}

const hideForm = (e) => {
  setShowForm(false)
  setErrors([])
}

 return (
  <div className="photo-container">
   <div className='photo-contents'>
     <h1>{photos?.caption}</h1>
    <img className='photo-image' src={photos?.photoUrl } alt=''/>
      <p className='photo-username'>
        {photos?.User?.username}
      </p>

        {/* <button className='photo-delete' onClick={() => {handleDelete(id)}}>Delete Photo</button> */}
        {deleteButton}
        {editButton}
        {/* <PhotoUpload /> */}
   </div>
  </div>
 )
}

export default PhotoDetails