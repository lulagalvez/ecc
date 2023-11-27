from src.trucks import bp 
from src.extensions import db
from src.models.truck import Truck

from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from src.models.user import User
#usuario
@bp.route('', methods=['GET'])
@jwt_required()
def get_all_trucks():
    """
    Obtiene todos los camiones registrados en la base de datos.

    Returns:
        JSON response: Lista de todos los camiones y código de estado HTTP.
    """

    trucks = db.session.scalars(db.Select(Truck)).all()
    return jsonify ({'trucks': [truck.serialize() for truck in trucks]}), 200

#usuario
@bp.route('/<patent>', methods=['GET'])
@jwt_required()
def get_truck(patent):
    """
    Obtiene un camión específico por su patente.

    Args:
        patent (str): La patente del camión a buscar.

    Returns:
        JSON response: Datos del camión solicitado y código de estado HTTP.
    """
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    return jsonify(truck.serialize()), 200

#admin
@bp.route('', methods=['POST'])
@jwt_required()
def post_truck():
    """
    Registra un nuevo camión en la base de datos. Solo puede hacerlo un administrador.

    La patente del camión es validada antes de su creación.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verifica si el usuario actual es un administrador.
    if current_user.role != 'administrador':
        return jsonify({'error': 'Acceso no autorizado'}), 403
    data = request.get_json()
    
    try:
        patent = data['patent'].upper()
        if not patent.isalnum() or len(patent) != 6:
            return jsonify({'error': 'Formato de patente inválido'}), 400

        if Truck.query.get(patent):
            return jsonify({'error': 'La patente ya existe'}), 400

        truck = Truck(patent=patent)
        db.session.add(truck)
        db.session.commit()
    except KeyError:
        return jsonify({'error': 'Datos faltantes'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Camión registrado con éxito', 'patent': truck.patent}), 201

#admin
@bp.route('/<patent>', methods=['DELETE'])
@jwt_required()
def delete_truck(patent):
    """
    Elimina un camión específico de la base de datos. Solo puede hacerlo un administrador.

    Args:
        patent (str): La patente del camión a eliminar.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verifica si el usuario actual es un administrador.
    if current_user.role != 'administrador':
        return jsonify({'error': 'Acceso no autorizado'}), 403
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    db.session.delete(truck)
    db.session.commit()
    return jsonify({'message': 'Se ha eliminado el camion'}), 200

#admin
@bp.route('/<patent>', methods=['PUT'])
@jwt_required()
def change_truck(patent):
    """
    Actualiza la patente de un camión específico. Solo puede hacerlo un administrador.

    Args:
        patent (str): La patente actual del camión a actualizar.

    Returns:
        JSON response: Mensaje de éxito y código de estado HTTP.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verifica si el usuario actual es un administrador.
    if current_user.role != 'administrador':
        return jsonify({'error': 'Acceso no autorizado'}), 403
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    data = request.get_json()

    new_patent = data.get('patent')
    if new_patent:
        if not new_patent.isalnum() or len(new_patent) != 6:
            return jsonify({'error': 'Formato de patente inválido'}), 400
        truck.patent = new_patent

    db.session.commit()
    return jsonify({'message': 'Se ha modificado el camion'}), 200