# Solución de aplicación móvil y sistema WEB para la Primera Compañia de Bomberos Eduardo Cornou Chabry

## Backend
para la debida ejecución de la api del proyecto se tienen que seguir los siguiente pasos:

### Instalación de las dependencias
1. ir a la raiz del proyecto y escribir los siguientes comandos
   
#### Linux
2. `python3 -m venv .venv`
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `export FLASK_APP=src`
   
#### Windows
2. `python -m venv .venv`
3. `.venv/Scripts/activate`
4. `pip install -r requirements.txt`
5. `set FLASK_APP=src`

Para la creación del admin se tiene que llamar a la ruta '/user/register' y utilizar el json requerido.

Ejemplo:
{
"user_name": "admin_user",
"email": "admin@email.cl",
"first_name": "Soila",
"last_name": "Admin"
}

la contraseña por defecto para cada usuario es:
`ecc`+`user_name`

### Integrantes:
 - José Rojas
 - José Toledo
 - José Núñez
 - Luis Gálvez
 - Lizandro Ruiz
 - Sebastian Sanhueza
 - Michael Villanueva
