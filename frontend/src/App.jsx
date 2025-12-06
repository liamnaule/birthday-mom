import { useState } from 'react';
import Home from './Home';
import Messages from './Messages';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-container">
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