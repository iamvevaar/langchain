import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertIcon from '../assets/Frame.png';

// Custom Toast Content Component
export const CustomToastContent = ({ message }) => (
    <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
        <img src={alertIcon} alt="Alert" style={{ width: 24, height: 24, marginRight: 8 }} />
        {message}
    </div>
);

// Function to show custom error toast
export const showCustomErrorToast = (message) => {
    toast(<CustomToastContent message={message} />, {
        style: { backgroundColor: 'rgb(217,217,217)' }, // Adjusted for semi-transparent background
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        closeButton: true,
    });
};