from src.exittimes import bp
from src.extensions import db

from src.models.exittime import ExitTime
from src.models.entrytime import EntryTime
from src.models.user import User

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_exittime():
    data = request.get_json()
    
    try:
        user_id = data['user_id']
    except KeyError:
        return jsonify({'message': 'No se ha ingresado el id del usuario'}), 400
    
    user = db.get_or_404(User, user_id, description='No existe el usuario')
    
    related_entry_time = db.session.query(EntryTime).filter_by(user_id=user_id).order_by(EntryTime.id.desc()).first() 
    
    if related_entry_time is None or related_entry_time.exit_time is not None:
        return jsonify({'error': 'No se ha iniciado un turno'}), 400
    
    exit_time = create_exittime(related_entry_time, user)
    
    return jsonify({
        'message': 'Se ha registrado la salida del usuario',
        'id': exit_time.id,
        'date_time': exit_time.date_time
        }), 200

def create_exittime(user, entry_time):
    exit_time = ExitTime(entry_time_id=entry_time.id)
    
    user.state = User.STATES['Inactive']
    db.session.add(exit_time)
    db.session.commit()

    return exit_time