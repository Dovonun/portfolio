import ReactDOM from "react-dom";
import * as THREE from "three";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Star from "../components/Star.js";

function Stars(props) {
  function randomNumber(range) {
    const value = THREE.MathUtils.randFloatSpread(range);
    return value;
  }

  function randomPos({ xrange, yrange, zrange }) {
    const [x, y, z] = [
      randomNumber(xrange),
      randomNumber(yrange),
      randomNumber(zrange),
    ];
    return props.args.restriction(x, y)
      ? randomPos(props.args.spread)
      : [x, y, z];
  }

  const gp = useRef();
  // const stars = Array(100)
  //   .fill()
  //   .map((star) => ({
  //     position: randomPos(),
  //     rotation: Array(3).fill(randomNumber(10)),
  //   }));

  const [active, setActive] = useState({
    x: "go",
    y: "stop",
    stars: Array(props.args.ammount)
      .fill()
      .map((star) => ({
        position: randomPos(props.args.spread),
        rotation: Array(3).fill(randomNumber(10)),
        args: [Math.random() / 4 + 0.1, Math.floor(Math.random() * 4) + 1],
      })),
  });

  useFrame((state, delta) => {
    gp.current.rotation.x += active.x === "go" ? 0.0002 : 0;
    gp.current.rotation.x += active.x === "reverse" ? -0.0002 : 0;

    gp.current.rotation.y += active.y === "go" ? 0.0002 : 0;
    gp.current.rotation.y += active.y === "reverse" ? -0.0002 : 0;

    if (gp.current.rotation.x >= 0.1 && active.x === "go") {
      setActive({ x: active.x, y: "go", stars: active.stars });
    }

    if (gp.current.rotation.x >= 0.2 && active.x === "go") {
      setActive({ x: "reverse", y: active.y, stars: active.stars });
    }
    if (gp.current.rotation.y >= 0.2 && active.y === "go") {
      setActive({ x: active.x, y: "reverse", stars: active.stars });
    }
    if (gp.current.rotation.x <= -0.2 && active.x === "reverse") {
      setActive({ x: "go", y: active.y, stars: active.stars });
    }
    if (gp.current.rotation.y <= -0.2 && active.y === "reverse") {
      setActive({ x: active.x, y: "go", stars: active.stars });
    }
  });

  return (
    <group ref={gp}>
      {active.stars.map((star, index) => {
        return (
          <Star
            key={index}
            position={star.position}
            rotation={star.rotation}
            args={star.args}
          />
        );
      })}
    </group>
  );
}

export default Stars;

// <Star position={[0, 0, 10]} rotation={[5, 10, 160]} />;
