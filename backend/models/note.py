from mongoengine import Document, StringField, EmailField, DateTimeField, ReferenceField
import datetime
from .user import Users

class Notes(Document):
    user = ReferenceField(Users, required=True, reverse_delete_rule=2)  # CASCADE delete if user is deleted
    title = StringField(required=True)
    description = StringField(required=True)
    tag = StringField(default="General")
    date = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'notes'  # Matches mongoose.model('notes', NotesSchema)
    }
