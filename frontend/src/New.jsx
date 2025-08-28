import React, { useState } from 'react'
import './New.css'

export default function New() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');

  const updateTitle = (e) =>{
    setTitle(e.target.value);
  }

  const updateContent = (e) =>{
    setContent(e.target.value);
  }

  const handleFinish = async (e) =>{
      e.preventDefault();
      if (!title || !content || !mood) {
        alert("Please fill all fields and select a mood!");
        return;
      }
      else{
        const newEntry = {title, content, mood }

        try{
          const res = await fetch("http://localhost:5000/api/add-entry", {
              method : "POST",
              headers : {"content-type" : "application/json"},
              body : JSON.stringify(newEntry)
          });
          
          const data = await res.json();
          console.log("New entry created:", data);

          setTitle("");
          setContent("");
          setMood("");

        } catch(err){
            console.error("Error creating entry:", err);
        }
      }


  }

  return (
    <div>
      <div className="form-container">
        <h2>About today?</h2>
        <form action="">

          <div className="title-input">
            <input 
              type="text" 
              placeholder='title'
              onChange={updateTitle}
              value = {title}
            />
          </div>
          
          <div className="content-input">
            <textarea
              placeholder='todays experince'
              onChange={updateContent}
              value={content}
            />
          </div>
          
          <div className="mood-input">

            <h2>Mood: </h2>
            <button 
              type='button' onClick={()=>{setMood('normal')}}
              className={mood === 'normal' ? 'selected' : ''}
            >
              Normal
            </button>

            <button 
              type='button' onClick={()=>{setMood('happy')}}
              className={mood === 'happy' ? 'selected' : ''}
            >
              Happy
            </button>

            <button 
              type='button' onClick={()=>{setMood('surprised')}}
              className={mood === 'surprised' ? 'selected' : ''}
            >
              Surprised
            </button>

            <button 
              type='button' onClick={()=>{setMood('sad')}}
              className={mood === 'sad' ? 'selected' : ''}
            >
              Sad
            </button>
          </div>
          
          <div className="submit-container">
            <button 
              type="submit"
              onClick={handleFinish}
            >
              ✅ Save
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}