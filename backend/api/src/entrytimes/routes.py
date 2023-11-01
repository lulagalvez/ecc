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