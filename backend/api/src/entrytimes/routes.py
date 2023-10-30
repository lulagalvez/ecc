from src.entrytimes import bp
from src.extensions import db

from src.models.entrytime import EntryTime

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_entrytime():
    data = request.get_json()
    
    user = data['user_id']
    if user is None:
        return jsonify({'error': 'No se ha especificado el id del usuario'}), 400
    
    #no se puede crear una entrada si ya existe una entrada sin salida

    #TODO cambiar a estado activo
    entry_time = EntryTime(user_id=user)
    db.session.add(entry_time)
    db.session.commit()
    
    return jsonify({'message': 'Se ha registrado la entrada del usuario'}), 200
    
    
