from src.extensions import db
import datetime

class ExitTime(db.Model):
    __tablename__ = 'exittime'
    id = db.Column(db.Integer, primary_key=True)
    entry_time_id = db.Column(db.Integer, db.ForeignKey('entrytime.id'), unique=True)
    entry_time = db.relationship('EntryTime', back_populates='exit_time')
    date_time = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<ExitTime {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.entry_time.user_id,
            'date_time': self.date_time
        }