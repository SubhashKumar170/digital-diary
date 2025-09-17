import React, { useState } from 'react'
import './New.css'

export default function New() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');

  const handleFinish = async (e) => {
    e.preventDefault();
    if (!title || !content || !mood) {
      alert("Please fill all fields and select a mood!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/add-entry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: 'include', // ✅ include cookie
        body: JSON.stringify({ title, content, mood })
      });

      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      console.log("New entry created:", data);

      setTitle("");
      setContent("");
      setMood("");
    } catch (err) {
      console.error("Error creating entry:", err);
    }
  }

  return (
    <div className="form-container">
      <h2>About today?</h2>
      <form onSubmit={handleFinish}>
        <div className="title-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="content-input">
          <textarea
            placeholder="Today's experience"  // ✅ fixed single quote
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className="mood-input">
          <h2>Mood: </h2>
          {['normal','happy','surprised','sad'].map(m => (
            <button
              key={m}
              type='button'
              onClick={() => setMood(m)}
              className={mood === m ? 'selected' : ''}
            >
              {m.charAt(0).toUpperCase()+m.slice(1)}
            </button>
          ))}
        </div>

        <div className="submit-container">
          <button type="submit">✅ Save</button>
        </div>
      </form>
    </div>
  )
}
