from src.trucks import bp 
from src.extensions import db
from src.models.truck import Truck

from flask import request, jsonify

@bp.route('', methods=['GET'])
def get_all_trucks():
    trucks = db.session.scalars(db.Select(Truck)).all()
    return jsonify ({'trucks': [truck.serialize() for truck in trucks]}), 200


@bp.route('/<patent>', methods=['GET'])
def get_truck(patent):
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    return jsonify(truck.serialize()), 200

@bp.route('', methods=['POST'])
def post_truck():
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

@bp.route('/<patent>', methods=['DELETE'])
def delete_truck(patent):
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    db.session.delete(truck)
    db.session.commit()
    return jsonify({'message': 'Se ha eliminado el camion'}), 200

@bp.route('/<patent>', methods=['PUT'])
def change_truck(patent):
    truck = db.get_or_404(Truck, patent, description='No existe el camion')
    data = request.get_json()

    new_patent = data.get('patent')
    if new_patent:
        if not new_patent.isalnum() or len(new_patent) != 6:
            return jsonify({'error': 'Formato de patente inválido'}), 400
        truck.patent = new_patent

    for level_name in ['oil_level', 'water_level', 'fuel_level']:
        if level_name in data:
            level_value = data[level_name]
            if level_value not in Truck.LEVELS:
                return jsonify({'error': f'El {level_name} debe estar en {Truck.LEVELS}'}), 400
            setattr(truck, level_name, level_value)

    db.session.commit()
    return jsonify({'message': 'Se ha modificado el camion'}), 200