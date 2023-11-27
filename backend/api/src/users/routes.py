from flask import render_template, request, url_for, redirect, jsonify
from src.users import bp
from src.extensions import db
from src.models.user import User    
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import timedelta
from src.models.tokenblacklist import TokenBlacklist

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
    """
    Obtiene una lista de todos los usuarios registrados en la base de datos.

    """
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
    """
    Obtiene los detalles de un usuario específico por su ID.

    """
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
    """
    Actualiza los detalles de un usuario existente.

    Permite modificar atributos específicos de un usuario ya existente en la base de datos.

    """
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
    """
    Reemplaza los detalles de un usuario existente.

    Sustituye todos los atributos del usuario especificado con nuevos valores.

    """
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
    """
    Elimina un usuario de la base de datos por su ID.

    """
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

    """
    Obtiene una lista de usuarios filtrados por su estado.

    """
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
    """
    Autentica a un usuario y genera un token de acceso JWT.

    La función verifica las credenciales del usuario y, si son válidas,
    retorna un token JWT que se puede usar para acceder a rutas protegidas.

    Returns:
        JSON response: Token de acceso y código de estado HTTP.
    """
    data = request.get_json()
    user_name = data.get('user_name')
    password = data.get('password')
    
    user = User.query.filter_by(user_name=user_name).first()

    if user and user.check_password(password):
        expires = timedelta(days=30)
        access_token = create_access_token(identity=user.id, expires_delta=expires)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Usuario o contraseña incorrectos'}), 401


@bp.route('/register', methods=['POST'])
@jwt_required(optional=True)
def register():
    """
    Registra un nuevo usuario en el sistema.

    Solo los administradores pueden registrar nuevos usuarios. Si no hay usuarios en la base de datos,
    se esta asumiendo que el primer registrado será un administrador. Si existe mas de un usuario se requiere el rol de administrador.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    is_first_user = True
     # Verificar si hay usuarios en la base de datos
    if User.query.first():
        # Si hay usuarios, obtener la identidad del usuario autenticado
        user_id = get_jwt_identity()
        if not user_id:
            return jsonify({'error': 'Autenticación requerida'}), 401
        
        is_first_user = False

        current_user = User.query.get(user_id)
        if current_user.role != "administrador":
            return jsonify({'error': 'No tienes permiso para realizar esta acción'}), 403
        

    data = request.get_json()
    username = data.get('user_name')
    password = "ecc" + username

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(user_name=username).first()
    if existing_user:
        return jsonify({'error': 'El nombre de usuario ya está en uso'}), 400

    user = User(user_name=username,
                email=data.get('email'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'), 
                role=data.get('role') if not is_first_user else "administrador"
            )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

@bp.route('/protected-route', methods=['GET'])
@jwt_required()
def protected_route():
    # Esta es una ruta protegida que requiere autenticación
    return jsonify({'message': 'Has accedido a una ruta protegida'}), 200


@bp.route('/<int:user_id>/emergency', methods=['PUT'])
def change_emergency_state(user_id):
    user = db.get_or_404(User, user_id)    
    
    current_state = user.state

    if current_state == User.STATES['Inactive']:
        return jsonify({'message': 'el usuario se encuentra inactivo'}), 200
    
    user.state = User.STATES['Emergency'] if current_state == User.STATES['Active'] else User.STATES['Active']
    db.session.commit()

    return jsonify({'message': 'Se cambio el estado correctamente',
                    'user':{
                        'id': user.id,
                        'state': user.state}}), 200



@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Cierra la sesión del usuario actual revocando su token JWT.
    Se marca el token JWT actual como revocado, lo que impide su uso en futuras solicitudes.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    jti = get_jwt()['jti']  # Obtener JTI del token actual
    revoked_token = TokenBlacklist(jti=jti)
    db.session.add(revoked_token)
    db.session.commit()
    return jsonify({"msg": "Sesión cerrada con éxito"}), 200


@bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """
    Cambia la contraseña del usuario actual.
    Requiere que el usuario esté autenticado y permite cambiar su contraseña
    después de validar la contraseña actual. La nueva contraseña debe cumplir con los requisitos explayados en los mensajes de error.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = request.get_json()
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    # Verificar la contraseña actual
    if not user.check_password(current_password):
        return jsonify({'error': 'Contraseña actual incorrecta'}), 401

       # Verificar si la nueva contraseña es igual a la actual
    if user.check_password(new_password):
        return jsonify({'error': 'La nueva contraseña no puede ser igual a la actual'}), 400


    # Validar la nueva contraseña
    if not is_valid_password(new_password):
        return jsonify({'error': 'Nueva contraseña no cumple con los requisitos. Debe tener minimo 8 caracteres, contener algun numero y poseer al menos una letra mayúscula.'}), 400

    # Actualizar con la nueva contraseña
    user.set_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Contraseña cambiada con éxito'}), 200

def is_valid_password(password):

    """
    Verifica si la contraseña cumple con los criterios establecidos.

    Args:
        password (str): La contraseña a verificar.

    Returns:
        bool: True si la contraseña es válida, False en caso contrario.
    """
    # Verifica que la contraseña tenga al menos 8 caracteres y sea alfanumérica
    if len(password) < 8 or not password.isalnum():
        return False

    # Verifica que haya al menos una letra mayúscula
    return any(char.isupper() for char in password)
