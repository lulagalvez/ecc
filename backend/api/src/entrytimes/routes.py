from src.entrytimes import bp
from src.extensions import db

from src.models.entrytime import EntryTime
from src.models.user import User

from flask import request, jsonify

@bp.route('/', methods=['POST'])
def post_entrytime():
    data = request.get_json()
    
    user_name = data['user_name']
    
    user = db.get_or_404(db.select(User).filter_by(user_name=user_name))

    entry_time = EntryTime(user_id=user_name)
    user.state = 1
    
    db.session.add(entry_time)
    db.session.commit()
    
    return jsonify({'message': 'Se ha registrado la entrada del usuario'}), 200
    
    
