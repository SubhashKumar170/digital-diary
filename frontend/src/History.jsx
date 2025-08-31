import React, { useEffect, useState } from 'react';
import './History.css';
import ViewEntry from './ViewEntry';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [mode, setMode] = useState(null); // view , delete, edit
  
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/all-entries");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.log('error occurred ', err);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="history-container">
      <div className="entries">
        {entries.map((entry, index) => {
          const dateObj = new Date(entry.date);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString('default', { month: 'long' });
          const year = dateObj.getFullYear();

          return (
            <div
              key={entry._id}
              className="entry"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top row with date + title/buttons */}
              <div className="entry-top">
                <div className="date-box">
                  <div className="inner-square">{day}</div>
                  <div className="month-year">
                    <span className="month">{month}</span>
                    <span className="year">{year}</span>
                  </div>
                </div>

                <div className="title-container">
                  <h2>{entry.title}</h2>

                  <div className="buttons">             {/* buttons like delete , edit , view*/}
                    <div className="mood-container">
                      <p>{entry.mood}</p>
                    </div>

                    {/* Edit button */}
                    <button                             
                      className="edit"                    
                      onClick={() => {
                        setSelectedEntry(entry);
                        setMode('edit');
                      }}
                    >
                      Edit
                    </button>

                    {/* delete button */}
                    <button
                      className="delete"
                      onClick={() => {
                        setSelectedEntry(entry);
                        setMode('delete');
                      }}
                    >
                      Delete
                    </button>

                    {/*  view button */}

                    <button
                      className="view"
                      onClick={() => {
                        if (selectedEntry?._id === entry._id && mode === 'view') {   // If already in view mode, hide it
                          setMode(null);
                          setSelectedEntry(null);
                        } else {
                            setSelectedEntry(entry);
                            setMode('view');
                          }
                      }}
                    >
                      {selectedEntry?._id === entry._id && mode === 'view' ? 'Hide' : 'View'}
                    </button>

                  </div>
                </div>
              </div>

              {/* Expanded view goes here */}
              <div
                className={`viewHistory ${
                  mode === 'view' && selectedEntry?._id === entry._id
                    ? 'active'
                    : ''
                }`}
              >
                {mode === 'view' && selectedEntry?._id === entry._id && (
                  <ViewEntry entry={selectedEntry} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
