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
            <NavLink className="builds" to="/photos">Builds</NavLink>
          </div>
            {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
