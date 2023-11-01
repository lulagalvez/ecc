from src.exittimes import bp
from src.extensions import db

from src.models.exittime import ExitTime
from src.models.entrytime import EntryTime

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_exittime():
    data = request.get_json()
    
    try:
        user_id = data['user_id']
    except KeyError:
        return jsonify({'message': 'No se ha ingresado el id del usuario'}), 400
    
    related_entry_time = db.get_or_404(EntryTime, user_id) 
    
    if related_entry_time.exit_time is not None:
        return jsonify({'error': 'No se ha iniciado un turno'}), 400
    
    #TODO cambiar a estado inactivo
    exit_time = ExitTime(entry_time_id=related_entry_time.id)
    
    db.session.add(exit_time)
    db.session.commit()

    return jsonify({'message': 'Se ha registrado la salida del usuario'}), 200
