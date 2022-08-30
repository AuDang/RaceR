import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import DemoUser from "../DemoUser/DemoUser";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2 className='login-header'>Login to RaceR </h2>
            <div className='error-container'>
              {errors.length > 0 && (
                <div className='form-error-container'>
                  <span className="error-title">The following errors occurred:</span>
                  {/* <ul className='signin-form-errors'> */}
                  {errors.map((error, ind) => (
                    <li className='error-list' key={ind}>{error}</li>
                  ))}
                  {/* </ul> */}
                </div>
              )}
            </div>
          <label>
            {/* Username or Email */}
            <input
              type="text"
              value={credential}
              placeholder='Username/Email'
              onChange={(e) => setCredential(e.target.value)}
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
          <div className ="login-btn-container">
            <button className ="login-btn"type="submit">Log In</button>
            <DemoUser />
          </ div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
