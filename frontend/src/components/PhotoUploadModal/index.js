import { useState } from "react";
import {Modal} from '../../context/Modal'
import PhotoUploadForm from './PhotoUploadForm'
import './PhotoUpload.css'

const PhotoUploadModal = () => {
 const [showModal, setShowModal] =useState(false);

 return (
  <div className='upload-button'>
    <button onClick={() => setShowModal(true)}>Upload</button>
    {showModal && (
     <Modal onClose={() => setShowModal(false)}>
      <PhotoUploadForm />
     </Modal>
    )}
  </div>
 )
}

export default PhotoUploadModal