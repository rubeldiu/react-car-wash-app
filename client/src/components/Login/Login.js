import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import googleIcon from '../../assets/logos/google.png';
import logo from '../../assets/logos/logo.png';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from './loginManager';

// ============================================================================================

const Login = () => {
  // Initialize Firebase
  initializeLoginFramework();

  //Handle New User:
  const [newUser, SetNewUSer] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    success: false,
  });

// Error Message:
const [error, setError] = useState("")

// Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

// Redirecting to home/ taskRegistration Component if signed In successfully
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || {
    from: { pathname: '/' },
  };

  // Google Sign In
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => handleResponse(res, true));
  };
  

// Handle Response
  const handleResponse = (res, redirect) => { 
    //console.log(res.error)
    if (res.error) {
      newUser && setError(res.error)
      !newUser && setError(res.error)
    } else {
        setUser(res);
        setLoggedInUser(res)
        redirect && history.replace(from);
        newUser && setError("")
        !newUser && setError("")
    }
}


  // =========================================================

  // Validate user signIn/ SignUp form
  const handleBlur = (e) => {
    // debugger;
    let isFieldValid = true;
    // console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    // Password with at least 1 number
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    
  };

// When form submitted:
  const handleUserSubmit = () => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    
  }

  // React hook form for extra form validation and error message
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className='container'>
      <div className="d-flex justify-content-center flex-column align-items-center my-5">
      <div className="row mb-2">
        <Link to ='/'>
        <div className="col-md-12  text-center mb-3">
          <img className="w-25" src={logo} alt=""/>
        </div>
        </Link>
       
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {/* If not a new user then show this form, else Sign Up form*/}
          {!newUser ? (
            <form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              {/* Show error message if user not exist or password is wrong or other error */}
              {user != null && (
                <p style={{ maxWidth: '400px' }} className='text-danger'>
                  {/* * {user.error} */}
                  {error}
                </p>
              )}
              <h4 className='font-weight-bold mb-3'>Login</h4>
              <div className='form-group'>
                <input className='form-control'
                  onBlur={handleBlur}
                  name='email'
                  type='email'
                  placeholder='Email'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </div>
              <div className='form-group'>
                <input className='form-control'
                  onBlur={handleBlur}
                  name='password'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true })}
                />
                {errors.password && (
                  <span className='error'>Password is required</span>
                )}
              </div>

            
              <div className='form-group'>
                <button
                  style={{ width: '100%' }}
                  className='btn btn-warning'
                  type='submit'
                >
                  Login
                </button>
              </div>

              <div className='form-group text-center mt-3' id='formForget'>
                <span>Don't have an account?</span>{' '}
                <span
                  style={{ cursor: 'pointer', color: '#F9A51A' }}
                  onClick={() => SetNewUSer(true)}
                >
                  Create an account
                </span>
              </div>

              <p className='horizontal-or'> or </p>
              <div className='social-login'>
                
                <button className="btn" onClick={googleSignIn}>
                  <img src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </button>
               
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              {/* Show error message if user not exist or password is wrong */}
              {user != null && (
                <p style={{ maxWidth: '400px' }} className='text-danger'>
                  {/* * {user.error} */}
                  {error}
                </p>
              )}
              <h4 className='font-weight-bold mb-3'>Login</h4>
              <div className='form-group' >
                <input className='form-control'
                  onBlur={handleBlur}
                  name='name'
                  type='text'
                  placeholder='Name'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Name is required</span>
                )}
              </div>
              <div className='form-group' >
                <input className='form-control'
                  onBlur={handleBlur}
                  name='email'
                  type='email'
                  placeholder='Email'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </div>
              <div className='form-group' >
                <input className='form-control'
                  onBlur={handleBlur}
                  name='password'
                  type='password'
                  placeholder='Password'
                  ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && (
                  <span className='error'>
                    6 character with at least 1 digit is required
                  </span>
                )}
              </div>
              <div className='form-group' >
                <input className='form-control'
                  onBlur={handleBlur}
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  ref={register({
                    validate: (value) => value === watch('password'),
                  })}
                />
                {errors.confirmPassword && (
                  <span className='error'>Password don't match</span>
                )}
              </div>

              <div className='form-group'>
                <button
                  style={{ width: '100%' }}
                  className='btn btn-primary'
                  type='submit'
                >
                  Sign Up
                </button>

                <div className='form-group text-center mt-3'
                    style={{ color: 'green' }}
                >
                  {user.success && (
                    <p>
                      User Created Successfully. A verification email sent in
                      your email.
                    </p>
                  )}
                </div>
              </div>

              <div className='form-group text-center mt-2' id='formForget'>
                <span>Already have an account?</span>{' '}
                <span
                  style={{ cursor: 'pointer', color: '#F9A51A' }}
                  onClick={() => SetNewUSer(false)}
                >
                  Login
                </span>
              </div>

              <p className='horizontal-or'> or </p>
              <div className='social-login'>
                
                <button className="btn" onClick={googleSignIn}>
                  <img src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </button>
                
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;