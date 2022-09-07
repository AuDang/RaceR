import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import forest from '../../images/forest.jpg'
import { getOnePhoto, loadAllPhotos } from '../../store/photo'
import './UserProfile.css'


const UserProfile = () => {
   const dispatch =useDispatch()
   const history = useHistory()
   const {id} = useParams()
   const [users, setUser] = useState({});
   const sessionUser = useSelector(state => state.session.user)
   // console.log('user1', sessionUser)

   const photos = (useSelector(state=> state.photos))
   // console.log('photos', photos)

   const photosArr = Object.values(photos)
   console.log('photosArr', photosArr)

   const filteredPhotos= photosArr.filter(({userId}) => userId === +id)
   console.log('fitlered', filteredPhotos)

   // console.log('userkjhgjkhgjhgjkgkjs', user)

   // if (sessionUser === undefined) {
   //    history.push('/404')
   // }

  useEffect(() => {
   //  if (!id) {
   //    return;
   //  }
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const users = await response.json();
      setUser(users);
    })();
  }, [id]);

  const user = Object.values(users)
//   console.log('userererer', user)
  const filteredUser = user.filter(({id}) => id === +id)
  console.log('filteredID', filteredUser)



   return (
      <div className='user-profile-container'>
         <div className='top-div'>
            <div className='top-div-info'>
               {filteredUser.map((user) => (
                  <div>
                     {user.id === id && (<p>{user.username}</p>)}
                     {/* {user.username} */}
                     {user.id}
                     {id}
                     {console.log('params', user.id)}
                  </div>
               ))}
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