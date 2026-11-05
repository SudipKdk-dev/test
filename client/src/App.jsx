import { useState, useEffect } from 'react';

function App() {
  const [serverStatus, setServerStatus] = useState('checking...');
  const [serverMessage, setServerMessage] = useState(null);
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [echoResult, setEchoResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check connection to backend
  const checkBackend = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/message');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServerStatus('connected');
      setServerMessage(data);
    } catch (err) {
      setServerStatus('error');
      setServerMessage({ message: 'Unable to reach backend API' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const handleEcho = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setEchoResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>React + Express Web App</h1>
        <p className="subtitle">Simple boilerplate for testing & Docker verification</p>
      </header>

      {/* Backend Status Section */}
      <div className={`card status-card ${serverStatus}`}>
        <div className="status-header">
          <span className="dot"></span>
          <strong>Backend Status: {serverStatus.toUpperCase()}</strong>
        </div>
        {serverMessage && (
          <div className="message-box">
            <p><strong>Message:</strong> {serverMessage.message}</p>
            {serverMessage.timestamp && (
              <small><strong>Timestamp:</strong> {serverMessage.timestamp}</small>
            )}
          </div>
        )}
        <button className="btn" onClick={checkBackend} disabled={loading}>
          {loading ? 'Fetching...' : 'Re-test GET /api/message'}
        </button>
      </div>

      {/* Interactive Testing Components */}
      <div className="grid">
        {/* React State Test */}
        <div className="card">
          <h2>React State Test</h2>
          <p>Local state counter to test client-side reactivity:</p>
          <div className="counter-controls">
            <button className="btn" onClick={() => setCount(c => c - 1)}>-</button>
            <span className="counter-value">{count}</span>
            <button className="btn" onClick={() => setCount(c => c + 1)}>+</button>
          </div>
        </div>

        {/* POST API Test */}
        <div className="card">
          <h2>API POST Test</h2>
          <p>Send text to <code>/api/echo</code> and receive reversed text:</p>
          <form onSubmit={handleEcho} className="echo-form">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              className="input-text"
            />
            <button type="submit" className="btn primary">Send POST</button>
          </form>
          {echoResult && (
            <div className="echo-result">
              <p><strong>Reversed:</strong> {echoResult.reversed}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
