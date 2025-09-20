from flask import Blueprint, request, jsonify
from models.note import Notes
from models.user import Users
from middleware.fetch_user import fetch_user

notes_bp = Blueprint("notes", __name__)

# ROUTE 1: Fetch All Notes
@notes_bp.route("/fetchallnotes", methods=["GET"])
@fetch_user
def fetch_all_notes():
    user_id = request.user["id"]
    notes = Notes.objects(user=user_id)
    return jsonify(notes)

# ROUTE 2: Add Note
@notes_bp.route("/addnote", methods=["POST"])
@fetch_user
def add_note():
    data = request.json
    user_id = request.user["id"]

    note = Notes(
        user=user_id,
        title=data.get("title"),
        description=data.get("description"),
        tag=data.get("tag", "General")
    ).save()

    return jsonify(note)

# ROUTE 3: Update Note
@notes_bp.route("/updatenote/<id>", methods=["PUT"])
@fetch_user
def update_note(id):
    user_id = request.user["id"]
    note = Notes.objects(id=id, user=user_id).first()

    if not note:
        return jsonify({"error": "Not Found or Unauthorized"}), 404

    data = request.json
    note.update(
        title=data.get("title", note.title),
        description=data.get("description", note.description),
        tag=data.get("tag", note.tag)
    )
    return jsonify({"note": Notes.objects(id=id).first()})

# ROUTE 4: Delete Note
@notes_bp.route("/deletenote/<id>", methods=["DELETE"])
@fetch_user
def delete_note(id):
    user_id = request.user["id"]
    note = Notes.objects(id=id, user=user_id).first()

    if not note:
        return jsonify({"error": "Not Found or Unauthorized"}), 404

    note.delete()
    return jsonify({"Success": "Note has been deleted", "note": str(id)})
