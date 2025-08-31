import React, { useEffect, useState } from 'react';
import './History.css';
import ViewEntry from './ViewEntry';
import EditEntry from './EditEntry';

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

  const deleteEntry = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/delete/${id}`, {
        method: "DELETE"
      });
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (er) {
      console.log('error', er);
    }
  };

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

                  <div className="buttons">
                    <div className="mood-container">
                      <p>{entry.mood}</p>
                    </div>

                    {/* Edit button */}
                    <button
                      className="edit"
                      onClick={() => {
                        if (selectedEntry?._id === entry._id && mode === 'edit') {
                          setMode(null);
                          setSelectedEntry(null);
                        } else {
                          setSelectedEntry(entry);
                          setMode('edit');
                        }
                      }}
                    >
                      {selectedEntry?._id === entry._id && mode === 'edit' ? 'Cancel' : 'Edit'}
                    </button>

                    {/* View button */}
                    <button
                      className="view"
                      onClick={() => {
                        if (selectedEntry?._id === entry._id && mode === 'view') {
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

                    {/* Delete button */}
                    <button
                      className="delete"
                      onClick={async () => {
                        const confirmed = window.confirm("Are you sure to delete?");
                        if (confirmed) {
                          await deleteEntry(entry._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded view (View / Edit) */}
              <div
                className={`viewHistory ${
                  (mode === 'view' || mode === 'edit') && selectedEntry?._id === entry._id
                    ? 'active'
                    : ''
                }`}
              >
                {mode === 'view' && selectedEntry?._id === entry._id && (
                  <ViewEntry entry={selectedEntry} />
                )}

                {mode === 'edit' && selectedEntry?._id === entry._id && (
                  <EditEntry
                    entry={selectedEntry}
                    onSave={(updatedEntry) => {
                      setEntries((prev) =>
                        prev.map((e) => (e._id === updatedEntry._id ? updatedEntry : e))
                      );
                      setMode(null);
                      setSelectedEntry(null);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
