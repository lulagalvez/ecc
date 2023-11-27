import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ImagenHolder from "../../image/placeholder.jpg";
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

function CardExample() {
  return (
    <div className="d-flex justify-content-around">
      <Card
        border="dark"
        bg="dark"
        className="text-center"
        style={{ width: "18rem" }}
        text="white"
      >
        <Card.Img variant="top" src={ImagenHolder} />
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
    </div>
  );
}

export default CardExample;
