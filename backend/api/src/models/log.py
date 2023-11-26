from src.extensions import db

class Log(db.Model):
    TYPE_CHOICES = {
        'Single_use': 1,
        'Maintenance': 2,
        'Repair': 3,
    }

    LEVELS = [0, 1/4, 1/3 , 1/2, 2/3, 3/4, 1]
    


    id = db.Column(db.Integer, primary_key=True)  
    type = db.Column(db.Integer, nullable=False, default=TYPE_CHOICES['Single_use']) 
    description = db.Column(db.String, nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  
    truck_patent = db.Column(db.String(6), db.ForeignKey('truck.patent'), nullable=False)  

    fuel_level = db.Column(db.Float, nullable=False)
    water_level = db.Column(db.Float, nullable=False)
    oil_level = db.Column(db.Float, nullable=False)
    
    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'description': self.description,
            'date_time': self.date_time,
            'user_id': self.user_id,
            'truck_patent': self.truck_patent,
        }