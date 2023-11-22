from src.extensions import db
import datetime

class ExitTime(db.Model):

    """
    Modelo de base de datos para tiempos de salida de usuarios.

    Representa el momento en que un usuario registra una salida en el sistema.
    Se asocia con un tiempo de entrada específico para rastrear la duración de una sesión.

    Attributes:
        id (int): Identificador único para el registro de tiempo de salida.
        entry_time_id (int): Identificador del tiempo de entrada asociado.
        date_time (datetime): La fecha y hora exactas del registro de salida.
    """
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