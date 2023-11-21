from flask import Flask
from flask_cors import CORS
from config import Config
from src.extensions import db
from src.extensions import jwt


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    db.init_app(app)

    jwt.init_app(app)
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

    from src.logs import bp as logs_bp
    app.register_blueprint(logs_bp, url_prefix='/logs')
    
    from src.trucks import bp as trucks_bp
    app.register_blueprint(trucks_bp, url_prefix='/trucks')
    
    

    return app

def create_database():
    from src.models.user import User
    from src.models.entrytime import EntryTime
    from src.models.exittime import ExitTime
    from src.models.log import Log
    from src.models.truck import Truck
    
    
    db.create_all()