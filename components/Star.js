import ReactDOM from "react-dom";
import * as THREE from "three";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Tetrahedron(props) {
  const [args, setArgs] = useState(props.args);

  useFrame((state, delta) => {});

  const mesh = useRef();

  return (
    <mesh ref={mesh} {...props} onClick={() => console.log(mesh)}>
      <tetrahedronBufferGeometry args={args} />
      <meshBasicMaterial />
    </mesh>
  );
}
