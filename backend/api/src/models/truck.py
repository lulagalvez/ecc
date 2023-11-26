from src.extensions import db

class Truck(db.Model):
    patent = db.Column(db.String(6), primary_key=True)
        
    def __init__(self, patent):
        self.patent = patent.upper()
        
    def serialize(self):
        return {
            'patent': self.patent,
        }