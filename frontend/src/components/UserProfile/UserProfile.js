import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { loadProfiles } from '../../store/profile'

import './UserProfile.css'


const UserProfile = () => {
   const dispatch =useDispatch()
   const history = useHistory()
   const {id} = useParams()
   const [users, setUser] = useState({});
   const sessionUser = useSelector(state => state.session.user)
   console.log('user1', sessionUser)

   const photos = (useSelector(state=> state.photos))
   // console.log('photos', photos)

   const photosArr = Object.values(photos)
   console.log('photosArr', photosArr)

   const filteredPhotos= photosArr.filter(({userId}) => userId === +id)
   console.log('fitlered', filteredPhotos)

   const profile = useSelector((state) => state.profile)
   const profileArr = Object.values(profile)
   console.log('profile', profileArr[id-1])

   // if (sessionUser === undefined) {
   //    history.push('/404')
   // }


useEffect(() => {
   dispatch(loadProfiles())
},[dispatch])

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const users = await response.json();
      setUser(users);
    })();
  }, [id]);

//   console.log('users', users)


  const user = Object.values(users)
//   console.log('userererer', user)
  const filteredUser = user.filter(({id}) => id === id)
//   console.log('filteredID', filteredUser)



   return (
      <div className='user-profile-container'>
         <div className='top-div'>
            <div className='top-div-info'>
               <div className='top-div-left'>
                  {profileArr[id-1]?.username}
               </div>
               <div className='top-div-right'>
                  {filteredPhotos.length} Photos
               </div>
            </div>
         </div>
         <div className='user-photos-container'>
            {filteredPhotos.map((photo) => (
               <div className='filtered-photos-container'>
                  <NavLink to={`/photos/${photo?.id}`}>
                     {/* {photo.User.username} */}
                     <img className='filtered-user-photos'src={photo?.photoUrl} alt={`photos #${photo.id}`}></img>
                     <div className='filtered-caption-layer'>
                        <p className='filtered-caption'>{photo.caption}</p>
                        <p className='filtered-name'> by {photo.User.username}</p>
                     </div>
                  </NavLink>
               </div>
            ))}
         </div>
      </div>
   )
}


export default UserProfile 