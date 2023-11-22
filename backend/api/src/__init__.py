from flask import Flask
from flask_cors import CORS
from config import Config
from src.extensions import db
from src.extensions import jwt
from src.models.tokenblacklist import TokenBlacklist
from flask import Flask, jsonify
from src.extensions import scheduler
from .scheduled_tasks import delete_expired_tokens

def create_app(config_class=Config):

    """
    Crea y configura una instancia de la aplicación Flask.

    Args:
        config_class (Config): La clase de configuración que se utilizará para
                               configurar la instancia de Flask.

    Returns:
        app: La instancia de la aplicación Flask configurada.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicialización de extensiones de Flask.
    db.init_app(app)# Inicializa SQLAlchemy.
    jwt.init_app(app) # Inicializa JWT Manager para manejar tokens JWT

    #Verifica si un token pertenece a la lista de tokens revocados en cada solicitud a una ruta protegida, osea con autenticacion.
    @jwt.token_in_blocklist_loader 
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        token = TokenBlacklist.query.filter_by(jti=jti).first()
        return token is not None
    
    # Manejador de errores para tokens JWT inválidos.
    @jwt.invalid_token_loader 
    def invalid_token_callback(error): 
        return jsonify({
            'msg': 'Token inválido',
            'error': str(error)
        }), 401
    
  # Inicialización y configuración del planificador de tareas APScheduler.
    scheduler.init_app(app)
    scheduler.start()

    # Tarea programada para eliminar tokens JWT revocados y expirados.
    # Se ejecuta diariamente a medianoche.
    @scheduler.task('cron', id='delete_expired_tokens', day='*', hour='0')
    def scheduled_task():
        with app.app_context():
            delete_expired_tokens()

    with app.app_context():
        create_database()

    cors = CORS(app, resources={r"/*": {"origins": "*"}})

    #  # Registro de blueprints para diferentes rutas de la aplicación
    from src.main import bp as main_bp
    app.register_blueprint(main_bp)

    from src.users import bp as users_bp
    app.register_blueprint(users_bp, url_prefix='/user')

    from src.entrytimes import bp as entrytimes_bp
    app.register_blueprint(entrytimes_bp, url_prefix='/entrytime')

    from src.exittimes import bp as exittimes_bp
    app.register_blueprint(exittimes_bp, url_prefix='/exittime')

    return app

def create_database():
    from src.models.user import User
    from src.models.entrytime import EntryTime
    from src.models.exittime import ExitTime
    
    db.create_all()