from src.extensions import db
from datetime import datetime

class ExitTime(db.Model):
    __tablename__ = 'exittime'
    id = db.Column(db.Integer, primary_key=True)
    entry_time_id = db.Column(db.Integer, db.ForeignKey('entrytime.id'))
    date_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<ExitTime {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.entrytime.user_id,
            'date_time': self.date_time
        }