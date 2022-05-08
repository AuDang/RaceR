import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = '/comments/LOAD_COMMENTS';
const ADD_ONE = '/comments/ADD_ONE';
const UPDATE_ONE = 'comments/UPDATE_ONE'
const REMOVE_ONE = '/comments/REMOVE_ONE'

export const load = (comments) => ({
 type: LOAD_COMMENTS,
 comments
})

export const addOneComment = (comment) => ({
 type: ADD_ONE,
 comment
})

export const updateOne = (comment) => ({
  type: UPDATE_ONE,
  comment 
})

export const remove = (id) => ({
 type: REMOVE_ONE,
 id
})

export const loadAllComments = () => async(dispatch) => {
 const res = await csrfFetch('/api/comments');
 if (res.ok) {
  const comments = await res.json()
  dispatch(load(comments))
 }
}

export const addComment = (data) =>async(dispatch) =>{
const res = await csrfFetch('/api/comments', {
 method: "POST",
 headers: {"Content-Type": 'application/json'},
 body: JSON.stringify(data)
});

if (res.ok) {
 const comment = await res.json();
 dispatch(addOneComment(comment))
 return comment
}
}

export const changeComment = (data) => async(dispatch) => {
const res = await csrfFetch(`/api/comments/${data.id}`, {
  method:"PUT",
  headers: {"Content-Type": "application/json"},
  body:JSON.stringify(data)
})
if (res.ok) {
  const newComment = await res.json();
  dispatch(addOneComment(newComment))
  return newComment
}
}

export const deleteComment = (id) => async(dispatch)=> {
const res = await csrfFetch(`/api/comments/${id}`, {
 method: "DELETE",
});
if (res.ok) {
 dispatch(remove(id))
}
}


const commentsReducer = (state= {}, action) => {
switch (action.type) {

 case LOAD_COMMENTS: {
 const newState = {...state}
 action.comments.forEach((comment) => {
  newState[comment.id] =comment
 })
 return newState
 }
 
 case ADD_ONE: {
  const newState = {...state, [action.comment.id]: action.comment};
  // console.log(newState, 'state')
  // console.log(action.comment, 'action')
  return newState
 }


 case REMOVE_ONE: {
  const newState = {...state}
  delete newState[action.id]
  return newState;
 }
 default:
  return state;
};
}

export default commentsReducer