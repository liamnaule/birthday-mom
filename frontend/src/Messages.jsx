import { useState, useEffect } from 'react';
import { API } from './api';
import './messages.css';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await API.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Load messages error:', err);
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        setError('Failed to load messages. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) {
      setError('Please fill in both name and message fields.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      await API.post('/messages', {
        name: name.trim(),
        message: msg.trim(),
      });

      setName('');
      setMsg('');
      setSuccess('Message sent successfully!');
      getMessages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Send message error:', err);
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to send message. Please try again.');
      }
    }
  };

  return (
    <div className="msg-container">
      <div className="msg-header">
        <h1 className="msg-title">Birthday Wishes</h1>
        <p className="msg-description">Share your heartfelt message and read wishes from loved ones</p>
      </div>

      <div className="msg-content-wrapper">
        <section className="msg-form-section">
          <h2 className="section-title">Send a Message</h2>
          <form className="msg-form" onSubmit={sendMessage}>
            {error && (
              <div className="msg-error">
                {error}
              </div>
            )}
            {success && (
              <div className="msg-success">
                {success}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                id="name"
                className="msg-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                className="msg-textarea"
                placeholder="Write your birthday wish here..."
                value={msg}
                rows={6}
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>

            <button type="submit" className="msg-btn">
              Send Message
            </button>
          </form>
        </section>

        <section className="msg-wishes-section">
          <h2 className="section-title">Birthday Wishes</h2>
          {loading ? (
            <div className="loading-state">
              <p>Loading messages...</p>
            </div>
          ) : error && messages.length === 0 ? (
            <div className="empty-state">
              <p>{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet. Be the first to send a birthday wish!</p>
            </div>
          ) : (
            <div className="msg-list">
              {messages.map((m) => (
                <div key={m.id} className="msg-card">
                  <div className="msg-card-header">
                    <h4 className="msg-author">{m.name}</h4>
                    <span className="msg-time">
                      {new Date(m.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="msg-text">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
