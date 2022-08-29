import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignupFormModal1 from "../SignupSplash";
import './LandingPage.css'

const LandingPage = () => {
 const sessionUser = useSelector((state) => state.session.user);

 if (sessionUser) return <Redirect to="/photos" />

 return (
  <div className='landing-page-container'>
   <div className='landing-page-content'>
     <h1 className='landing-page-text'> Find your dream build!</h1> 
     <h2 className='landing-page-texts'>Join the JDM community</h2>
     <h3 className='landing-page-texts'>Home to a growing collection of builds and users</h3>
      <div className='landing-button'>
        <SignupFormModal1 />
      </div>
   </div>
   
  </div>
 )
}
export default LandingPage