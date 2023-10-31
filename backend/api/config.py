import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or '1234'

    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')\
        or 'sqlite:///' + os.path.join(basedir, 'app.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_RECORDS_QUERY = True
    
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test.db')
    
    WTF_CSRF_ENABLED = False