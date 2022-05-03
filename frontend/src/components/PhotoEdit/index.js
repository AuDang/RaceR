import { useState } from "react";
import {Modal} from '../../context/Modal'
import PhotoEdit from './PhotoEditForm'
import './PhotoEdit.css'

const PhotoEditModal = () => {
 const [showModal, setShowModal] =useState(false);

 return (
  <div className='edit-button-container'>
    <button className='edit-modal-button'onClick={() => setShowModal(true)}>Edit Photo</button>
    {showModal && (
     <Modal onClose={() => setShowModal(false)}>
      <PhotoEdit showModal={setShowModal}/>
     </Modal>
    )}
  </div>
 )
}

export default PhotoEditModal