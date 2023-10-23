from src.exittimes import bp
from src.extensions import db

from src.models.exittime import ExitTime
from src.models.entrytime import EntryTime

from flask import request, jsonify

@bp.route('', methods=['POST'])
def get_entrytimes():
    id_user = request.args.get('id_user')
    
    if id_user is None:
        return jsonify({'error': 'No se ha especificado el id del usuario'}), 400
    
    related_entry_time = db.session.query(EntryTime).filter(EntryTime.id_user == id_user).last()
    
    if related_entry_time is None:
        return jsonify({'error': 'No se ha registrado la hora de entrada'}), 400
    
    if related_entry_time.exit_time is not None:
        return jsonify({'error': 'No se ha iniciado un turno'}), 400
    
    #TODO cambiar a estado inactivo
    exit_time = ExitTime(id_user=id_user, entry_time_id=related_entry_time.id)
    
    db.session.add(exit_time)
    db.session.commit()

