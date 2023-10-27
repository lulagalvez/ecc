from flask import render_template, request
from src.main import bp

@bp.route('/', methods=['GET'])
def index():
    print(request.get_json())
    
    return request.get_json()