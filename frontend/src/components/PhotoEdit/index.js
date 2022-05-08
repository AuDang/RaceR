import { useState } from "react";
import {Modal} from '../../context/Modal'
import PhotoEdit from './PhotoEditForm'
import './PhotoEdit.css'

const PhotoEditModal = ({photo}) => {
 const [showModal, setShowModal] =useState(false);
 const [photos, setPhoto] =useState('')
 return (
  <div className='edit-button-container'>
    <button className='edit-modal-button'onClick={() => setShowModal(true)}>Edit Photo</button>
    {showModal && (
     <Modal onClose={() => setShowModal(false)}>
      <PhotoEdit showModal={setShowModal} photo={photo}/>
     </Modal>
    )}
  </div>
 )
}

export default PhotoEditModal