import React, { useState, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { boxBufferGeometry } from "three";
import "../assets/style.css";
import { a, useSpring } from "@react-spring/three";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });
  return (
    <orbitControls
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      autoRotate
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

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
        <Controls />
        <Box />
      </Canvas>
    </div>
  );
}
