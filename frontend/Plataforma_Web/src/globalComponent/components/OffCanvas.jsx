import "../styles/OffCanvas.css";

import Logo from "../../image/shield-image.png";
import UserContext from "../../UserContextApi/UserContext";
import RegisterUser from "../../views/RegisterUser";
import EditeUser from "./EditeUser";

import {
  Button,
  Offcanvas,
  ListGroup,
  Badge,
  ToggleButton,
  ButtonGroup,
  Modal,
  Alert,
} from "react-bootstrap";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Image } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

import { AiOutlineUserSwitch } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { PiUsersFourLight } from "react-icons/pi";
import { FaRegFileArchive } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdOutlineEmergencyShare } from "react-icons/md";
import { GiPoliceCar } from "react-icons/gi";
import { CgUnavailable } from "react-icons/cg";

import { FaUserPlus } from "react-icons/fa6";
import { FaUserPen } from "react-icons/fa6";

import { useContext } from "react";

function OffCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AccordionSection({ title, icon, eventKey, content }) {
    return (
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>
          {icon && <span className="me-2">{icon}</span>}
          {title}
        </Accordion.Header>
        <Accordion.Body>{content}</Accordion.Body>
      </Accordion.Item>
    );
  }

  function FiltradoDeUsuarios() {
    const { radioValue, setRadioValue } = useContext(UserContext);

    const radios = [
      {
        name: (
          <>
            <div className="d-flex align-items-center  justify-content-start ">
              <TiThSmallOutline />
              <span className="ms-3">Todo el personal</span>
            </div>
          </>
        ),
        value: "1",
      },
      {
        name: (
          <>
            <div className="d-flex align-items-center  justify-content-start ">
              <MdOutlineEventAvailable />
              <span className="ms-3">Personal en activo</span>
            </div>
          </>
        ),
        value: "2",
      },
      {
        name: (
          <>
            <div className="d-flex align-items-center  justify-content-start ">
              <MdOutlineEmergencyShare />
              <span className="ms-3">Personal en emergencia</span>
            </div>
          </>
        ),
        value: "3",
      },
      {
        name: (
          <>
            <div className="d-flex align-items-center  justify-content-start ">
              <GiPoliceCar />
              <span className="ms-3">Personal en conduccion </span>
            </div>
          </>
        ),
        value: "4",
      },
      {
        name: (
          <>
            <div className="d-flex align-items-center  justify-content-start ">
              <CgUnavailable />
              <span className="ms-3"> Personal en ausente </span>
            </div>
          </>
        ),
        value: "5",
      },
    ];

    return (
      <>
        <ButtonGroup className="d-flex " vertical>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              size="lg"
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }

  function EstadisticasUsuarios() {
    const { allUsers } = useContext(UserContext); //1
    const { activeUsers } = useContext(UserContext); //2
    const { emergencyUsers } = useContext(UserContext); //3
    const { driverUsers } = useContext(UserContext); //4
    const { inactiveUsers } = useContext(UserContext); //5
    return (
      <ListGroup variant="flush" as="ul">
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            {" "}
            <TiThSmallOutline className="mx-2" /> Personal registrado
          </span>
          <Badge bg="dark" pill>
            {allUsers.length}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <MdOutlineEventAvailable className="mx-2" /> Personal en activo
          </span>
          <Badge bg="dark" pill>
            {activeUsers.length}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <MdOutlineEmergencyShare className="mx-2" /> Personal en emergencia
          </span>
          <Badge bg="dark" pill>
            {emergencyUsers.length}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <GiPoliceCar className="mx-2" />
            Personal en conduccion
          </span>
          <Badge bg="dark" pill>
            {driverUsers.length}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <CgUnavailable className="mx-2" />
            Personal en ausente
          </span>
          <Badge bg="dark" pill>
            {inactiveUsers.length}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    );
  }

  function GestionUsuarios() {
    const [selectedModal, setSelectedModal] = useState(null);
    const { allUsers } = useContext(UserContext);

    const handleItemClick = (modalId) => {
      setSelectedModal(modalId);
    };

    const handleClose = () => {
      setSelectedModal(null);
    };

    return (
      <>
        <ListGroup defaultActiveKey="false" variant="flush">
          <ListGroup.Item
            action
            onClick={() => handleItemClick("crearUsuario")}
          >
            <div className="d-flex align-items-center  justify-content-start ">
              <FaUserPlus />
              <span className="ms-3">Crear Usuario</span>
            </div>
          </ListGroup.Item>

          <ListGroup.Item
            action
            onClick={() => handleItemClick("editarUsuario")}
          >
            <div className="d-flex align-items-center  justify-content-start ">
              <FaUserPen />
              <span className="ms-3">Editar Usuario </span>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <Modal show={selectedModal === "crearUsuario"} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterUser />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Modal
          centered
          show={selectedModal === "editarUsuario"}
          onHide={handleClose}
          scrollable
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditeUser users={allUsers} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow} size="lg">
        <MdMenu />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll="true"
        backdrop={false}
        placement="start"
        autoFocus={false}
        className="custom-offcanvas"
      >
        <Offcanvas.Header
          closeButton
          className="offcanvas-header  d-flex  align-items-center  justify-content-between"
          closeVariant="white"
        >
          <Image src={Logo} alt="Logo" className="offcanvas-logo" />
          <Offcanvas.Title className="offcanvas-title ms-5">
            Primera Compañía de Bomberos: Talcahuano
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="offcanvas-body">
          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <AccordionSection
              title="Filtrado de Usuarios"
              icon={<AiOutlineUserSwitch />}
              eventKey={"0"}
              content={<FiltradoDeUsuarios />}
            />
            <AccordionSection
              title="Estadísticas de Usuarios"
              icon={<FcStatistics />}
              eventKey={"1"}
              content={<EstadisticasUsuarios />}
            />
            <AccordionSection
              title="Gestión de Usuarios"
              icon={<PiUsersFourLight />}
              eventKey={"2"}
              content={<GestionUsuarios />}
            />
            <AccordionSection
              title="Bitacoras"
              icon={<FaRegFileArchive />}
              eventKey={"3"}
              content=""
            />
            <AccordionSection
              title="Ajustes"
              icon={<CiSettings />}
              eventKey={"4"}
              content=""
            />
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
