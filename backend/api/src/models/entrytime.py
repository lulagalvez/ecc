from src.extensions import db
from src.models.exittime import ExitTime
import datetime

class EntryTime(db.Model):
    __tablename__ = 'entrytime'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='entrytimes')
    date_time = db.Column(db.DateTime, nullable=False)
    exit_time = db.relationship('ExitTime', back_populates='entry_time', uselist=False)

    def __repr__(self):
        return f'<EntryTime {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date_time': self.date_time,
            'exit_time': self.exit_time.serialize() if self.exit_time else {}
        }
