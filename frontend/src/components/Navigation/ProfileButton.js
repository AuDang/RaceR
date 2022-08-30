import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import PhotoUploadModal from "../PhotoUploadModal";
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <div className='profile-container'>
        <button className="profile-btn"onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='dropdown-list'>
            <a>{user.username}</a>
            <a>{user.email}</a>
            <button className='logout-button'onClick={logout}>Logout</button>          {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;