import React, { useEffect, useState } from 'react';
import './History.css';

export default function History() {
  const [entries, setEntries] = useState([]);

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
                  <div className="mood-container"><p>{entry.mood}</p></div>
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                  <button className="view">View</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
