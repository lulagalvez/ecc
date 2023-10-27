
import { motion } from "framer-motion";


const LoginPage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p> Codigo   </p>









      </motion.div>
    );
  };
  
  export default LoginPage;