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
    <orbitControls autoRotate args={[camera, gl.domElement]} ref={orbitRef} />
  );
};

const Plane = () => {
  return (
    <mesh rotate={[Math.PI / 2]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshPhysicalMaterial attach='material' color='red' />
    </mesh>
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
      <ambientLight />
      <spotLight position={[0, 5, 10]} />
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach='material' color={props.color} />
    </a.mesh>
  );
};

export default function Testing() {
  return (
    <div>
      <Canvas>
        <Controls />
        <Box />
        <Plane />
      </Canvas>
    </div>
  );
}
