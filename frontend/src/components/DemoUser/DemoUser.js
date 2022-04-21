import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './DemoUser.css'


function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    return dispatch(sessionActions.demoUser({credential: 'Demo_User', password:'password'}))
  }
  return (
    <div id='demo'>
        <button className='demo-button' onClick={handleSubmit} type='button'>Demo User</button>
    </div>
  );
}

export default DemoUser;