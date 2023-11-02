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
    
    related_entry_time = db.session.execute(db.select(EntryTime).where(EntryTime.user_id == user_id).order_by(EntryTime.id.desc())).first()
    related_entry_time = related_entry_time[0]
    
    if related_entry_time is None:
        return jsonify({'error': 'No se ha iniciado un turno'}), 400
        
    if related_entry_time.exit_time is not None:
        return jsonify({'error': 'No se ha iniciado un turno'}), 400
        
        
    
    exit_time = create_exittime(user, related_entry_time)
    
    return jsonify({
        'message': 'Se ha registrado la salida del usuario',
        'id': exit_time.id,
        'date_time': exit_time.date_time,
        'entry_time_id': related_entry_time.id
        }), 200

def create_exittime(user, entry_time):
    exit_time = ExitTime(entry_time_id=entry_time.id)
    
    user.state = User.STATES['Inactive']
    db.session.add(exit_time)
    db.session.commit()

    return exit_time

@bp.route('/', methods=['GET'])
def get_all_exittimes():
    exittimes = ExitTime.query.all()

    exittime_list = []
    for exittime in exittimes:
        exittime_data = {
            'id': exittime.id,
            'entry_time_id': exittime.entry_time_id,
            'date_time': exittime.date_time.strftime('%Y-%m-%d %H:%M:%S')
        }
        exittime_list.append(exittime_data)

    return jsonify(exittime_list), 200


# Obtener entrytime de la exittime entregada
@bp.route('/entrytime/<int:exittime_id>', methods=['GET'])
def get_entrytime_by_exittime(exittime_id):
    exittime = ExitTime.query.get(exittime_id)
    
    if exittime is not None:
        related_entry_time = exittime.entrytime

        if related_entry_time is not None:
            entrytime_data = {
                'id': related_entry_time.id,
                'user_id': related_entry_time.user_id,
                'date_time': related_entry_time.date_time.strftime('%Y-%m-%d %H:%M:%S')
            }

            return jsonify(entrytime_data), 200
        else:
            return jsonify({'message': 'Ningun entry time asociado con este exit time'}), 404
    else:
        return jsonify({'message': 'Entry time no encontrado'}), 404
