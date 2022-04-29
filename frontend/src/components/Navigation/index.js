import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
// import CreatePostForm from '../CreatePostForm';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
      <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />

      </>
    );
  }

  return (
    <header className="navBar">
      <ul>
          <NavLink className="home" exact to="/">RaceR</NavLink>
          {isLoaded && sessionLinks}
      </ul>
    </header>
  );
}

export default Navigation;
