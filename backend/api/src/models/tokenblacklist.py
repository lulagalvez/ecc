from src.extensions import db
from datetime import datetime

class TokenBlacklist(db.Model):

    """
    Modelo de base de datos para almacenar tokens JWT revocados.

    Permite llevar un registro de los tokens JWT que han sido revocados antes de su expiración, basicamente cerrado de sesión por parte del usuario.

    Attributes:
        id (int): Identificador único del token revocado.
        jti (str): El identificador único ('jti' claim) del token JWT.
        revoked_at (datetime): La fecha y hora en que el token fue revocado.
    """
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False)
    revoked_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, jti):
        self.jti = jti