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
} from "react-bootstrap";

import { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { Image } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

import { AiOutlineUserSwitch } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { PiUsersFourLight } from "react-icons/pi";
import { LuFiles } from "react-icons/lu";
import { FaRegFileArchive } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdOutlineEmergencyShare } from "react-icons/md";
import { GiPoliceCar } from "react-icons/gi";
import { CgUnavailable } from "react-icons/cg";

import { FaUserPlus } from "react-icons/fa6";
import { FaUserPen } from "react-icons/fa6";

import { BsFillEnvelopePlusFill } from "react-icons/bs";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { BsFillEnvelopeXFill } from "react-icons/bs";

import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OffCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { radioValue, setRadioValue } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    /* revisar despues para verificar el renderizado excesivo de offcanvas*/
    const isNotInMenuPage = !location.pathname.includes("/menupage");

    if (isNotInMenuPage && radioValue !== "1") {
      navigate("/menupage", { replace: true });
    }
  }, [radioValue, location.pathname, navigate]);

  function AccordionSection({ title, icon, eventKey, content }) {
    return (
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header bsPrefix="custom-accordion-header">
          {icon && <span className="me-2">{icon}</span>}
          {title}
        </Accordion.Header>
        <Accordion.Body>{content}</Accordion.Body>
      </Accordion.Item>
    );
  }

  function FiltradoDeUsuarios() {
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
          <Badge bg="dark">{allUsers.length}</Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <MdOutlineEventAvailable className="mx-2" /> Personal en activo
          </span>
          <Badge bg="success">{activeUsers.length}</Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          action
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <MdOutlineEmergencyShare className="mx-2" /> Personal en emergencia
          </span>
          <Badge bg="danger">{emergencyUsers.length}</Badge>
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
          <Badge bg="warning" text="dark">
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
          <Badge bg="secondary">{inactiveUsers.length}</Badge>
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

        <Modal
          show={selectedModal === "crearUsuario"}
          size="md"
          centered
          scrollable
        >
          <Modal.Header>
            <Modal.Title>Crear Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterUser handleClose={handleClose} />
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

  function Registros() {
    const registroClick = () => {
      setRadioValue("1");
      navigate("/registro-horas", { replace: true });
    };

    return (
      <>
        <ListGroup defaultActiveKey="false" variant="flush">
          <ListGroup.Item action onClick={registroClick}>
            <div className="d-flex align-items-center justify-content-start">
              <FaUserPlus />
              <span className="ms-3">Registros de personal</span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  }

  function Bitacoras() {
    const [selectedModal, setSelectedModal] = useState(null);

    const handleItemClick = (modalId) => {
      setSelectedModal(modalId);
    };

    const handleClose = () => {
      setSelectedModal(null);
    };

    const bitacorasClickRegistro = () => {
      setRadioValue("1");
      navigate("/record-binnacle", { replace: true });
    };
    return (
      <>
        <ListGroup defaultActiveKey="false" variant="flush">
          <ListGroup.Item
            action
            onClick={() => handleItemClick("crearbitacora")}
          >
            <div className="d-flex align-items-center justify-content-start">
              <BsFillEnvelopePlusFill />
              <span className="ms-3">Crear Bitacora</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => handleItemClick("editarBitacora")}
          >
            <div className="d-flex align-items-center justify-content-start">
              <BsFillEnvelopePaperFill />
              <span className="ms-3">Editar Bitacora</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action onClick={bitacorasClickRegistro}>
            <div className="d-flex align-items-center justify-content-start">
              <BsFillEnvelopeXFill />
              <span className="ms-3">Registros de Bitacoras</span>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <Modal show={selectedModal === "crearbitacora"} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Bitacora</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Modal show={selectedModal === "editarBitacora"} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Bitacora</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }

  const defaultActiveKeys = ["0", "2", "3"]; // Puedes ajustar las claves según tus necesidades

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
          <Accordion defaultActiveKey={defaultActiveKeys} flush alwaysOpen>
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
              title="Registros"
              icon={<LuFiles />}
              eventKey={"3"}
              content={<Registros />}
            />
            <AccordionSection
              title="Bitacoras"
              icon={<FaRegFileArchive />}
              eventKey={"4"}
              content={<Bitacoras />}
            />
            <AccordionSection
              title="Ajustes"
              icon={<CiSettings />}
              eventKey={"5"}
              content=""
            />
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
