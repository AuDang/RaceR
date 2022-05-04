import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupForm.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sign-up-button-container">
      {/* <i class="fa fa-user-plus" aria-hidden="true"></i> */}
      <button className='sign-up-button'onClick={() => setShowModal(true)}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;