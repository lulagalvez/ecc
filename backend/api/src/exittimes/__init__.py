from flask import Blueprint
# Creación del Blueprint para agrupar las vistas relacionadas con los tiempos de salida.
bp = Blueprint('exittimes', __name__)

from src.exittimes import routes