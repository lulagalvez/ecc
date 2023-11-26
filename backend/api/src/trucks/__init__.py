from flask import Blueprint

bp = Blueprint('truck', __name__)

from src.trucks import routes