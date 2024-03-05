import React, { useState } from 'react';
<<<<<<< HEAD
import { getAuth,createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showCustomErrorToast } from '../../component/CustomToast';
//core components
import { app } from '../../authentication/Firebase';
import './login.css';
const auth = getAuth(app);
import CustomWave from '../../component/CustomWave';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
=======
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showCustomErrorToast } from '../../component/CustomToast';
import { useTranslation, initReactI18next } from 'react-i18next'
import i18n from '../../configuration/i18n';
import { app } from '../../authentication/Firebase';
import './login.css';
import CustomWave from '../../component/CustomWave';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

initReactI18next.init(i18n)
const auth = getAuth(app);
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const { t } = useTranslation();

>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully');
<<<<<<< HEAD
        navigate("/Home");
      } else {
        alert("Please enter a valid email and password");
=======
        navigate(t("/Dashboard"));
      } else {
        alert(t("Please enter a valid email and password"));
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
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


<<<<<<< HEAD
  const signUpWithGoogle = async () => {
=======
  const signInWithGoogle = async () => {
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google successfully', result.user);
<<<<<<< HEAD
      navigate("/Home");
=======
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate("/Dashboard");
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
    } catch (error) {
      showCustomErrorToast('Error signing in with Google: ' + error.message);
    }
  };

<<<<<<< HEAD

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

=======
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="row">
<<<<<<< HEAD
        <div className="col-12 col-md-8 mx-auto">
          <div className="mt-5 px-3">
            <div className="mb-4 text-center">
              <h1 style={{ fontFamily: "times", fontSize: "3rem", fontWeight: "500", color: "black" }}>Vevaar</h1>
=======
        <div className="col-12 col-md-11 mx-auto mt-5">
          <div className="mt-5 px-3">
            <div className="mb-4 text-center">
              <h1 style={{ fontFamily: "times", fontSize: "3rem", fontWeight: "500", color: "black" }}>{t('Vevaar')}</h1>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
            </div>

            <form onSubmit={signUp}>
              <div className="row gy-3 px-5">

                <div className="col-12 mb-2">
<<<<<<< HEAD
                  <input placeholder='Email' className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="col-12 mb-2 password-wrapper">
                  <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  {/* <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button> */}
=======
                  <input placeholder={t('Email')} className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="col-12 mb-2 position-relative">
                  <input type={showPassword ? "text" : "password"} className="form-control" placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="position-absolute top-50 end-0 translate-middle-y me-4" style={{ cursor: 'pointer', fontSize: "1.5rem", color: "white" }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                </div>


                <div className="col-12">
                  <div className="d-grid">
<<<<<<< HEAD
                    <button className="btn btn-lg" type="submit" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }}>Sign Up</button>
=======
                    <button className="btn btn-lg" type="submit" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }}>{t('Sign Up')}</button>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex gap-2 flex-column justify-content-center mt-3 mt-md-5 text-center">
<<<<<<< HEAD
                <a href='/Login' className="link-secondary text-decoration-none">Already have an account ! Register</a>
                <label style={{ marginTop: 10, backgroundColor: 'white', color: 'black' }} type="button" onClick={signUpWithGoogle}>
                  <FaGoogle />
=======
                <a href='/Login' className="link-secondary text-decoration-none">{t('Already have an account ! Login')}</a>
                <label style={{ marginTop: 10, backgroundColor: 'white', color: 'black' }} type="button" onClick={signInWithGoogle}>
                  <FcGoogle style={{ fontSize: "2.5rem" }} />
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                </label>
              </div>

              <p>{message}</p>
            </form>
          </div>
        </div>
      </div>
      <CustomWave
        top="91.2%"
        fill="#007BFF"
        height={25}
        amplitude={30}
        speed={0.5}
        points={3}
      />
      <CustomWave
        top="91.8%"
        fill="#20df7f"
        height={50}
        amplitude={40}
        speed={0.3}
        points={5}
      />
    </div>

  );
}

export default Register;

