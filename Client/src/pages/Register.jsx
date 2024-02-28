import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../authentication/Firebase';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully');
        navigate("/Home");
      } else {
        alert("Please enter all details");
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      setMessage(error.message);
    }
    setEmail('');
    setPassword('');
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed up with Google successfully', result.user);
      navigate("/Home");
    } catch (error) {
      console.error('Error signing up with Google:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={signUp}>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign Up</button>
        <button style={{margin:10,backgroundColor:'white',color:'black'}} type="button" onClick={signUpWithGoogle}>
          Continue with Google
          </button>
        <p style={{ fontSize: 18 }}>Already have an account! <a href='/Login'>Login</a></p>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Register;
