import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showCustomErrorToast } from '../component/CustomToast';
import sideimage from '../assets/121Bg.png'
//core components
import { app } from '../authentication/Firebase';
import '../index.css';
const auth = getAuth(app);
import CustomWave from '../component/CustomWave';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const signIn = async (e) => {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
        navigate("/Home");
      } else {
        showCustomErrorToast("Please enter email and password!");
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
      navigate("/Home");
    } catch (error) {
      showCustomErrorToast('Error signing in with Google: ' + error.message);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid h-90">
      <ToastContainer />
      <div className="row h-100">
        <div className="col-12">
          <section className="p-4 p-md-5 p-xl-5" style={{ minHeight: "90vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            {/* Image Container Adjusted Inside the Section */}
            <div className="col-md-4 d-none d-md-block" style={{ flexGrow: 1 }}>
              <img src={sideimage} alt="" className="scale-up-animation" style={{ objectFit: "cover", height: "500px", width: "900px", marginLeft: "-25rem" }} />

            </div>

            <div className="col-12 col-md-6" style={{ flexGrow: 2 }}>
              <div className="mt-5 px-3">
                <div className="mb-4 text-center">
                  <h1 style={{ fontFamily: "times", fontSize: "3rem", fontWeight: "500" , color:"black"}}>Vevaar</h1>
                </div>

                <form onSubmit={signIn}>
                  <div className="row gy-3 px-5">
                    <div className="col-12 mb-2">
                      <input placeholder='Email' className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-12 mb-2 position-relative ">
                      <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" className="btn position-absolute top-0 end-0" onClick={togglePasswordVisibility} style={{ marginTop: "12px", marginRight: "10px", background: "none" }}>
                        {showPassword ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                      </button>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-lg " type="submit" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }}>Login</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex gap-2 flex-column justify-content-center mt-3 mt-md-5 text-center">
                    <a href='/Register' className="link-secondary text-decoration-none">Does Not Have an Account Yet? Register</a>
                    <label style={{ marginTop: 10, backgroundColor: 'white', color: 'black'}} type="button" onClick={signInWithGoogle}>
                      <FaGoogle />
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

