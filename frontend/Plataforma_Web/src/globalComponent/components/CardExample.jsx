import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

/**
 * Componente de ejemplo de tarjeta que muestra un contenedor de tarjeta con contenido de marcador de posición.
 * Utiliza React Bootstrap para la creación de tarjetas y marcadores de posición.
 * @returns {JSX.Element} Elemento JSX del componente de ejemplo de tarjeta.
 */
function CardExample() {
  return (
    <Card
      bg="dark" // Color de fondo de la tarjeta
      border="secondary" // Color del borde de la tarjeta
      className="text-center" // Clases de estilo de la tarjeta
      style={{ width: "18rem" }} // Estilo personalizado para el ancho de la tarjeta
      text="white" // Color del texto dentro de la tarjeta
    >
      {/* Imagen de la tarjeta */}
      <Card.Img variant="top" src={ImagenPrueba} />

      {/* Cuerpo de la tarjeta */}
      <Card.Body>
        {/* Título de la tarjeta (utiliza marcador de posición) */}
        <Placeholder as={Card.Title} className="my-3 py-2" animation="glow">
          <Placeholder xs={10} />
        </Placeholder>

        {/* Texto de la tarjeta (utiliza marcador de posición) */}
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>

        {/* Separador personalizado entre secciones */}
        <div className="mb-2 custom-divider border-top"></div>

        {/* Texto de la tarjeta (utiliza marcador de posición) */}
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>

        {/* Separador personalizado entre secciones */}
        <div className="mb-2 custom-divider border-top"></div>

        {/* Texto de la tarjeta (utiliza marcador de posición) */}
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default CardExample;
