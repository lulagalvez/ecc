import { Container, Row, Col } from "react-bootstrap";
import "./style/LogPage.css";
import NavBar from "../globalComponent/components/NavBar";
import { motion } from "framer-motion";

const LogPage = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >

            <Container fluid>
                <Row className="flex-column page ">
                    <Col className="w-100 col-1" xs={12} md={2}>
                        <NavBar
                            usuario="Joseeeeee"
                        ></NavBar>
                    </Col>

                    <Col className="w-100 col-2" xs={12} md={10}>
                        <p>diuashdsa</p>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
};

export default LogPage;