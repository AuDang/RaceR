import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords don\'t match']);
  };

  return (
    <div className='container'>
      <div className='form-container'>
    <form onSubmit={handleSubmit}>
      <h2 className='signup-header'>Sign up for RaceR</h2>
        <div className='error-container'>
          {errors.length > 0 && (
            <div className='form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {/* <ul className='signin-form-errors'> */}
              {errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
              {/* </ul> */}
            </div>
          )}
        </div>
      <label>
        {/* Email */}
        <input
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        {/* Username */}
        <input
          type="text"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        {/* Password */}
        <input
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        {/* Confirm Password */}
        <input
          type="password"
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <div className ="signup-btn-container">
      <button className='signup-btn-subtmit'type="submit">Sign Up</button>
        </div>
    </form>
      </div>
    </div>
  );
}

export default SignupForm;