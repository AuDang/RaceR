import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { editPhoto } from "../../store/photo"
import { useParams } from "react-router-dom"



const PhotoEdit = ({photo, showModal}) => {
const history = useHistory()
const dispatch = useDispatch()
const {id} = useParams()
const [caption,setCaption] = useState(photo?.caption)

const [photos, setPhotos] = useState(photo?.photoUrl ||'')
// console.log('photoaskdj;fasdkjl;fhdsalk;jfjaskdlf',photos)
const [errors, setErrors] = useState([])
const [showErrors, setShowErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateCaption = (e) => setCaption(e.target.value);
const updatePhoto = (e) => {
  const files = e.target.files
  setPhotos(files)}
// console.log('update', updatePhoto)
// console.log('photoooo', photo)



useEffect(() => {
 const errors = [];
 if(caption.length === 0 ) {
  errors.push('Title can not be empty')
 }
 setErrors(errors)
},[caption])

const handleSubmit = async (e) => {
 e.preventDefault()
 setHasSubmitted(true)
  // if(errors.length > 0) return 

  // const form = new FormData()
  // form.append('userId', sessionUser.id)
  // form.append('caption', caption)
  // form.append('photoUrl',photos.name)

//   for (let [key, value] of form.entries()) { 
//   console.log(key, value);
// }
    const payload = {
      // ...photo,
      userId:sessionUser.id,
      id: photo.id,
      caption:caption,
      photoUrl:photos[0]
    }

    console.log('payload', payload)
    
    let uploadedPhoto = await dispatch(editPhoto(payload))
     console.log('testttttt',uploadedPhoto)
    
    if (uploadedPhoto) {
      setErrors([])
      showModal(false)
      // setCaption()
      history.push(`/photos/${uploadedPhoto.id}`)
    }     
}


const handleCancelClick = (e) => {
 e.preventDefault()
 showModal(false)
//  history.push('/photos')
}

 return (
  <div>
   <section className='photo-edit-container'>
    <form className='photo-edit-form' onSubmit={handleSubmit}>
     {/* <ul className='errors'>
     {hasSubmitted && errors?.map((error, idx) => (
      <li key={idx}>{error}</li>
     ))}
     </ul> */}
     <label className='title'>Edit Your Photo</label>
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
     <input className='edit-photo-input' type='text' placeholder='Title' value={caption} required onChange={updateCaption}/>
      {/* <input className= 'choose-file' type ='file'  onChange={updatePhoto} accept=".jpeg, .jpg, .gif , .png"/> */}
      <div className='edit-buttons'>
        <button className='photo-edit-button'type='submit'>Edit</button>
        <button className='cancel-upload-button' type='button' onClick={handleCancelClick}>Cancel</button>
      </div>
    </form>
   </section>
  </div>
 )
}

export default PhotoEdit