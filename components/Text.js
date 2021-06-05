import ReactDOM from "react-dom";
import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { FontLoader } from "three/src/loaders/FontLoader.js";
import * as THREE from "three";

export default function Text(props) {
  useEffect(
    () =>
      setTimeout(() => {
        mesh.current.visible = true;
      }, 1050),
    []
  );

  const mesh = useRef();

  const font = useLoader(THREE.FontLoader, "/Poppins_Regular.json");
  const config = {
    blending: THREE.CustomBlending,
    blendEquation: THREE.SubtractEquation,
    blendSrc: THREE.OneMinusDstAlphaFactor,
    blendDst: THREE.OneMinusDstColorFactor,
  };

  useFrame((state, delta) => {
    if (mesh.current.visible && mesh.current.material.opacity <= 1) {
      mesh.current.material.opacity *= 1.1;
    }
  });

  return (
    <mesh ref={mesh} {...props.args.text} visible={false}>
      <textGeometry
        args={[
          props.args.text.value,
          { font, size: props.args.text.size, height: 0.001 },
        ]}
      />
      <meshStandardMaterial
        color={props.color}
        args={[config]}
        transparent={true}
        opacity={0.0}
      />
    </mesh>
  );
}
