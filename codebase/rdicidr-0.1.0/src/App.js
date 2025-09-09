import React, { useState, useEffect } from 'react';
import IPv4Addr from './IPv4Addr';
import './App.css';

function App() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/secret')
      .then(response => response.json())
      .then(data => {
        setSecret(data.secret);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load secret');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>CIDR Calculator</div>
        <div style={{ fontSize: '14px', marginTop: '10px' }}>
          {loading
            ? 'Loading secret...'
            : error
              ? `Error: ${error}`
              : `MY_SECRET: ${secret}`}
        </div>
      </header>
      <IPv4Addr />
      <footer>
        <hr />
        If you find this tool useful, you might enjoy reading my blog:{' '}
        <a href="https://rderik.com">rderik.com</a>
      </footer>
    </div>
  );
}

export default App;
