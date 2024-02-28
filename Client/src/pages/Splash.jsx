import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('lang');
    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true); // State to manage button disabled/enabled

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
        navigate('/Home',{ state: { count: 1 } })
    }

    return (
        <div>
            <div>
                <span>Your free trial count: {count}</span>
            </div>
            <h1>Welcome to Vevaar!</h1>
            <h4>Shabdo ka saar hai vevaar...</h4>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="lang">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
            <div style={{ marginTop: 15 }}>
                <button disabled={buttonDisabled} onClick={handleCount}>Free Trial</button>
            </div>
        </div>
    );
}
export default Splash;
