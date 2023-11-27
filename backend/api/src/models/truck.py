from src.extensions import db

class Truck(db.Model):
    """
    Representa un camión en el sistema, identificado principalmente por su patente.

    Attributes:
        patent (str): Patente del camión, que actúa como identificador primario.
    """
    patent = db.Column(db.String(6), primary_key=True)
        
    def __init__(self, patent):
        """
        Inicializa una nueva instancia del modelo Truck.

        Args:
            patent (str): La patente del camión.
        """
        self.patent = patent.upper()
        
    def serialize(self):
        """
        Serializa la información del camión para facilitar la respuesta JSON.

        Returns:
            dict: Diccionario con datos serializados del camión.
        """
        return {
            'patent': self.patent,
        }