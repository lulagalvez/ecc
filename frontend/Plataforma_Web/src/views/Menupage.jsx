import { Container, Nav } from "react-bootstrap";
import "./style/menupage.css";

import NavBar from "../glovalComponent/components/NavBar";


import { motion } from "framer-motion";

const Menupage = () => {
    return(
        <motion.div
      initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >

        <p>duiashds</p> 

        <NavBar></NavBar>
        <p>duiashds</p>
    


    </motion.div>
    

    );
};

export default Menupage;