from flask import Blueprint

bp = Blueprint('entrytimes', __name__)

from src.entrytimes import routes