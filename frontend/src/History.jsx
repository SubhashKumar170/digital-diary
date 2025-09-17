import React, { useEffect, useState } from 'react';
import './History.css';
import ViewEntry from './ViewEntry';
import EditEntry from './EditEntry';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [mode, setMode] = useState(null); // view , edit
  const [loading, setLoading] = useState(true);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async (filters = {}) => {
    try {
      setLoading(true);
      let query = [];
      if (filters.year) query.push(`year=${filters.year}`);
      if (filters.month) query.push(`month=${filters.month}`);
      if (filters.mood) query.push(`mood=${filters.mood}`);
      const url = `http://localhost:5050/api/all-entries?${query.join("&")}`;

      const res = await fetch(url, { credentials: 'include' }); // ✅ include cookie
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.log('Error occurred', err);
    }
    setLoading(false);
  };

  const deleteEntry = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/delete/${id}`, {
        method: "DELETE",
        credentials: 'include' // ✅ include cookie
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (er) {
      console.log('Error', er);
    }
  };

  const applyFilters = () => {
    fetchEntries({ year, month, mood });
  };

  return (
    <>
      <div className="filter-box">
        <h3 className="filter-title">Filter: </h3>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All Years</option>
          {[2020,2021,2022,2023,2024,2025,2026].map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={mood} onChange={e => setMood(e.target.value)}>
          <option value="">All Moods</option>
          {['happy','sad','normal','surprised'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <button className='apply-btn' onClick={applyFilters}>Apply</button>
      </div>

      <div className="history-container">
        <div className="entries">
          { loading ? (<p className='loading-text'> Loading</p>) : entries.length > 0 ? (
            entries.map((entry, index) => {
              const dateObj = new Date(entry.date);
              const day = dateObj.getDate();
              const monthStr = dateObj.toLocaleString('default', { month: 'long' });
              const yearStr = dateObj.getFullYear();

              return (
                <div key={entry._id} className="entry" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="entry-top">
                    <div className="date-box">
                      <div className="inner-square">{day}</div>
                      <div className="month-year">
                        <span className="month">{monthStr}</span>
                        <span className="year">{yearStr}</span>
                      </div>
                    </div>

                    <div className="title-container">
                      <h2>{entry.title}</h2>
                      <div className="buttons">
                        <div className="mood-container"><p>{entry.mood}</p></div>

                        <button className="edit" onClick={() => {
                          setSelectedEntry(selectedEntry?._id === entry._id && mode==='edit' ? null : entry);
                          setMode(selectedEntry?._id === entry._id && mode==='edit' ? null : 'edit');
                        }}>
                          {selectedEntry?._id === entry._id && mode === 'edit' ? 'Cancel' : 'Edit'}
                        </button>

                        <button className="view" onClick={() => {
                          setSelectedEntry(selectedEntry?._id === entry._id && mode==='view' ? null : entry);
                          setMode(selectedEntry?._id === entry._id && mode==='view' ? null : 'view');
                        }}>
                          {selectedEntry?._id === entry._id && mode === 'view' ? 'Hide' : 'View'}
                        </button>

                        <button className="delete" onClick={async () => {
                          if (window.confirm("Are you sure to delete?")) {
                            await deleteEntry(entry._id);
                          }
                        }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`viewHistory ${(mode==='view' || mode==='edit') && selectedEntry?._id === entry._id ? 'active' : ''}`}>
                    {mode==='view' && selectedEntry?._id===entry._id && <ViewEntry entry={selectedEntry} />}
                    {mode==='edit' && selectedEntry?._id===entry._id && <EditEntry entry={selectedEntry} onSave={(updatedEntry) => {
                      setEntries(prev => prev.map(e => e._id===updatedEntry._id ? updatedEntry : e));
                      setMode(null);
                      setSelectedEntry(null);
                    }} />}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-entries-text">No entries found.</p>
          )}
        </div>
      </div>
    </>
  );
}
