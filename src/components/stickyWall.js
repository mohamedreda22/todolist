import React, { useState } from 'react';
import '../styles/stickywall.css';

function StickyWall() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (newNoteText.trim() === '') {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: newNoteText,
      date: new Date().toLocaleDateString(), 
    };

    setNotes([...notes, newNote]);
    setNewNoteText('');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="sticky-wall">
      <h2 className="sticky-wall-title">Welcome to Your Sticky Wall</h2>
      <div className="add-note">
        <input
          type="text"
          className="note-input"
          placeholder="Type your note here..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
        />
        <button className="add-button" onClick={addNote}>
          Add Note
        </button>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <p className="note-text">{note.text}</p>
            <p className="note-date">{note.date}</p> 
            <button className="delete-button" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyWall;
