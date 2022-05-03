import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { uploadPhoto } from '../../store/photo'
import { useHistory } from 'react-router-dom'
import * as photoActions from '../../store/photo'

const PhotoUpload = () => {
const dispatch = useDispatch()
const history = useHistory()

const [caption,setCaption] = useState('')
const [photoUrl, setPhotoUrl] = useState('')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateCaption = (e) => setCaption(e.target.value);
const updatePhoto = (e) => setPhotoUrl(e.target.files[0])

useEffect(() => {
 const errors = [];
 if(caption.length <1) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[caption])

const handleSubmit = async (e) => {
 e.preventDefault()

 setHasSubmitted(true)

 if(errors.length > 0) return 
 
//   const payload = {
//    userId: sessionUser.id,
//    caption,
//    photoUrl,
//   }

const form = new FormData()
form.append('userId', sessionUser.id)
form.append('caption', caption)
form.append('photoUrl', photoUrl)
// for (let [key, value] of form.entries()) { 
//   console.log(key, value);
// }

  let uploadedPhoto = await dispatch(photoActions.uploadPhoto(form))
  // console.log(uploadedPhoto)

  if (uploadedPhoto) {
   history.push(`/photos/${uploadedPhoto.id}`)
 }
}
const handleCancelClick = (e) => {
 e.preventDefault()
 history.push('/photos')
}

return (
 <div>
  <section className='add-photo-container'>
   <form className='add-photo-form' onSubmit={handleSubmit}>
    <ul className='errors'>
     {hasSubmitted && errors.map((error, idx) => {
      <li key={idx}>{error}</li>
     })}
    </ul>
    <label className='title'> Add a new Photo</label>
    <input className='add-photo-input' type='text' placeholder='Title' value={caption} onChange={updateCaption}/>
      <input type ='file' onChange={updatePhoto} accept=".jpeg, .jpg, .gif , .png"/>
      <button className='add-photo-button'type='submit'>Add Photo</button>
      <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
   </form>
  </section>
 </div>
)
}
export default PhotoUpload