import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

function CardExample() {
  return (
    <Card
      bg="dark"
      border="secondary"
      className="text-center"
      style={{ width: "18rem" }}
      text="white"
    >
      <Card.Img variant="top" src={ImagenPrueba} />
      <Card.Body>
        <Placeholder as={Card.Title} className="my-3 py-2" animation="glow">
          <Placeholder xs={10} />
        </Placeholder>
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <div className="mb-2 custom-divider border-top"></div>
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <div className="mb-2 custom-divider border-top"></div>
        <Placeholder as={Card.Text} className="mb-2" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default CardExample;
