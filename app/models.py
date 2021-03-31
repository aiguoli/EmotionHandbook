from app.extensions import db
import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    password_hash = db.Column(db.String(128))

    moods = db.relationship('Mood', back_populates='author', cascade='all')

    timestamp = db.Column(db.DateTime(), default=datetime.datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def validate_password(self, password):
        return check_password_hash(self.password_hash, password)


class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128))
    companion = db.Column(db.String(64))
    location = db.Column(db.String(64))
    details = db.Column(db.Text)
    timestamp = db.Column(db.DateTime(), default=datetime.datetime.utcnow)

    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User', back_populates='moods')

    entry = db.Column(db.String(64))
    emotion = db.Column(db.String(64))
    level = db.Column(db.String(8))
