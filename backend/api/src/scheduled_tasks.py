from datetime import datetime, timedelta
from src.extensions import db
from src.models.tokenblacklist import TokenBlacklist

def delete_expired_tokens():
    try:
        # Se eliminaran tokens que expiraron hace más de 30 días
        limit_date = datetime.utcnow() - timedelta(days=30)
        expired_tokens = TokenBlacklist.query.filter(TokenBlacklist.revoked_at < limit_date).all()
        for token in expired_tokens:
            db.session.delete(token)
        db.session.commit()
        print("Tokens expirados eliminados.")
    except Exception as e:
        print("Error al eliminar tokens expirados:", str(e))
