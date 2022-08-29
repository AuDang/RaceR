import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='log-in-icon'>
      {/* <i class="fa fa-sign-in" aria-hidden="true" onClick={() => setShowModal(true)} ></i> */}
      <button  className='sign-in-button' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
