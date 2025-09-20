import './NoteItem.css';

const NoteItem = ({ note, updateNote, confirmDelete }) => {
    return (
        <div className="note-item">
            <div className="note-item-header">
                <h5>{note.title}</h5>
                <div className="note-item-icons">
                    <i
                        className="far fa-trash-alt"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => confirmDelete(note)}
                    ></i>
                    <i
                        className="far fa-edit"
                        onClick={() => updateNote(note)}
                    ></i>
                </div>
            </div>
            <p>{note.description}</p>
        </div>
    );
};

export default NoteItem;