from flask import request, jsonify
from src.extensions import db
from src.models.log import Log
from src.logs import bp
from src.models.truck import Truck
from src.models.user import User
import datetime


@bp.route('', methods=['GET'])
def get_all_logs():
    logs = Log.query.all()
    return jsonify([log.serialize() for log in logs]), 200

@bp.route('/<int:log_id>', methods=['GET'])
def get_log(log_id):
    log = db.get_or_404(Log, log_id)
    return jsonify(log.serialize()), 200



@bp.route('', methods=['POST'])
def create_log():
    data = request.get_json()
    db.get_or_404(Truck, data['truck_patent'])
    db.get_or_404(User, data['user_id'])
    try:
        if data['type'] not in Log.TYPE_CHOICES.values():
            return jsonify({'error': 'Tipo de log inválido'}), 400
        
        new_log = Log(
            type=data['type'],
            description=data['description'],
            user_id=data['user_id'],
            truck_patent=data['truck_patent'],
            date_time=datetime.datetime.now()
        )

        db.session.add(new_log)
        db.session.commit()
    except KeyError as e:
        return jsonify({'error': f'Falta dato requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(new_log.serialize()), 201

@bp.route('/<int:log_id>', methods=['PUT'])
def update_log(log_id):
    log = Log.query.get_or_404(log_id)
    data = request.get_json()

    try:
        new_type = data.get('type')
        if new_type is not None and new_type not in Log.TYPE_CHOICES.values():
            return jsonify({'error': 'Tipo de log inválido'}), 400
        
        log.type = data.get('type', log.type)
        log.description = data.get('description', log.description)
        db.session.commit()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(log.serialize()), 200

@bp.route('/<int:log_id>', methods=['DELETE'])
def delete_log(log_id):
    log = Log.query.get_or_404(log_id)
    try:
        db.session.delete(log)
        db.session.commit()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Log eliminado con éxito'}), 200