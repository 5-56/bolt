import React, { useState } from 'react';
    import axios from 'axios';
    import './App.css';

    const App = () => {
      const [response, setResponse] = useState('');
      const [history, setHistory] = useState([]);
      const [model, setModel] = useState('ollama');
      const [query, setQuery] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const callAI = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError('');
        try {
          const res = await axios.post(`/api/${model}`, { query });
          const newResponse = res.data.response;
          setResponse(newResponse);
          setHistory([...history, { query, response: newResponse }]);
        } catch (err) {
          setError('Error calling AI service');
        } finally {
          setLoading(false);
        }
      };

      const startNewConversation = () => {
        setResponse('');
        setHistory([]);
        setQuery('');
        setError('');
      };

      return (
        <div className="app">
          <div className="sidebar">
            <h2>Conversation History</h2>
            <button onClick={startNewConversation}>New Conversation</button>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  <strong>Query:</strong> {item.query}<br />
                  <strong>Response:</strong> {item.response}
                </li>
              ))}
            </ul>
          </div>
          <div className="main">
            <h1>AI Integration</h1>
            <div className="settings">
              <label>
                Select Model:
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="ollama">Ollama</option>
                  <option value="openai">OpenAI</option>
                  <option value="deepseek">DeepSeek</option>
                  <option value="glhf">GLHF Chat</option>
                  <option value="kimi">Kimi</option>
                </select>
              </label>
            </div>
            <div className="query-input">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query"
              />
              <button onClick={callAI} disabled={loading}>
                {loading ? 'Loading...' : 'Call AI'}
              </button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="response">
              <h2>Response:</h2>
              <p>{response}</p>
            </div>
          </div>
        </div>
      );
    };

    export default App;
