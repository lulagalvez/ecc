from src.extensions import db
from src.models.exittime import ExitTime
import datetime

class EntryTime(db.Model):

    """
    Modelo de base de datos para tiempos de entrada de usuarios.

    Representa el momento en que un usuario registra una entrada en el sistema.
    Se asocia con un usuario específico y puede tener un tiempo de salida relacionado.

    Attributes:
        id (int): Identificador único para el registro de tiempo de entrada.
        user_id (int): Identificador del usuario asociado a este tiempo de entrada.
        date_time (datetime): La fecha y hora exactas del registro de entrada.
        exit_time (ExitTime): Tiempo de salida asociado a este tiempo de entrada.
    """
    __tablename__ = 'entrytime'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='entrytimes')
    date_time = db.Column(db.DateTime, nullable=False)
    exit_time = db.relationship('ExitTime', back_populates='entry_time', uselist=False)

    def __repr__(self):
        return f'<EntryTime {self.id}>'
    
    def serialize(self):

        """
        Serializa la información del tiempo de entrada para facilitar la respuesta JSON.
        
        """
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date_time': self.date_time,
            'exit_time': self.exit_time.serialize() if self.exit_time else {}
        }
