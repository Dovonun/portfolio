import { Canvas, useRame } from "@react-three/fiber";
import React, { useRef, Suspense, useState } from "react";
import { motion } from "framer-motion";

import CanvasContainer from "../components/CanvasContainer";

const args = {
  color: {
    main: "#FF00AA",
    bright: "#ffccee",
    dark: "#330022",
  },
};

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CanvasContainer args={args} />
      <motion.h1
        className="pageOneH1"
        transition={{ delay: 0.5 }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Hi <br></br>my name <br></br> is
      </motion.h1>
      <div className="line">
        <motion.div
          transition={{ delay: 0.8 }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

//         <camera
// camera={{ fov: 75, near: 0.1, far: 1000, z: 5, lookAt: [0, 0, 0] }}
// ></camera>

//{{ zoom: 1, position: [0, 2, 10] }}
