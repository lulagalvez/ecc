import os
from src.extensions import jwt
# Determina la ruta base del proyecto para construir rutas relativas.
basedir = os.path.abspath(os.path.dirname(__file__))




class Config:

    """
    Configuración base para la aplicación Flask.

    Esta clase se utiliza para configurar valores clave que son esenciales
    para el funcionamiento de la aplicación Flask, incluyendo secretos,
    URI de base de datos y configuraciones específicas de extensiones.

    Attributes:
        JWT_SECRET_KEY (str): Clave secreta para JWT. Es importante para la seguridad
                              en la creación de tokens JWT.
        SECRET_KEY (str): Clave secreta para Flask. Utilizada para mantener la seguridad
                          en diversas funcionalidades de Flask.
        SQLALCHEMY_DATABASE_URI (str): URI de la base de datos para SQLAlchemy.
                                       Define dónde y cómo Flask accederá a la base de datos.
        SQLALCHEMY_TRACK_MODIFICATIONS (bool): Configuración de SQLAlchemy para rastrear
                                               modificaciones en objetos y emitir señales.
        SQLALCHEMY_RECORDS_QUERY (bool): Habilita o deshabilita el registro de consultas
                                         para propósitos de debugging.
        SCHEDULER_API_ENABLED (bool): Habilita la API para el planificador APScheduler,
                                      lo que permite la gestión y diagnóstico de tareas
                                      programadas.
    """
    # Clave secreta para JWT, obtenida del entorno o definida a un valor por defecto.
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'eccbc87e4b5ce2fe28308fd9f2a7baf3'

    # Clave secreta general para la aplicación Flask.
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # URI de la base de datos, obtenida del entorno o configurada para usar SQLite por defecto.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')\
        or 'sqlite:///' + os.path.join(basedir, 'app.db')
    
    # Configuración adicional de SQLAlchemy.
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_RECORDS_QUERY = True

    # Habilitación de la API del planificador APScheduler.
    SCHEDULER_API_ENABLED = True
    
class TestingConfig(Config):

    """
    Configuración específica para el entorno de pruebas.

    Hereda de la clase Config y sobrescribe ciertas configuraciones para adaptar
    la aplicación a un entorno de pruebas.

    Attributes:
        TESTING (bool): Habilita el modo de pruebas de Flask.
        SQLALCHEMY_DATABASE_URI (str): URI de la base de datos específica para pruebas.
        WTF_CSRF_ENABLED (bool): Deshabilita la protección CSRF para facilitar las pruebas.
    """

    # Habilitación del modo de pruebas.
    TESTING = True

    # Configuración de la base de datos para pruebas, utilizando SQLite.
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test.db')


    # Deshabilitación de la protección CSRF en formularios para simplificar las pruebas.
    WTF_CSRF_ENABLED = False