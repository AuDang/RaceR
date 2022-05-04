import { useState } from "react";
import {Modal} from '../../context/Modal'
import PhotoUploadForm from './PhotoUploadForm'
import './PhotoUpload.css'

const PhotoUploadModal = () => {
 const [showModal, setShowModal] =useState(false);

 return (
  <div className='upload-button'>
    {/* <button className='button-icon'type='button' onClick={() => setShowModal(true)}> */}
      <i class="fa fa-cloud-upload" type='button' onClick={() => setShowModal(true)}aria-hidden="true"></i>
      {/* </button> */}
    {showModal && (
     <Modal onClose={() => setShowModal(false)}>
      <PhotoUploadForm showModal={setShowModal}/>
     </Modal>
    )}
  </div>
 )
}

export default PhotoUploadModal