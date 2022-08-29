import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as photoActions from '../../store/photo'

const PhotoUploadForm = ({showModal}) => {
const dispatch = useDispatch()
const history = useHistory()

const [caption,setCaption] = useState('')
const [photoUrl, setPhotoUrl] = useState('')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const [showErrors, setShowErrors]= useState([])
const sessionUser = useSelector((state) => state.session.user)
const updateCaption = (e) => setCaption(e.target.value);
const updatePhoto = (e) => setPhotoUrl(e.target.files[0])

useEffect(() => {
 const errors = [];
 if(caption.length ===0) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[caption])

const handleSubmit = async (e) => {
 e.preventDefault()
 setHasSubmitted(true)

//  if(errors.length > 0) return 
 


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
  showModal(false)
  setCaption('')
   history.push(`/photos/${uploadedPhoto.id}`)
 }
}
const handleCancelClick = (e) => {
  showModal(false)
 e.preventDefault()
//  history.push('/photos')
}

return (
 <div>
  <section className='add-photo-container'>
   <form className='add-photo-form' onSubmit={handleSubmit}>
    {/* <ul className='errors'>
     {hasSubmitted && errors?.map((error, idx) => {
      <li key={idx}>{error}</li>
     })}
    </ul> */}
    <label className='title'> Add a New Photo</label>
        <div className='error-container'>
          {errors.length > 0 && (
            <div className='form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {/* <ul className='signin-form-errors'> */}
              {errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
              {/* </ul> */}
            </div>
          )}
        </div>
    <input className='add-photo-input' type='text' placeholder='Title' value={caption} onChange={updateCaption} required/>
      <input className= 'choose-file' type ='file' required onChange={updatePhoto} accept=".jpeg, .jpg, .gif , .png"/>
        <section className='upload-add-cancel'>
          <button className='add-photo-button'type='submit'>Add Photo</button>
          <button className='cancel-add-button' type='button' onClick={handleCancelClick}>Cancel</button>
        </section>
   </form>
  </section>
 </div>
)
}
export default PhotoUploadForm