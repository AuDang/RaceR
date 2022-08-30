import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { editPhoto } from "../../store/photo"
import { useParams } from "react-router-dom"



const PhotoEdit = ({photo, showModal}) => {
const {id} = useParams()
const history = useHistory()
const dispatch = useDispatch()
const sessionUser = useSelector((state) => state.session.user)
// const photos = useSelector((state)=> state.photos[id])

// console.log('photos', photos)
console.log('photo', photo)

const [caption,setCaption] = useState(photo?.caption|| '' )
const [photoUrl, setPhotoUrl] = useState(photo?.photoUrl || '')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] =useState(false)
const updatePhoto = (e) => setPhotoUrl(e.target.files[0])


// useEffect(() => {
//  const errors = [];
//  if(caption.length === 0 ) {
//   errors.push('Title can not be empty')
//  }
//  setErrors(errors)
// },[caption])

const handleSubmit = async (e) => {
 e.preventDefault()
  setErrors([]);
  setHasSubmitted(true)
  if(errors.length > 0) setErrors(errors)

    
    // const payload = {
    //   userId:sessionUser.id,
    //   caption,
    //   photoUrl:photoUrl,
    //   id
    // }
  const edit = await dispatch(editPhoto({
    id:photo.id,
    userId: sessionUser?.id,
    caption:caption,
    photoUrl:photoUrl
  }))

    let uploadedPhoto = await dispatch(editPhoto(edit))
    .catch(async(res) => {
      const data = await res.json()
      if (data && data.errors) setErrors(data.errors)
      })

    if (uploadedPhoto) {
      showModal(false)
      // setCaption('')
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
              <span className="error-title">The following errors occurred:</span>
              {/* <ul className='signin-form-errors'> */}
              {errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
              {/* </ul> */}
            </div>
          )}
        </div>
     <input className='edit-photo-input' type='text' placeholder='Title' value={caption} onChange={(e) =>setCaption(e.target.value)}/>
      <input className= 'choose-file' type ='file' required onChange={updatePhoto} accept=".jpeg, .jpg, .gif , .png"/>
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