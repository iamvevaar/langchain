import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/Frame.png';
<<<<<<< HEAD
import './splash.css';

const Splash = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('lang');
    const [count, setCount] = useState(0);
=======
import i18n from '../../configuration/i18n';
import {useTranslation,initReactI18next} from 'react-i18next'
import './splash.css';

initReactI18next.init(i18n)

const Splash = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('lang');
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
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
<<<<<<< HEAD
        setSelectedLanguage(e.target.value);
    };

    const handleCount = () => {
        localStorage.setItem('count', 1);
        setCount(1);
        navigate('/Home', { state: { count: 1 } })
=======
        const lang = e.target.value
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang)
    };

    const handleNavigate = () => {
        navigate('/Register')
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
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
<<<<<<< HEAD
            <div>
                <span style={{ color: "white" }}>Your free trial count: {count}</span>
            </div>
            <h1>Welcome to Vevaar!</h1> <br />
            <h4 style={{ color: "white" }}>Shabdo ka saar hai vevaar...</h4> <br />
            <select value={selectedLanguage} onChange={handleLanguageChange} className="card-deck-dropdown">
                <option value="lang">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <button disabled={buttonDisabled} className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={handleCount}>Free Trial</button>
=======
            <h1 style={{color : 'whitesmoke'}}>{t('Welcome to Vevaar!')}</h1> <br />
            <h4 style={{ color: "white" }}>{t('Shabdo ka saar hai vevaar...')}</h4> <br />
            <select value={selectedLanguage} onChange={handleLanguageChange} className="card-deck-dropdown">
                <option value="lang">{t('selectLanguage')}</option>
                <option value="en">{t('English')}</option>
                <option value="es">{t('spanish')}</option>
                <option value="fr">{t('French')}</option>
                <option value="hi">{t('Hindi')}</option>
                <option value="gu">{t('Gujarati')}</option>
                <option value="mr">{t('Marathi')}</option>
                <option value="pa">{t('Punjabi')}</option>
                <option value="bn">{t('Bangali')}</option>
                <option value="kn">{t('Kanada')}</option>
                <option value="ta">{t('Tamil')}</option>
                <option value="te">{t('Telugu')}</option>
            </select>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <button disabled={buttonDisabled} className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={handleNavigate}>{t('Next')}</button>
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
            </div>
        </div>
    );
}
export default Splash;
