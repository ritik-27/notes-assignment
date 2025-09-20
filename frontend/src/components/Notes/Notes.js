import React, { useState, useRef } from "react";
import NoteItem from "../NoteItem/NoteItem";
import AddNote from "../AddNote/AddNote";
import noteContext from "../../context/notes/noteContext";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import './Notes.css';


const Notes = (props) => {
    const context = useContext(noteContext);

    const { notes, getNotes, deleteNote, editNote, userName, getUserDetails } = context;
    const history = useHistory();
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push("/login");
        } else {
            getNotes();
            getUserDetails();
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    const handleUpdate = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        toast.success("Note updated successfully!");
    };

    const confirmDelete = (note) => {
        setNoteToDelete(note);
    };

    const handleDelete = () => {
        deleteNote(noteToDelete._id);
        setNoteToDelete(null);
        toast.success("Note deleted successfully!");
    };


    return (
        <div className="notes-page-container">
            <div className="page-header">
                {userName && <h2>Welcome, {userName}! 👋</h2>}
            </div>

            {/* Edit Modal */}
            <button ref={ref} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#editModal">Launch edit modal</button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={(e) => setNote({ ...note, etitle: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={(e) => setNote({ ...note, edescription: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={(e) => setNote({ ...note, etag: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="custom-btn btn-secondary-custom" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="custom-btn btn-primary-custom" data-bs-dismiss="modal" onClick={handleUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete <strong>{noteToDelete?.title}</strong>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="custom-btn btn-secondary-custom" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="custom-btn btn-danger-custom" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="notes-container">
                <div className="notes-grid my-3">
                    {notes.length === 0 ? (
                        <div className="no-notes-card">
                            <i className="fas fa-book-open icon"></i>
                            <h4>No Notes Found</h4>
                            <p>Looks like you haven't added any notes yet. Click on "Add a New Note" to get started!</p>
                        </div>
                    ) : (
                        <>
                            <h3>Your Notes</h3>
                            {notes.map((note) => (
                                <NoteItem
                                    key={note._id}
                                    note={note}
                                    updateNote={updateNote}
                                    confirmDelete={confirmDelete}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>-

            {/* Add note Section */}
            <AddNote />
        </div>
    );
};

export default Notes;
