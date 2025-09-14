import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("Attempting to fetch from http://localhost:8000/api/hello");
    fetch('http://localhost:8000/api/hello')
      .then(response => {
        console.log("Received response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        setMessage(data.message);
      })
      .catch(error => {console.error('error:', error)});
  }, []);


  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Backend says: <strong>{message || 'Loading...'}</strong></p>
      </div>
    </>
  );
}

export default App;