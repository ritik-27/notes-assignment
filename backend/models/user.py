from mongoengine import Document, StringField, EmailField, DateTimeField, ReferenceField
import datetime

class Users(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    date = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'users',
        'strict': False
    }
