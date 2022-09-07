import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import forest from '../../images/forest.jpg'
import { getOnePhoto, loadAllPhotos } from '../../store/photo'
import './UserProfile.css'


const UserProfile = () => {
   const dispatch =useDispatch()
   const history = useHistory()
   const {id} = useParams()
   const sessionUser = useSelector(state => state.session.user)
   console.log('user1', sessionUser)

   const photos = (useSelector(state=> state.photos))
   console.log('photos', photos)

   const photosArr = Object.values(photos)
   console.log('photosArr', photosArr)

   const filteredPhotos= photosArr.filter(({userId}) => userId === +id)
   console.log('fitlered', filteredPhotos)

   if (sessionUser === undefined) {
      history.push('/404')
   }



   return (
      <div className='user-profile-container'>
         <div className='top-div'>
            <div className='top-div-info'>
               {sessionUser?.username}
            </div>
         </div>
         <div className='user-photos-container'>
            {filteredPhotos.map((photo) => (
               <div className='filtered-photos-container'>
                  <NavLink to={`/photos/${photo?.id}`}>
                     <img className='filtered-user-photos'src={photo?.photoUrl} alt={`photos #${photo.id}`}></img>
                  </NavLink>
               </div>
            ))}
         </div>
      </div>
   )
}


export default UserProfile 