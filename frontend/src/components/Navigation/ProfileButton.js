import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
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
      <button className="profile-btn"onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <li className="profile-dropdown">
          <div className='dropdown-list'>
          <a>{user.username}</a>
          <a>{user.email}</a>
          <a>
            <button className='dropdown-delete'onClick={logout}>Log Out</button>
          </a>
          </div>
        </li>
      )}
    </div>
  );
}

export default ProfileButton;
