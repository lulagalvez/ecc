from src.extensions import db
from src.models.exittime import ExitTime
import datetime

class EntryTime(db.Model):
    __tablename__ = 'entrytime'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.DateTime,default=datetime.datetime.now(), nullable=False)
    exit_time = db.relationship('ExitTime', uselist=False, backref='entrytime')

    def __repr__(self):
        return f'<EntryTime {self.id}>'
    
    