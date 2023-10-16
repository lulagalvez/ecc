from flask import request, jsonify, Blueprint
from src.models.entrytime import EntryTime
from src.extensions import db

bp_entrytime = Blueprint('entrytime', __name__)
