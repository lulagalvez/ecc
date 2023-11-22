from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_apscheduler import APScheduler

# Inicializa SQLAlchemy para la gestión de la base de datos.
# SQLAlchemy es un ORM que facilita las operaciones
# de la base de datos en Python, abstrayendo las consultas SQL.
db = SQLAlchemy()

# Inicializa JWTManager para la gestión de JSON Web Tokens (JWT).
# Flask-JWT-Extended provee manejadores para la autenticación y protección de rutas,
# utilizando tokens JWT para la seguridad y gestión de sesiones.
jwt = JWTManager()

# Inicializa APScheduler, un planificador de tareas en segundo plano.
# APScheduler se utiliza para programar tareas que deben ejecutarse periódicamente
# o en momentos específicos.
scheduler = APScheduler()

