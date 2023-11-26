from flask import Blueprint

bp = Blueprint('log', __name__)

from src.logs import routes