from flask import Blueprint

bp = Blueprint('exittimes', __name__)

from src.exittimes import routes