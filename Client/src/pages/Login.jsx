import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../authentication/Firebase';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
        navigate("/Home");
      } else {
        alert("Please enter correct email and password!");
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

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google successfully', result.user);
      navigate("/Home");
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign In</button>
        <button style={{marginTop:10,backgroundColor:'white',color:'black'}} type="button" onClick={signInWithGoogle}>
          Continue with Google
          </button>
        <p style={{ fontSize: 18 }}>New User! <a href='/Register'>Sign Up</a></p>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Login;
