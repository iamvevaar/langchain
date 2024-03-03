import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ask = () => {
    const [postData, setPostData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://t8ey87nhw3.execute-api.us-east-1.amazonaws.com/dev/translate', {
                    text: 'New Post',
                    lang: 'fr',
                });
                console.log(response.data)
                setPostData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (

        <div>
            {console.log(postData)}
            {postData && (
                <div>
                    <h1>{postData}</h1>
                </div>
            )}
        </div>
    );
};

export default Ask;