import React, { useState, useEffect } from 'react';

export const BACKEND_URL: string = "http://127.0.0.1:8000/";

const Home: React.FC = () => {

    const [data, setData] = useState<string>('');

    // useEffect(() => {
    //   fetch(`${BACKEND_URL}api/hello`)
    //     .then(response => response.json())
    //     .then(data => setData(data));
    
    // }, [])
    

    return (
        <div>
            <h1>Welcome to Fine-Tuning Chatbot!!!!!</h1>
            <p>data : { data }</p>
        </div>
    );
}

export default Home;