from src.entrytimes import bp
from src.extensions import db

from src.models.entrytime import EntryTime
from src.models.user import User

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_entrytime():
    data = request.get_json()
    
    try:
        user_id = data['user_id']
    except KeyError:
        return jsonify({'message': 'No se ha ingresado el id del usuario'}), 400
    
    user = db.get_or_404(User, user_id, description='No existe el usuario')

    last_entrytime = db.session.query(EntryTime).order_by(EntryTime.id.desc()).filter_by(user_id = user.id).first()
                 
    if last_entrytime is not None:
        if last_entrytime.exit_time is None:
            return jsonify({'message': 'No se ha marcado la Salida'}), 400

    entry_time = create_entrytime(user)
    
    return jsonify({
        'message': 'Se ha registrado la entrada del usuario',
        'id': entry_time.id,
        'date_time': entry_time.date_time
        }), 200
    
def create_entrytime(user):
    entry_time = EntryTime(user_id=user.id)
    user.state = User.STATES['Active']
    
    db.session.add(entry_time)
    db.session.commit()

    return entry_time


@bp.route('/all', methods=['GET'])
def get_all_entrytimes():
    entrytimes = db.session.query(EntryTime).order_by(EntryTime.date_time).all()
    
    return jsonify([entrytime.serialize() for entrytime in entrytimes]), 200

@bp.route('/entrytimes_by_user/<int:user_id>', methods=['GET'])
def get_entrytimes_by_user(user_id):
    user = User.query.get(user_id)
    if user is not None:
        entrytimes = user.entrytimes

        # Create a list of entry time data
        entrytime_list = []
        for entrytime in entrytimes:
            entrytime_list.append({
                'id': entrytime.id,
                'user_id': entrytime.user_id,
                'date_time': entrytime.date_time.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify(entrytime_list)
    else:
        return jsonify({'message': 'User not found'}), 404


# Obtener exittime de la entrytime entregada
@bp.route('/exittime/<int:entrytime_id>', methods=['GET'])
def get_exittime_by_entrytime(entrytime_id):
    entrytime = EntryTime.query.get(entrytime_id)
    
    if entrytime is not None:
        related_exit_time = entrytime.exit_time

        if related_exit_time is not None:
            exittime_data = {
                'id': related_exit_time.id,
                'entry_time_id': related_exit_time.entry_time_id,
                'date_time': related_exit_time.date_time.strftime('%Y-%m-%d %H:%M:%S')
            }

            return jsonify(exittime_data), 200
        else:
            return jsonify({'message': 'Ningun exit time asociado a este entry time'}), 404
    else:
        return jsonify({'message': 'Exit time no encontrado'}), 404

from flask import request
from datetime import datetime, timedelta
from src.models.entrytime import EntryTime
from src.models.exittime import ExitTime
from src.models.user import User
from src.extensions import db

@bp.route('/summary/<int:user_id>/<int:num_days>', methods=['GET'])
def entrytimes_summary(user_id, num_days):
    user = User.query.get(user_id)
    
    if user is not None:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=num_days)

        entrytimes = EntryTime.query.filter_by(user_id=user.id) \
            .filter(EntryTime.date_time >= start_date, EntryTime.date_time <= end_date) \
            .order_by(EntryTime.date_time) \
            .all()

        entrytime_list = []
        total_hours = 0
        entry_count = 0

        for entrytime in entrytimes:
            if entrytime.exit_time:
                time_difference = entrytime.exit_time.date_time - entrytime.date_time
                total_hours += time_difference.total_seconds() / 3600
                entry_count += 1

            entrytime_list.append({
                'id': entrytime.id,
                'user_id': entrytime.user_id,
                'date_time': entrytime.date_time.strftime('%Y-%m-%d %H:%M:%S')
            })

        summary = {
            'user_id': user_id,
            'entry_count': entry_count,
            'total_hours_worked': total_hours,
            'entrytimes': entrytime_list
        }

        return jsonify(summary), 200
    else:
        return jsonify({'message': 'User not found'}), 404

