import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Tetrahedron(props) {
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // const [show, setShow] = useState(false);

  useEffect(
    () =>
      setTimeout(() => {
        mesh.current.material.opacity = 0.0001;
        mesh.current.visible = true;
      }, 800),
    []
  );

  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.z += 0.002;

    if (mesh.current.visible && mesh.current.material.opacity <= 1) {
      mesh.current.material.opacity *= 1.05;
    }
  });

  return (
    <mesh ref={mesh} {...props.args.tetrahedron} visible={false}>
      <tetrahedronBufferGeometry args={[props.args.tetrahedron.size, 0]} />
      <meshStandardMaterial
        color={props.color}
        transparent={true}
        opacity={0.0}
      />
    </mesh>
  );
}
