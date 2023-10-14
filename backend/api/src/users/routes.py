from flask import render_template, request, url_for, redirect, jsonify
from src.users import bp
from src.extensions import db
from src.models.user import User

""" @bp.route('/')
def index():
    users = User.query.all()
    return render_template('users/index.html', users=users) """

@bp.route('/roles/')
def roles():
    return render_template('users/roles.html')

@bp.route('/', methods =('GET', 'POST'))
def getpost():
    users = User.query.all()
    
    if request.method == 'POST':
        new_user = User(first_name=request.json['first_name'],
                        last_name=request.json['last_name'],
                        role=request.json['role'],
                        user_name=request.json['user_name'],
                        password=request.json['password'],
                        email=request.json['email'])
        db.session.add(new_user)
        db.session.commit()
        return  jsonify({'message': 'Usuario creado'})