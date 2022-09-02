import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS'
const ADD_ONE = 'photos/ADD_ONE'
const UPDATE_ONE = 'photos/UPDATE_ONE'
const REMOVE_ONE = 'photos/REMOVE_ONE'

export const load = (photos) => ({
 type: LOAD_PHOTOS,
 photos
})

export const addOnePhoto = (photo) => ({
 type: ADD_ONE,
 photo
})

export const remove = (id) => ({
 type: REMOVE_ONE,
 id
})

export const loadAllPhotos = () => async (dispatch) => {
 const res = await csrfFetch('/api/photos');
 if (res.ok) {
  const photos = await res.json()
  dispatch(load(photos))
 }
}

export const getOnePhoto = (id) => async (dispatch) => {
 const res = await csrfFetch(`/api/photos/${id}`)
 if (res.ok) {
   const photo = await res.json()
   dispatch(addOnePhoto(photo))
  return photo
 } else {
   return null
 }

}

// export const uploadPhoto = (data) => async(dispatch) => {
//  const res = await csrfFetch('/api/photos/newPhoto', {
//   method: "POST",
//   headers: {"Content-Type": 'application/json'},
//   body: JSON.stringify(data)
//  })
//  if(res.ok) {
//   const newPhoto = await res.json()
//   dispatch(addOnePhoto(newPhoto));
//   return newPhoto
//  }
// }

export const uploadPhoto = (data) => async(dispatch) => {
//  console.log(data)
 const res = await csrfFetch('/api/photos/newPhoto', {
  method: "POST",
  headers: { 'Content-Type': 'multipart/form-data' },
  body: data,
 })
 if(res.ok) {
  const newPhoto = await res.json()
  dispatch(addOnePhoto(newPhoto));
  return newPhoto
 }
}

// export const editPhoto = (data) => async (dispatch) => {
// const res = await csrfFetch(`/api/photos/${+data.id}`, {
//  method: "PUT",
//  headers: {'Content-Type':'application/json' },
//  body: JSON.stringify(data)
// })
// if (res.ok) {
//  const photo = await res.json()
//  dispatch(addOnePhoto(photo))
//  return photo
// }
// }
export const editPhoto = (payload) => async (dispatch) => {
const {userId,caption,photoUrl} =payload
const formData = new FormData()
formData.append('userId', userId)
formData.append('caption', caption)
formData.append('photoUrl', photoUrl)

console.log('PAYLOAD', payload)
const res = await csrfFetch(`/api/photos/${+payload.id}`, {
 method: "PUT",
 headers: {'Content-Type':'multipart/form-data'},
 body: payload
})

if (res.ok) {
 const photo = await res.json()
 dispatch(addOnePhoto(photo))
 return photo
}
}

export const deletePhoto = (id) => async (dispatch) => {
 const res = await csrfFetch(`/api/photos/${id}`, {
  method: "DELETE"
 })
 if (res.ok) {
  dispatch(remove(id))
 }
}

const photosReducer = (state = {}, action) => {

switch(action.type) {
 case LOAD_PHOTOS: {
  const newState = {...state}
  action.photos.forEach((photo) => {
   newState[photo.id] = photo
  })
  return newState
 }

  case ADD_ONE: {
   const newState = {...state, [action.photo.id]: action.photo}
   return newState
  }
  
  case UPDATE_ONE: {
   const newState = {...state, [action.photo.id]: action.photo}
   return newState
  }

  case REMOVE_ONE: {
   const newState = {...state}
   delete newState[action.id];
   return newState;
  }
  default: 
  return state;
  };
}

export default photosReducer