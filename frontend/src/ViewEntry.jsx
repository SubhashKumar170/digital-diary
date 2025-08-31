import React from 'react';
import './ViewEntry.css'

export default function ViewEntry({ entry }) {

  return (
    <div className="entry-card">

        <div className="entry-details">
          <p>{entry.content}</p>
        </div>
  
    </div>
  );
}
