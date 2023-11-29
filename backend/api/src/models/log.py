from src.extensions import db
from src.models.user import User
import locale
import datetime
class Log(db.Model):
    """
    Cada registro (`Log`) documenta un tipo específico de actividad y el estado de varios niveles
    del camión al momento de la actividad.

    Attributes:
        id (int): Identificador único del registro.
        type (int): Tipo de actividad registrada (Uso único, Mantenimiento, Reparación, etc.).
        description (str): Descripción detallada de la actividad.
        date_time (datetime): Fecha y hora en que se registró la actividad.
        user_id (int): Identificador del usuario que registra la actividad.
        truck_patent (str): Patente del camión relacionado con la actividad.
        fuel_level (float): Nivel de combustible del camión al momento de la actividad.
        water_level (float): Nivel de agua del camión al momento de la actividad.
        oil_level (float): Nivel de aceite del camión al momento de la actividad.
    """
    TYPE_CHOICES = {
        'Single_use': 1,
        'Maintenance': 2,
        'Repair': 3,
    }

    LEVELS = [0, 1/4, 1/3 , 1/2, 2/3, 3/4, 1]
    

    id = db.Column(db.Integer, primary_key=True)  
    type = db.Column(db.Integer, nullable=False, default=TYPE_CHOICES['Single_use']) 
    description = db.Column(db.String, nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  
    truck_patent = db.Column(db.String(6), db.ForeignKey('truck.patent'), nullable=False)  

    fuel_level = db.Column(db.Float, nullable=False)
    water_level = db.Column(db.Float, nullable=False)
    oil_level = db.Column(db.Float, nullable=False)
    
    def __init__(self, **kwargs):
        """
        Inicializa una nueva instancia del modelo Log.

        Args:
            kwargs: Argumentos clave-valor para la inicialización del modelo.
        """
        self.type = kwargs.get('type', None)
        self.description = kwargs.get('description', None)
        self.date_time = datetime.datetime.now()
        self.user_id = kwargs.get('user_id', None)
        self.truck_patent = kwargs.get('truck_patent', None)
        self.fuel_level = kwargs.get('fuel_level', None)
        self.water_level = kwargs.get('water_level', None)
        self.oil_level = kwargs.get('oil_level', None)
    
    def serialize(self):
        """
        Serializa la información del registro para facilitar la respuesta JSON.

        Returns:
            dict: Diccionario con datos serializados del registro.
        """
        user = db.get_or_404(User, self.user_id)
        
        return {
            'id': self.id,
            'type': self.type,
            'description': self.description,
            'date_time': self.date_time.strftime('%a %d %m %Y %H:%M:%S'),
            'user': f'{user.first_name} {user.last_name}',
            'truck_patent': self.truck_patent,
            'fuel_level': self.fuel_level,
            'water_level': self.water_level,
            'oil_level': self.oil_level,
        }