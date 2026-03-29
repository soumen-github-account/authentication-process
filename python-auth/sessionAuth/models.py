from django.db import models

# import mongoengine as me
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime


class Users(Document):
    userName = StringField(unique=True, required=True)
    email = EmailField(required=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {'collection' : 'users'}