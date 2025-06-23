import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState({
    llama3: [],
    deepseek: []
  });
  const [loading, setLoading] = useState({
    llama3: false,
    deepseek: false
  });
  const [responseTimes, setResponseTimes] = useState({
    llama3: null,
    deepseek: null
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    // Reset states
    setConversations({
      llama3: [...conversations.llama3, { text: input, sender: 'user' }],
      deepseek: [...conversations.deepseek, { text: input, sender: 'user' }]
    });
    setInput('');
    setLoading({ llama3: true, deepseek: true });
    setResponseTimes({ llama3: null, deepseek: null });

    // Run both models in parallel
    const startTime = Date.now();
    
    const llamaPromise = fetchModelResponse('llama3', input);
    const deepseekPromise = fetchModelResponse('deepseek-coder', input);

    const [llamaResult, deepseekResult] = await Promise.allSettled([
      llamaPromise,
      deepseekPromise
    ]);

    const endTime = Date.now();
    
    setLoading({ llama3: false, deepseek: false });

    // Process results
    if (llamaResult.status === 'fulfilled') {
      setConversations(prev => ({
        ...prev,
        llama3: [...prev.llama3, { 
          text: llamaResult.value.response, 
          sender: 'llama3',
          time: (llamaResult.value.endTime - startTime) / 1000
        }]
      }));
      setResponseTimes(prev => ({
        ...prev,
        llama3: (llamaResult.value.endTime - startTime) / 1000
      }));
    }

    if (deepseekResult.status === 'fulfilled') {
      setConversations(prev => ({
        ...prev,
        deepseek: [...prev.deepseek, { 
          text: deepseekResult.value.response, 
          sender: 'deepseek',
          time: (deepseekResult.value.endTime - startTime) / 1000
        }]
      }));
      setResponseTimes(prev => ({
        ...prev,
        deepseek: (deepseekResult.value.endTime - startTime) / 1000
      }));
    }
  };

  const fetchModelResponse = async (model, prompt) => {
    const startTime = Date.now();
    const response = await fetch(`http://localhost:8080/api/chat/${model}/${encodeURIComponent(prompt)}`);
    if (!response.ok) throw new Error(`Failed to get response from ${model}`);
    const text = await response.text();
    return {
      response: text,
      endTime: Date.now()
    };
  };

  return (
    <div className="app-container">
      <h1>Model Performance Comparison</h1>
      
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Enter your prompt..."
          disabled={loading.llama3 || loading.deepseek}
        />
        <button 
          onClick={handleSend}
          disabled={!input || loading.llama3 || loading.deepseek}
        >
          {loading.llama3 || loading.deepseek ? 'Processing...' : 'Compare Models'}
        </button>
      </div>

      {responseTimes.llama3 && responseTimes.deepseek && (
        <div className="performance-summary">
          <h3>Response Times:</h3>
          <p>Llama3: {responseTimes.llama3.toFixed(2)} seconds</p>
          <p>DeepSeek-Coder: {responseTimes.deepseek.toFixed(2)} seconds</p>
          <p className="winner">
            Winner: {responseTimes.llama3 < responseTimes.deepseek ? 'Llama3' : 'DeepSeek-Coder'}
          </p>
        </div>
      )}

      <div className="comparison-container">
        <div className="model-column">
          <h2>Llama3</h2>
          <div className="conversation">
            {conversations.llama3.map((msg, i) => (
              <div key={`llama-${i}`} className={`message ${msg.sender}`}>
                <div className="message-sender">{msg.sender === 'user' ? 'You' : 'Llama3'}</div>
                <div className="message-content">{msg.text}</div>
                {msg.time && <div className="message-time">{msg.time.toFixed(2)}s</div>}
              </div>
            ))}
            {loading.llama3 && <div className="loading">Llama3 is thinking...</div>}
          </div>
        </div>

        <div className="model-column">
          <h2>DeepSeek-Coder</h2>
          <div className="conversation">
            {conversations.deepseek.map((msg, i) => (
              <div key={`deepseek-${i}`} className={`message ${msg.sender}`}>
                <div className="message-sender">{msg.sender === 'user' ? 'You' : 'DeepSeek'}</div>
                <div className="message-content">{msg.text}</div>
                {msg.time && <div className="message-time">{msg.time.toFixed(2)}s</div>}
              </div>
            ))}
            {loading.deepseek && <div className="loading">DeepSeek is thinking...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;