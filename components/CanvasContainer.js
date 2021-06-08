import ReactDOM from "react-dom";
import * as THREE from "three";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Tetrahedron from "../components/Tetrahedron.js";
import Text from "../components/Text.js";
import Stars from "../components/Stars.js";

import styles from "../styles/CanvasContainer.module.css";

export default function CanvasContainer(props) {
  useEffect(() => {
    const handleSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleSize);
    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const [size, setSize] = useState([1920, 1080]);

  const getArgs = () => {
    if (size[0] > 1900 && size[1] > 992 && size[0] / size[1] > 2.2) {
      return {
        text: {
          position: [-65, -20, 0],
          value: `Severin Reifler`,
          size: 11,
        },
        tetrahedron: {
          position: [45, -15, -80],
          size: 60,
        },
        stars: {
          ammount: 150,
          restriction: (x, y) => x > -65 && x < 50 && y > -30 && y < 10,
          spread: { xrange: 300, yrange: 150, zrange: 100 },
        },
      };
    }
    if (size[0] > 1900 && size[1] > 992) {
      return {
        text: {
          position: [-40, -16, 0],
          value: "Severin Reifler",
          size: 8,
        },
        tetrahedron: {
          position: [35, -15, -80],
          size: 40,
        },
        stars: {
          ammount: 150,
          restriction: (x, y) => x > -65 && x < 50 && y > -30 && y < 10,
          spread: { xrange: 300, yrange: 150, zrange: 100 },
        },
      };
    }
    if (size[0] < 768) {
      return {
        text: {
          position: [-10, -15, 0],
          value: "Severin",
          size: 4,
        },
        tetrahedron: {
          position: [5, -25, -80],
          size: 15,
        },
        stars: {
          ammount: 50,
          restriction: (x, y) => x > -12 && x < 12 && y > -22 && y < -5,
          spread: { xrange: 40, yrange: 80, zrange: 40 },
        },
      };
    }
    return {
      text: {
        position: [-23, -15, 0],
        value: "Severin Reifler",
        size: 5,
      },
      tetrahedron: {
        position: [10, -25, -80],
        size: 25,
      },
      stars: {
        ammount: 70,
        restriction: (x, y) => x > -25 && x < 25 && y > -22 && y < -5,
        spread: { xrange: 80, yrange: 100, zrange: 40 },
      },
    };
  };

  return (
    <div className={styles.container}>
      <Canvas
        orthographic={true}
        gl={{ antialias: true }}
        camera={{ zoom: 10, position: [0, 2, 10] }}
      >
        <ambientLight args={["#ffffff", 0.5]} />
        <pointLight position={[-50, 5, -25]} intensity={0.6} />
        <pointLight position={[30, -20, 3]} intensity={0.4} />
        <Tetrahedron color={props.args.color.bright} args={getArgs()} />
        <Suspense fallback={null}>
          <Text color={props.args.color.main} args={getArgs()} />
        </Suspense>
        <Stars args={getArgs().stars} />
      </Canvas>
    </div>
  );
}

// {{ zoom: 1, position: [0, 2, 10] }}
// {{ fov: 90, near: 1, far: 1000, position: [0, 1, 50] }}
