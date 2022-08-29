import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as commentActions from '../../store/comment'
import './AddComment.css'

const AddComment = () => {
const dispatch=useDispatch()
const history = useHistory()
const {id} = useParams()
const photo = useSelector(state => state.photos)

const [comment, setComment]= useState('')
const [userId, setUserId]=useState('')
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] = useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateComment = (e) => setComment(e.target.value);

// console.log('user', sessionUser.username)
useEffect(() => {
 const errors = [];
 if(comment.length <= 0) {errors.push('Please write something...')
 }
 if(comment.length > 250) {
  errors.push('Comment must be shorter than 250 characters')
 }
 setErrors(errors)

},[comment])
const handleSubmit = async (e) => {
 e.preventDefault()
 
 setHasSubmitted(true)
 if(errors.length > 0) return 

 const payload ={
  userId: sessionUser.id,
  photoId: photo[id].id,
  userName: sessionUser.username,
  comment,
 }


 const createdComment = await dispatch(commentActions.addComment(payload))
if (createdComment) {
setComment('')
setUserId('')
} 
}
const handleCancelClick = (e) => {
  e.preventDefault()
  history.push('/photos')
}
return (
  <div className='comment-container-space'>

 <section className='add-comments-container'>
  <form className='add-comment-form' onSubmit={handleSubmit}>
    <ul className='errors'>
     {hasSubmitted && errors?.map((error, idx) => {
       <li key={idx}>{error}</li>
      })}
    </ul>
    <input className='add-comment-input' type='text' placeholder='Add a comment...'value={comment} required onChange={updateComment}/>
      <div className='form-buttom-container'>
      <button className='add-comment-button'type='submit'>Submit</button>
      {/* <button className='cancel-comment-button' type='button' onClick={handleCancelClick}>Cancel</button> */}
      </div>
  </form>
 </section>
    </div>
)
}
 export default AddComment