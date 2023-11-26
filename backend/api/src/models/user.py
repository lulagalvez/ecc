from src.extensions import db

import bcrypt

class User(db.Model):

    """
    Modelo de base de datos para usuarios.

    Representa un usuario en el sistema, con atributos para autenticación y estado.

    Attributes:
        id (int): Identificador único del usuario.
        first_name (str): Nombre del usuario.
        last_name (str): Apellido del usuario.
        role (str): Rol del usuario en el sistema.
        user_name (str): Nombre de usuario para autenticación.
        password (str): Contraseña hasheada del usuario.
        email (str): Correo electrónico del usuario.
        state (int): Estado actual del usuario (inactivo, activo, emergencia).
    """
    STATES = {
    'Inactive': 0,
    'Active': 1,
    'Emergency': 2
    }
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    user_name = db.Column(db.String(25), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    email = db.Column(db.String(50), nullable=False)
    state = db.Column(db.Integer, nullable=False, default=STATES['Inactive'])
    image = db.Column(db.String(150), nullable=True)


    def set_password(self, password):
        """
        Hashea la contraseña proporcionada y la almacena en el atributo de contraseña.

        Args:
            password (str): La contraseña en texto plano a hashear y almacenar.
        """
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed_password.decode('utf-8')

    def check_password(self, password):
        """
        Verifica si la contraseña proporcionada coincide con la contraseña hasheada almacenada.

        Args:
            password (str): La contraseña en texto plano a verificar.

        Retorna:
            bool: True si las contraseñas coinciden, False en caso contrario.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def __repr__(self):
        return f'<User "{self.user_name}">'
    
    