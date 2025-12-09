import { useState, useEffect } from 'react';
import Home from './Home';
import Messages from './Messages';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');

  // Update body class for dark background on messages page
  useEffect(() => {
    if (page === 'messages') {
      document.body.classList.add('messages-page-body');
    } else {
      document.body.classList.remove('messages-page-body');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('messages-page-body');
    };
  }, [page]);

  return (
    <div className={`app-container ${page === 'messages' ? 'messages-page' : 'home-page'}`}>
      <nav className="app-nav">
        <button
          className={`nav-button ${page === 'home' ? 'active' : ''}`}
          onClick={() => setPage('home')}
        >
          Home
        </button>
        <button
          className={`nav-button ${page === 'messages' ? 'active' : ''}`}
          onClick={() => setPage('messages')}
        >
          Messages
        </button>
      </nav>

      {page === 'home' ? <Home /> : <Messages />}
    </div>
  );
}