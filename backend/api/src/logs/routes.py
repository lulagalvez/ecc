import json
import os
from flask import request, jsonify
from pyfcm import FCMNotification
from src.extensions import db
from src.models.log import Log
from src.logs import bp
from src.models.truck import Truck
from src.models.user import User
import datetime
from dotenv import load_dotenv
load_dotenv()

# Inicializa el objeto FCMNotification
push_service = FCMNotification(api_key= os.getenv("FIREBASE_KEY"))
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
    
    
    return jsonify([log.serialize() for log in logs]), 200

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
    tokens = ["eEGcNQ7MRw-NsYdT_WDvse:APA91bGhVVB4z3kBTwek1wenFdZf-WLu2GbM0AtxbCMS9oEJHNGxUe6DtEkOgL4YV1KKV8q3oFNZgSevQQH7cNh-1fkncfrCbiF61IAkF9836URUG1nM5UyXUet4XVBrKlXeUib7TyQH","dRmrqb4JQGyghC7DVTz1Ng:APA91bEC5XbgRdYeaYe20dk3B_Ymu3wvL4fgsOXjR5t3fxvP1h61uc9Zj7bJwwUoBTuu5Rz__51-zNRzjLIQ_JuPyh1DS3YuDaSOi6Hktd1wC70ibX4tR2ysdMsZR5VmRrAzpmbhyHYQ"]
    if data['description'] != "" : push_service.notify_multiple_devices(registration_ids=tokens, message_title="Nueva bitacora", message_body=data["description"], data_message= json.loads(jsonify(new_log.serialize()).data))
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