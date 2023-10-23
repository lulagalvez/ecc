from flask import Blueprint

bp = Blueprint('entrytimes', __name__)


from src.exittimes import routes