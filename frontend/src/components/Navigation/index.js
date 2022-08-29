import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import PhotoUploadModal from '../PhotoUploadModal';
import SearchInput from '../Search/SearchInput';
// import CreatePostForm from '../CreatePostForm';

function Navigation({ isLoaded }) {
  const {id} = useParams()
  const photos = useSelector((state) =>state.photos[id])
  const sessionUser = useSelector(state => state.session.user);
  let uploadButton
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='nav-left'>
        <PhotoUploadModal/>
        <ProfileButton user={sessionUser} />
      </div>
    );
    // uploadButton =(<PhotoUploadModal/>)

  } else {
    sessionLinks = (
      <div className="nav-buttons">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <div className="navbar">
      <ul className="navbar-ul">
        <li className="navbar-li">
          <div className="nav-links">
            <NavLink className="racer" exact to="/">RaceR</NavLink>
            <NavLink className="explore" to="/photos">Explore</NavLink>
            {/* <PhotoUploadModal className='modal'/> */}
          </div>
            <SearchInput/>
            {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
