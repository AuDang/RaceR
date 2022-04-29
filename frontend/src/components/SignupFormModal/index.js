import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sign-up-button">
      <button onClick={() => setShowModal(true)}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;