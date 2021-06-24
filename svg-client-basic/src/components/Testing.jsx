import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { boxBufferGeometry } from "three";
import "../assets/style.css";
import { a, useSpring } from "@react-spring/three";

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "grey" : "hotpink",
  });
  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <a.meshBasicMaterial attach='material' color={props.color} />
    </a.mesh>
  );
};

export default function Testing() {
  return (
    <div>
      <Canvas>
        <Box />
      </Canvas>
    </div>
  );
}
