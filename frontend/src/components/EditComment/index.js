import { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeComment } from "../../store/comment";
import { deleteComment } from "../../store/comment";
import { useParams } from "react-router-dom";


const EditCommentForm = ({comments}) => {
const dispatch =useDispatch()
const history =useHistory()
const { id } = useParams();
const [comment, setComment]= useState('')
console.log(id)
console.log(comment)
const [errors, setErrors] = useState([])

const [showForm, setShowForm] =useState(false)
const [hasSubmitted, setHasSubmitted] = useState(false)
const sessionUser = useSelector((state) => state.session.user)
const updateComment = (e) => setComment(e.target.value);

useEffect(() => {
 const errors = [];
 if(comment.length < 0) {errors.push('Please write something...')
 }
 // if(comment.length > 250) {
 //  errors.push('Comment must be shorter than 250 characters')
 // }
 setErrors(errors)
},[comment])

const handleSubmit = async (e) => {
 e.preventDefault()
 // setHasSubmitted(true)

 if(errors.length > 0) return 

 const payload ={
  ...comments,
  userId: comments?.userId,
  photoId: comments?.photoId ,
  
 }
 let editedComment = await dispatch(changeComment(payload))
 if (editedComment) {

  setShowForm(false);
  setComment()
} 
}

const handleClick = (e) => {
 e.preventDefault();
 setShowForm(false)
}
  // history.push('/photos')

return (
 <>
  <button type='button' onClick={() => setShowForm(!showForm)} >Edit</button>
  {showForm?
  <div>
   <section>

  <form onSubmit={handleSubmit}>
   <ul>
    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
   </ul>
    <input type='text' value={comment} onChange={updateComment}/>
    <button type='submit'>Submit</button>
    <button type='button' onClick={handleClick}>Cancel</button>
  </form>
   </section>
 </div>:null}
 </>
)
}
export default EditCommentForm