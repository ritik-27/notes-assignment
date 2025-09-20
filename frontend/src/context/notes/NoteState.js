import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [userName, setUserName] = useState("");


  const getToken = () => localStorage.getItem("token");

  const getUserDetails = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setUserName(json.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(), // ✅ Dynamic token
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes((prev) => prev.concat(note));
  };

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote, getUserDetails, userName }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
