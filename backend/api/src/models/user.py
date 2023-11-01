from src.extensions import db


import bcrypt
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    user_name = db.Column(db.String(25), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    email = db.Column(db.String(50), nullable=False)
    state = db.Column(db.Integer, nullable=False, default=0)
    #TODO crear llamada para activo de activo a emergencia y viceversa


    

    def set_password(self, password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed_password.decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def __repr__(self):
        return f'<User "{self.user_name}">'
    