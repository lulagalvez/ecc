from src.entrytimes import bp
from src.extensions import db

from src.models.entrytime import EntryTime

from flask import request, jsonify

@bp.route('', methods=['POST'])
def get_entrytimes():
    id_user = request.args.get('id_user')
    
    if id_user is None:
        return jsonify({'error': 'No se ha especificado el id del usuario'}), 400
    
    #TODO cambiar a estado activo
    entry_time = EntryTime(id_user=id_user)
    db.session.add(entry_time)
    db.session.commit()
