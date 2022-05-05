import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {getOnePhoto } from '../../store/photo'
import { deletePhoto } from '../../store/photo'
import PhotoUpload from '../PhotoUploadModal/PhotoUploadForm'
import PhotoEditModal from '../PhotoEdit'
import PhotoEdit from '../PhotoEdit/PhotoEditForm'
import EditCommentForm from '../EditComment'
import AddComment from '../AddComment'
import { deleteComment } from '../../store/comment'
import * as commentActions from '../../store/comment'
import './PhotoDetails.css'


const PhotoDetails =() => {
 const history = useHistory()
 const {id} = useParams();
 const photos = useSelector((state) =>state.photos[id])
 const sessionUser = useSelector((state) => state.session.user)
 const dispatch = useDispatch()
 const photo = useSelector((state) => state.photos)
 const commentObj = useSelector((state) => state.comments)
 const comments = Object.values(commentObj)

 const photoValue = Object.values(photo)//  console.log(photoValue)
 const [showForm, setShowForm] = useState(false);
 const [newComment, setNewComment] = useState("");
 const [errors, setErrors] = useState([])
 
if (!photos) history.push('/404')

 useEffect(() => {
  //  dispatch(getOnePhoto(id))  
   dispatch(commentActions.loadAllComments())
   setShowForm(false)

  },[dispatch, id,])
  
  const handleDelete =(id) =>{
    dispatch(deletePhoto(id))
    history.push('/photos')
  }
  
  // console.log('comment', comments)
  

const commentDelete = async (e, id) =>{
  await dispatch(deleteComment(id))
}

let deleteButton =null
let editButton=null
let addComment=null
let editComment
// let deleteComment= null


if (sessionUser) {
  addComment =(<AddComment />)
  if (sessionUser.id === photos?.userId) {
    deleteButton = (<button className='photo-delete-button' onClick={() => {handleDelete(id)}}>Delete Photo</button>)
    editButton = (<PhotoEditModal/>)
  } 

}

const hideForm = (e) => {
  setShowForm(false)
  setErrors([])
}

const filteredComments = comments.filter((comment) => {
  // console.log(comment.photoId)
  // console.log(photos.id)
if (comment?.photoId === photos?.id) return true

})



// console.log('filtered', filteredComments)
// console.log('comments', filteredComments[id])
// console.log('user', sessionUser?.id)

 return (
   <>
  <div className="photo-container">
   <div className='photo-contents'>
     <h1>{photos?.caption}</h1>
      <img className='photo-image' src={photos?.photoUrl } alt=''/>
      <p className='photo-username'>
        Owner: {photos?.User?.username}
      <div className='photo-edit-delete-container'>
        {editButton}
        {deleteButton} 
      </div>
        </p>
      {/* </p> */}
   </div>
  </div>
  <div className='comments-container'>
   <div className='comments-contents'>
     <p className='comments-header'>Comments</p>
     <div className='comments-box'>
      {filteredComments?.map((comment) => (
        <div className='all-comments'key={comment?.id}>
          <p className='comment-username'>{comment.User?.username}</p>
          {/* {console.log('username', comment.User?.username)} */}
          <li className='comments-list'>{comment?.comment}</li>
          {/* {console.log('COMMENT', comment)} */}
          {sessionUser?.id === comment?.userId && 
            <div className='edit-delete-comment'>
              <EditCommentForm comments={comment}/>
              <button className='comment-button-delete'type='button' onClick={(e)=>commentDelete(e, comment?.id)}>Delete</button>
            </div>
          } 
        </div>
      ))}
      
      </div>
    </div>
  {addComment}
  </div>
  </>
 )
}

export default PhotoDetails