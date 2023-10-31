from src.entrytimes import bp
from src.extensions import db

from src.models.entrytime import EntryTime
from src.models.user import User

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_entrytime():
    data = request.get_json()
    
    user_id = data['user_id']
    
    user = db.get_or_404(User, user_id, description='No existe el usuario')

    entry_time = EntryTime(user_id=user_id)
    user.state = 1
    
    db.session.add(entry_time)
    db.session.commit()
    
    return jsonify({
        'message': 'Se ha registrado la entrada del usuario',
        'id': entry_time.id,
        'date_time': entry_time.date_time
        }), 200
    
    
