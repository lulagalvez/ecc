import NavBar from "../globalComponent/components/NavBar";
import { motion } from "framer-motion";

function BinnacleRecord() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavBar />
      </motion.div>
    </>
  );
}

export default BinnacleRecord;
