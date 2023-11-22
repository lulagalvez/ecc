from flask import Blueprint
# Creación del Blueprint para agrupar las vistas relacionadas con los tiempos de entrada.
bp = Blueprint('entrytimes', __name__)

from src.entrytimes import routes