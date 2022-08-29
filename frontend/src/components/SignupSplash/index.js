import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormModal/SignupForm';


function SignupFormModal1() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="splash-button-container">
      <button className='splash-signup' onClick={() => setShowModal(true)}>Start for free</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <SignupForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal1;