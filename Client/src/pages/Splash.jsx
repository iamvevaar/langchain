import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/Frame.png';

function Splash() {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('lang');
    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true); 

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisitedSplash');
        if (!hasVisited || selectedLanguage !== 'lang') {
            localStorage.setItem('hasVisitedSplash', true);
        }
        if (selectedLanguage !== 'lang') {
            setButtonDisabled(false);
        }
    }, [selectedLanguage]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleCount = () => {
        localStorage.setItem('count', 1);
        setCount(1);
        navigate('/Home', { state: { count: 1 } })
    }
    useEffect(() => {
        const originalBackground = document.body.style.background;
        document.body.style.background = "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)";
        return () => {
            document.body.style.background = originalBackground;
        };
    }, []);

    return (
        <div style={{ height: "41.9rem", width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <img src={image} alt="Description" style={{ width: '18rem', height: "18rem" }} />
            <div>
                <span style={{ color: "white" }}>Your free trial count: {count}</span>
            </div>
            <h1>Welcome to Vevaar!</h1>
            <h4 style={{ color: "white" }}>Shabdo ka saar hai vevaar...</h4>
            <select value={selectedLanguage} onChange={handleLanguageChange} className="card-deck-dropdown">
                <option value="lang">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                <button disabled={buttonDisabled} className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={handleCount}>Free Trial</button>
            </div>
        </div>
    );
}
export default Splash;
