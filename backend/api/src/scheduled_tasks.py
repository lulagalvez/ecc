from datetime import datetime, timedelta
from src.extensions import db
from src.models.tokenblacklist import TokenBlacklist

def delete_expired_tokens():
    """
    Elimina tokens JWT revocados y expirados de la base de datos.

    Esta función busca tokens en la tabla TokenBlacklist que han sido revocados
    y cuya fecha de revocación es mayor a 30 días. Estos tokens son eliminados
    para mantener la base de datos limpia y optimizada.

    La función se ejecuta dentro de un bloque try-except para manejar
    posibles excepciones durante la operación de la base de datos y asegura
    que cualquier fallo sea registrado adecuadamente.
    """
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
