import React, { useEffect, useState } from 'react';
import './History.css';
import ViewEntry from './ViewEntry';
import EditEntry from './EditEntry';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [mode, setMode] = useState(null); // view , delete, edit
  const[loading, setLoading] = useState(true);

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
      const url = `http://localhost:5000/api/all-entries?${query.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.log('error occurred ', err);
    }
    setLoading(false);
  };

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

  const applyFilters = () => {
    fetchEntries({ year, month, mood });
  };

  return (
    <>

      <div className="filter-box">
        <h3 className="filter-title" >Filter: </h3>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>

        <select value={month} onChange={e => setMonth(e.target.value)}>  
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select value={mood} onChange={e => setMood(e.target.value)}>
          <option value="">All Moods</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="normal">Normal</option>
          <option value="surprised">Surprised</option>
        </select>

        <button className = 'apply-btn' onClick={applyFilters}>
          Apply
        </button>
      </div>

      <div className="history-container">
        <div className="entries">
          { loading ? (<p className='loading-text'> Loading</p>) : entries.length > 0 ? (
            entries.map((entry, index) => {
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
            })
          ) : (
            <p className="no-entries-text">No entries found for this filter.</p>
          )}
        </div>
      </div>
    </>
  );
}
