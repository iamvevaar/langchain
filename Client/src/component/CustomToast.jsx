<<<<<<< HEAD

=======
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
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
<<<<<<< HEAD
        style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' }, // Adjusted for semi-transparent background
=======
        style: { backgroundColor: 'rgb(217,217,217)' }, // Adjusted for semi-transparent background
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        closeButton: true,
<<<<<<< HEAD
    });
};
=======
    });
};
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
