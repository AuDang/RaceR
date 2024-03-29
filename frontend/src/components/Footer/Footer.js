import React from 'react'
import './Footer.css'

const Footer = () => {

 return (
  <div className='footer-container'>
   <div className='developer-name'>
     <p> © Austin Dang 2022</p> 
   </div>
   <div className='icon-container-1'>
    <a href='https://github.com/AuDang' target='_blank' rel="noopener noreferrer" >
     <div className='github-icon'>
      <i className="fa fa-github" aria-hidden="true"></i>
     </div>
    </a>
   </div>
   <div className='icon-container-2'>
    <a href='https://www.linkedin.com/in/austin-dang-106834191/' target='_blank' rel="noopener noreferrer">
     <div className='linkedIn-icon'>
      <i className="fa fa-linkedin-square" aria-hidden="true"></i>
     </div>
    </a>
   </div>
  </div>
 )
}

export default Footer