from flask import request, jsonify
from src.extensions import db
from src.models.log import Log
from src.logs import bp
from src.models.truck import Truck
from src.models.user import User
import datetime

#usuario
@bp.route('', methods=['GET'])
def get_all_logs():
    isdescription = request.args.get('description')
    if isdescription:
        print("AAA")
        logs = db.session.scalars(db.Select(Log).filter(Log.description != "")).all()
    else:
        print("BBB")
        logs = db.session.scalars(db.Select(Log)).all()
    
    
    return jsonify({'logs': [log.serialize() for log in logs]}), 200

#usuario
@bp.route('/<int:log_id>', methods=['GET'])
def get_log(log_id):
    log = db.get_or_404(Log, log_id)
    return jsonify(log.serialize()), 200


#usuario
@bp.route('', methods=['POST'])
def post_log():
    data = request.get_json()
    
    db.get_or_404(Truck, data['truck_patent'])
    db.get_or_404(User, data['user_id'])
    try:
        
        if data['type'] not in Log.TYPE_CHOICES:
            return jsonify({'error': 'Tipo de log inválido'}), 400
        
        for level_name in ['oil_level', 'water_level', 'fuel_level']:
            if level_name in data:
                level_value = data[level_name]
                if level_value not in Log.LEVELS:
                    return jsonify({'error': f'El {level_name} debe estar en {Log.LEVELS}'}), 400
        
        new_log = Log(**data)

        db.session.add(new_log)
        db.session.commit()
    except KeyError as e:
        return jsonify({'error': f'Falta dato requerido: {str(e)}'}), 400


    return jsonify(new_log.serialize()), 201

#admin y usuario que lo creo
@bp.route('/<int:log_id>', methods=['PUT'])
def update_log(log_id):
    log = Log.query.get_or_404(log_id)
    data = request.get_json()
            
    for level_name in ['oil_level', 'water_level', 'fuel_level']:
        if level_name in data:
            level_value = data[level_name]
            if level_value not in Log.LEVELS:
                return jsonify({'error': f'El {level_name} debe estar en {Log.LEVELS}'}), 400

    if 'type' in data:
        if data['type'] not in Log.TYPE_CHOICES:
            return jsonify({'error': 'Tipo de log inválido'}), 400

    for attribute in data:
        try:
            setattr(log, attribute, data[attribute])
        except AttributeError:
            return jsonify({'error': f'No existe el atributo {attribute}'}), 400

        db.session.commit()

    return jsonify(log.serialize()), 200

#admin
@bp.route('/<int:log_id>', methods=['DELETE'])
def delete_log(log_id):
    log = Log.query.get_or_404(log_id)
    try:
        db.session.delete(log)
        db.session.commit()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Log eliminado con éxito'}), 200