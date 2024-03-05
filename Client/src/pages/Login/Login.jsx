import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showCustomErrorToast } from '../../component/CustomToast';
import sideimage from '../../assets/121Bg.png'
import { app } from '../../authentication/Firebase';
import './login.css';
<<<<<<< HEAD
const auth = getAuth(app);
import CustomWave from '../../component/CustomWave';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
=======
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from '../../configuration/i18n'
import CustomWave from '../../component/CustomWave';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const auth = getAuth(app);
initReactI18next.init(i18n);

function Login() {
  const { t } = useTranslation(); // Use useTranslation hook
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD


  const validateEmail = (email) => {
    // Regular expression for basic email validation
=======
  const validateEmail = (email) => {
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      if (validateEmail(email) && password.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
<<<<<<< HEAD
        console.log('User signed in successfully');
        navigate("/Home");
      } else {
        showCustomErrorToast("Please enter a valid email and password!");
=======
        localStorage.setItem('user', JSON.stringify({ email })); 
        console.log('User signed in successfully');
        navigate("/Dashboard");
      } else {
        showCustomErrorToast(t("Please enter a valid email and password!"));
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      showCustomErrorToast(error.message);
    }
    setEmail('');
    setPassword('');
  };


  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google successfully', result.user);
<<<<<<< HEAD
      navigate("/Home");
=======
      // Store user information in localStorage
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
    <div className="container-fluid h-90">
      <ToastContainer />
      <div className="row h-100">
        <div className="col-12">
          <section className="p-4 p-md-5 p-xl-5" style={{ minHeight: "90vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div className="col-md-4 d-none d-md-block" style={{ flexGrow: 1 }}>
              <img src={sideimage} alt="" className="scale-up-animation" style={{ objectFit: "cover", height: "500px", width: "900px", marginLeft: "-25rem" }} />

            </div>

            <div className="col-12 col-md-6" style={{ flexGrow: 2 }}>
              <div className="mt-5 px-3">
                <div className="mb-4 text-center">
<<<<<<< HEAD
                  <h1 style={{ fontFamily: "times", fontSize: "3rem", fontWeight: "500", color: "black" }}>Vevaar</h1>
=======
                  <h1 style={{ fontFamily: "times", fontSize: "3rem", fontWeight: "500", color: "black" }}>{t('Vevaar')}</h1>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                </div>

                <form onSubmit={signIn}>
                  <div className="row gy-3 px-5">
                    <div className="col-12 mb-2">
<<<<<<< HEAD
                      <input placeholder='Email' className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-12 mb-2 position-relative ">
                      <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                      {/* <button type="button" className="btn position-absolute end-0" onClick={togglePasswordVisibility} style={{ marginTop: "12px", marginRight: "10px", background: "none" }}>
                        {showPassword ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                      </button> */}
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-lg " type="submit" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }}>Login</button>
=======
                      <input placeholder={t('Email')} className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-12 mb-2 position-relative">
                      <input type={showPassword ? "text" : "password"} className="form-control" placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                      <span className="position-absolute top-50 end-0 translate-middle-y me-4" style={{ cursor: 'pointer', fontSize: "1.5rem", color: "white" }} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-lg " type={t("submit")} style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }}>{t('Login')}</button>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex gap-2 flex-column justify-content-center mt-3 mt-md-5 text-center">
<<<<<<< HEAD
                    <a href='/Register' className="link-secondary text-decoration-none">Does Not Have an Account Yet? Register</a>
                    <label style={{ marginTop: 10, backgroundColor: 'white', color: 'black' }} type="button" onClick={signInWithGoogle}>
                      <FaGoogle />
=======
                    <a href='/Register' className="link-secondary text-decoration-none">{t('Does Not Have an Account Yet? Register')}</a>
                    <label style={{ marginTop: 20, backgroundColor: 'white', color: 'black' }} type="button" onClick={signInWithGoogle}>
                      <FcGoogle style={{ fontSize: "2.5rem" }} />
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
                    </label>
                  </div>

                  <p>{message}</p>
                </form>
              </div>
            </div>
          </section>
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

export default Login;
<<<<<<< HEAD

=======
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
