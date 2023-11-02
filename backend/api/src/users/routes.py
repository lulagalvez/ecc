from flask import render_template, request, url_for, redirect, jsonify
from src.users import bp
from src.extensions import db
from src.models.user import User    
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



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
            'email': user.email,
            'state': user.state
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
        'email': user.email,
        'state': user.state
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
    if 'state' in request.json:
        user.state = request.json['state']

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


# Obtener lista de bomberos por estado
# 0 : Inactivo
# 1 : Activo
# 2 : En emergencia
# 3 : Conductor
@bp.route('/users_by_state/<int:state>', methods=['GET'])
def get_users_by_state(state):
    # Query the User table to filter users by the specified state
    users = User.query.filter_by(state=state).all()
    
    # Create a list of user data
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role,
            'user_name': user.user_name,
            'email': user.email,
            'state': user.state
        })
    
    return jsonify(user_list)

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_name = data.get('user_name')
    password = data.get('password')
    
    user = User.query.filter_by(user_name=user_name).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Usuario o contraseña incorrectos'}), 401


@bp.route('/register', methods=['POST'])
@jwt_required(optional=True)
def register():
    
     # Verificar si hay usuarios en la base de datos
    if User.query.first():
        # Si hay usuarios, obtener la identidad del usuario autenticado
        user_id = get_jwt_identity()
        if not user_id:
            return jsonify({'error': 'Autenticación requerida'}), 401

        current_user = User.query.get(user_id)

        # Verificar si el usuario tiene el rol de "administrador"
        if current_user.role != "administrador":
            return jsonify({'error': 'No tienes permiso para realizar esta acción'}), 403


    data = request.get_json()
    username = data.get('user_name')
    password = data.get('password') 

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(user_name=username).first()
    if existing_user:
        return jsonify({'error': 'El nombre de usuario ya está en uso'}), 400

    user = User(user_name=username, email=data.get('email'), first_name=data.get('first_name'), last_name=data.get('last_name'), role=data.get('role'))
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

@bp.route('/protected-route', methods=['GET'])
@jwt_required()
def protected_route():
    # Esta es una ruta protegida que requiere autenticación
    return jsonify({'message': 'Has accedido a una ruta protegida'}), 200