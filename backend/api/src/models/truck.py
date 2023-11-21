from src.extensions import db

class Truck(db.Model):
    patent = db.Column(db.String(6), primary_key=True)
    
    LEVELS = [0, 1/4, 1/3 , 1/2, 2/3, 3/4, 1]
    
    fuel_level = db.Column(db.Float, nullable=False)
    water_level = db.Column(db.Float, nullable=False)
    oil_level = db.Column(db.Float, nullable=False)
    
    def __init__(self, patent):
        self.patent = patent.upper()
        self.fuel_level = 0.0
        self.water_level = 0.0
        self.oil_level = 0.0
        
    def serialize(self):
        return {
            'patent': self.patent,
            'fuel_level': self.fuel_level,
            'water_level': self.water_level,
            'oil_level': self.oil_level,
        }