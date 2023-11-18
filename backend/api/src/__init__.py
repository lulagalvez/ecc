from flask import Flask
from flask_cors import CORS
from config import Config
from src.extensions import db
from src.extensions import jwt
from src.models.tokenblacklist import TokenBlacklist
from flask import Flask, jsonify


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    db.init_app(app)

    jwt.init_app(app)

    @jwt.token_in_blocklist_loader #Verifica el token en cada solicitud a una ruta protegida, osea con autenticacion
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        token = TokenBlacklist.query.filter_by(jti=jti).first()
        return token is not None
    
    @jwt.invalid_token_loader ##en caso de que el token sea invalido
    def invalid_token_callback(error):  # error es proporcionado por Flask-JWT-Extended
        return jsonify({
            'msg': 'Token inválido',
            'error': str(error)
        }), 401

    with app.app_context():
        create_database()

    cors = CORS(app, resources={r"/*": {"origins": "*"}})

    # Register blueprints here
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