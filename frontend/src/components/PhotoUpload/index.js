import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { uploadPhoto } from '../../store/photo'
import { useHistory } from 'react-router-dom'
import * as photoActions from '../../store/photo'

const PhotoUpload = () => {
const dispatch = useDispatch()
const history = useHistory()

const [content,setContent] = useState('')
const [photo, setPhoto] = useState(null)
// const [albumId] = useState(1)
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateContent = (e) => setContent(e.target.value);
const updatePhoto = (e) => setPhoto(e.target.value)

useEffect(() => {
 const errors = [];
 if(content.length <1) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[content])

const handleSubmit = async (e) => {
 e.preventDefault()

 setHasSubmitted(true)

 if(errors.length > 0) return 
 
  const payload = {
   userId: sessionUser.id,
   content,
   photo,

  }
  let uploadedPhoto = await dispatch(photoActions.uploadPhoto(payload))
  console.log(uploadedPhoto)
  let redirected = Object.values(uploadedPhoto)
  if (payload) {
   history.push(`/photos/${redirected.id}`)
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
    <label> Add a new Photo</label>
    <input className='add-photo-input' type='text' placeholder='Title' value={content} onChange={updateContent}/>
     <label>
      <input type ='text' onChange={updatePhoto}/>
     </label>
      <button className='add-photo-button'type='submit'>Add Photo</button>
      <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
   </form>
  </section>
 </div>
)
}
export default PhotoUpload