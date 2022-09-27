import { csrfFetch } from "./csrf";

const LOAD_PROFILES = 'profiles/LOAD_PROFILES'

export const load = (profiles) => ({
   type: LOAD_PROFILES,
   profiles
})

export const loadProfiles = (id) => async (dispatch) => {
   const res = await fetch(`/api/users/${id}`,{
      headers: { 'Content-Type': 'application/json'}
   })
   if (res.ok) {
      const profile = await res.json()
      dispatch(load(profile))
      return profile
   } 
}

const profileReducer = (state = {},action) => {
   switch(action.type) {
      case LOAD_PROFILES: {
         const newState = {...state}
         for (let profile of action.profiles)
         newState[profile.id] = profile
         // action.profiles.forEach((profile) => {
         //    newState[profile.id] = profile
         // })
         return newState
      }
      default: 
   return state;
   }
}

export default profileReducer