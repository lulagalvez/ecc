from flask import Blueprint

bp = Blueprint('users', __name__)

from src.users import routes