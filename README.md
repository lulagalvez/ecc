# Solución de aplicación móvil y sistema WEB para la Primera Compañia de Bomberos Eduardo Cornou Chabry

# Como setear la base de datos

(Linux/MacOS)
1. Instalar python3 y virtualenv
2. Crear ambiente virtual con python3 -m venv .venv
3. Activar ambiente virtual con source .venv/bin/activate
4. Instalar flask dentro del ambiente virtual
5. FLASK_APP=src
6. flask shell
7. \>\>\>from src.extensions import db
8. \>\>\>from src.models.user import User
9. \>\>\>from src.models.entrytime import EntryTime
10. \>\>\>from src.models.exittime import ExitTime
11. \>\>\>db.create_all()
12. \>\>\>exit()
13. flask run

### Integrantes:
 - José Rojas
 - José Toledo
 - José Núñez
 - Luis Gálvez
 - Lizandro Ruiz
 - Sebastian Sanhueza
 - Michael Villanueva
