from src.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(10), nullable=False)
    user_name = db.Column(db.String(25), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    state = db.Column(db.Integer, nullable=False, default=0)
    #TODO crear estados (activo, inactivo, emergencia)
    #TODO crear llamada para activo de activo a emergencia y viceversa

    def __repr__(self):
        return f'<User "{self.username}">'