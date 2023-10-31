import { Container,Row,Col } from "react-bootstrap";
import "./style/menupage.css";

import NavBar from "../glovalComponent/components/NavBar";


import { motion } from "framer-motion";

import { useState } from 'react';

const Menupage = () => {

const [showOffcanvas, setShowOffcanvas] = useState(false);

  const onOffcanvasShow = () => setShowOffcanvas(true);
  const onOffcanvasClose = () => setShowOffcanvas(false);


    return(
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
                    onOffcanvasShow={onOffcanvasShow}
                    onOffcanvasClose={onOffcanvasClose}
                    showOffcanvas={showOffcanvas}
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

export default Menupage;