from flask import Blueprint
# Creación del Blueprint para agrupar las vistas relacionadas con los usuarios
bp = Blueprint('users', __name__)

from src.users import routes