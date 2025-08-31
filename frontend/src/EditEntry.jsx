import React, { useState } from "react";
import './EditEntry.css';

export default function EditEntry({ entry, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/update/${entry._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || entry.title,     // keep old value if left empty
          content: content || entry.content,
        }),
      });

      if (!res.ok) throw new Error("Failed to update entry");
      const updated = await res.json();
      onSave(updated);
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  return (
    <div className="edit-entry">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={`previous title : ${entry.title}`}   // placeholder = old title
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`previous content : ${entry.content}`} // placeholder = old content
      />

      <button className="confirm" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
}
