import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { editPhoto } from "../../store/photo"

const PhotoEdit = ({photo}) => {
const history = useHistory()
const dispatch = useDispatch()

const [content,setContent] = useState('')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateContent = (e) => setContent(e.target.value);
// const updatePhoto = (e) => setPhotoUrl(e.target.files[0])

useEffect(() => {
 const errors = [];
 if(content.length < 0 ) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[content])

const handleSubmit = async (e) => {
 e.preventDefault()

 setHasSubmitted(true)
  if(errors.length > 0) return 

 const payload = {
  userId:sessionUser.id,
  content,


 }


  let uploadedPhoto = await dispatch(editPhoto(payload))
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
   <section className='photo-edit-container'>
    <form className='photo-edit-form' onSubmit={handleSubmit}>
     <ul className='errors'>
     {hasSubmitted && errors.map((error, idx) => {
      <li key={idx}>{error}</li>
     })}
     </ul>
     <label className='title'>Edit Your Photo</label>
     <input className='edit-photo-input' type='text' placeholder='Title' value={content} onChange={updateContent}/>
      <button className='photo-edit-button'type='submit'>Edit Photo</button>
      <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
    </form>
   </section>
  </div>
 )
}

export default PhotoEdit