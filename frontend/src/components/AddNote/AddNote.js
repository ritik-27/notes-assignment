import React, { useContext, useState } from 'react';
import noteContext from "../../context/notes/noteContext";
import { toast } from 'react-toastify';
import './AddNote.css';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        toast.success("Note added successfully!");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <button
                type="button"
                style={{ maxWidth: "180px" }}
                className="custom-btn btn-primary-custom"
                data-bs-toggle="modal"
                data-bs-target="#addNoteModal"
            >
                Add a New Note
            </button>

            <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="addNoteLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNoteLabel">Add Note</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control-custom"
                                        id="title"
                                        name="title"
                                        value={note.title}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control-custom"
                                        id="description"
                                        name="description"
                                        value={note.description}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control-custom"
                                        id="tag"
                                        name="tag"
                                        value={note.tag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="custom-btn btn-secondary-custom"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                data-bs-dismiss="modal"
                                type="button"
                                className="custom-btn btn-primary-custom"
                                onClick={handleClick}
                            >
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNote;