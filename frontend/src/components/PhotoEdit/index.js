import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { editPhoto } from "../../store/photo"
import { useParams } from "react-router-dom"
const PhotoEdit = ({photo}) => {
const history = useHistory()
const dispatch = useDispatch()


const [caption,setCaption] = useState('')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const sessionUser = useSelector((state) => state.session.user)
const {id} = useParams()


const updateCaption = (e) => setCaption(e.target.value);


useEffect(() => {
 const errors = [];
 if(caption.length < 0 ) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[caption])

const handleSubmit = async (e) => {
 e.preventDefault()

 setHasSubmitted(true)
  if(errors.length > 0) return 

 const payload = {
  userId:sessionUser.id,
  caption,
  id

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
     {hasSubmitted && errors.map((error, idx) => (
      <li key={idx}>{error}</li>
     ))}
     </ul>
     <label className='title'>Edit Your Photo</label>
     <input className='edit-photo-input' type='text' placeholder='Title' value={caption} onChange={updateCaption}/>
      <button className='photo-edit-button'type='submit'>Edit Photo</button>
      <button className='cancel-button' type='button' onClick={handleCancelClick}>Cancel</button>
    </form>
   </section>
  </div>
 )
}

export default PhotoEdit