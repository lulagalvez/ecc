from src.extensions import db

class Log(db.Model):
    TYPE_CHOICES = {
        'Single_use': 1,
        'Maintenance': 2,
        'Repair': 3,
    }
    
    LEVELS = [0, 1/4, 1/3 , 1/2, 2/3, 3/4, 1]
    
    id = db.Column(db.Interger, primary_key=True)
    user_id = db.Column(db.Interger, db.ForeignKey('user.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.Interger, nullable=False, default=TYPE_CHOICES['Single_use'])
    description = db.Column(db.String, nullable=False)
    fuel = db.Column(db.Float, nullable=False)
    water = db.Column(db.Float, nullable=False)
    oil = db.Column(db.Float, nullable=False)