from flask import Flask

from config import Config
from src.extensions import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    db.init_app(app)

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