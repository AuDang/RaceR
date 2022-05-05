import { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeComment } from "../../store/comment";
import { deleteComment } from "../../store/comment";
import { useParams } from "react-router-dom";
import './EditComment.css'


const EditCommentForm = ({comments}) => {
const dispatch =useDispatch()
const history =useHistory()
const { id } = useParams();
const [newComment, setNewComment]= useState('')
console.log(id)
console.log(comments)
const [errors, setErrors] = useState([])
const [showForm, setShowForm] =useState(false)
const [hasSubmitted, setHasSubmitted] = useState(false)
const sessionUser = useSelector((state) => state.session.user)
// const updateComment = (e) => setComment(e.target.value);

useEffect(() => {
 const errors = [];
 if(newComment.length < 1) errors.push('Please write something...')

 // if(comment.length > 250) {
 //  errors.push('Comment must be shorter than 250 characters')
 // }
 setErrors(errors)
},[newComment])

const handleSubmit = async (e) => {
 e.preventDefault()
 // setHasSubmitted(true)

 if(errors.length > 0) return 

 const payload ={
  ...comments,
  id: comments?.id,
  userId: sessionUser?.id,
  photoId: comments?.photoId ,
  comment: newComment,
  
 }
 let editedComment = await dispatch(changeComment(payload))
 if (editedComment) {
  setShowForm(false);
  // setNewComment()

} 
}

const handleClick = (e) => {
 e.preventDefault();
 setShowForm(false)
}
  // history.push('/photos')

return (
 <>
  <button className='comment-edit-button'type='button' onClick={() => setShowForm(!showForm)} >Edit</button>
  {showForm?
  <div>
   <section>
  <form onSubmit={handleSubmit}>
   <ul>
    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
   </ul>
   <label>
    <input type='text' value={newComment} onChange={(e)=> setNewComment(e.target.value)}/>
   </label>
    <button type='submit'>Submit</button>
    <button type='button' onClick={handleClick}>Cancel</button>
  </form>
   </section>
 </div>
 :null}
 </>
)
}
export default EditCommentForm