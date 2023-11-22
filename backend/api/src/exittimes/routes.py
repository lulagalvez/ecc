from src.exittimes import bp
from src.extensions import db

from src.models.exittime import ExitTime
from src.models.entrytime import EntryTime
from src.models.user import User

from flask import request, jsonify
from datetime import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

@bp.route('/', methods=['POST'])
@jwt_required()
def post_exittime():
    """
    Registra un nuevo tiempo de salida (exittime) para un usuario.

    Requiere autenticación JWT y espera recibir el ID del usuario como parte
    de los datos de la solicitud. Registra el momento actual como el tiempo de salida.

    """
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
    """
    Crea un registro de tiempo de salida para un tiempo de entrada específico.

    """
    exit_time = ExitTime(entry_time_id=entry_time.id, date_time=datetime.now())
    
    user.state = User.STATES['Inactive']
    db.session.add(exit_time)
    db.session.commit()

    return exit_time

@bp.route('/', methods=['GET'])
def get_all_exittimes():
    """
    Obtiene todos los registros de tiempos de salida en la base de datos.
    
    """
    exittimes = ExitTime.query.all()

    # Formatea los tiempos de salida para la respuesta JSON.
    exittime_list = []
    for exittime in exittimes:
        entry_time = exittime.entry_time.date_time
        exit_time = exittime.date_time
        time_spent = exit_time - entry_time
        exittime_data = {
            'id': exittime.id,
            'entry_time_id': exittime.entry_time_id,
            'entry_time_date_time':exittime.entry_time.date_time.strftime('%Y-%m-%d %H:%M:%S'),
            'exit_time_date_time': exittime.date_time.strftime('%Y-%m-%d %H:%M:%S'),
            'first_name':exittime.entry_time.user.first_name,
            'last_name':exittime.entry_time.user.last_name,
            'time_spent':str(time_spent)
        }
        exittime_list.append(exittime_data)

    return jsonify(exittime_list), 200


# Obtener entrytime de la exittime entregada
@bp.route('/entrytime/<int:exittime_id>', methods=['GET'])
def get_entrytime_by_exittime(exittime_id):

    """
    Obtiene el tiempo de entrada asociado con un tiempo de salida específico.
    
    """
    exittime = ExitTime.query.get(exittime_id)
    
    if exittime is not None:
        related_entry_time = exittime.entry_time

        if related_entry_time is not None:
            entrytime_data = {
                'id': related_entry_time.id,
                'user_id': related_entry_time.user_id,
                'user_name': related_entry_time.user.user_name,
                'date_time': related_entry_time.date_time.strftime('%Y-%m-%d %H:%M:%S')
            }

            return jsonify(entrytime_data), 200
        else:
            return jsonify({'message': 'Ningun entry time asociado con este exit time'}), 404
    else:
        return jsonify({'message': 'Entry time no encontrado'}), 404


