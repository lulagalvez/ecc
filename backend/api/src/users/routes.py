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

@bp.route('/', methods = ['POST'])
def getpost():
    new_user = User(first_name=request.json['first_name'],
                    last_name=request.json['last_name'],
                    role=request.json['role'],
                    user_name=request.json['user_name'],
                    password=request.json['password'],
                    email=request.json['email'])
    db.session.add(new_user)
    db.session.commit()
    return  jsonify({'message': 'Usuario creado'})
    
@bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role,
            'user_name': user.user_name,
            'email': user.email
        })
    return jsonify(user_list)

# GET user by ID
@bp.route('/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'Bombero no encontrado'}), 404
    user_data = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role,
        'user_name': user.user_name,
        'email': user.email
    }
    return jsonify(user_data)

# Parchear bombero
@bp.route('/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'Bombero no encontrado'}), 404

    if 'first_name' in request.json:
        user.first_name = request.json['first_name']
    if 'last_name' in request.json:
        user.last_name = request.json['last_name']
    if 'role' in request.json:
        user.role = request.json['role']
    if 'user_name' in request.json:
        user.user_name = request.json['user_name']
    if 'email' in request.json:
        user.email = request.json['email']

    db.session.commit()
    return jsonify({'message': 'Bombero parcheado exitosamente'})

# Reemplazar bombero
@bp.route('/<int:user_id>', methods=['PUT'])
def replace_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    user.first_name = request.json.get('first_name')
    user.last_name = request.json.get('last_name')
    user.role = request.json.get('role')
    user.user_name = request.json.get('user_name')
    user.email = request.json.get('email')

    db.session.commit()
    return jsonify({'message': 'Bombero reemplazado exitosamente'})

# Eliminar bombero por id
@bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Bombero eliminado exitosamente'})

