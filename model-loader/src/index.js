import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import Plane from "./model";
import Model from './DOC';
import Plane2 from './Small-airplane-v3';
import Buggy from './Buggy';

const App = () => (
  <Canvas style={{ height: 400, width: 800 }}>
    <pointLight position={[5, 5, 5]} />
    <Suspense fallback={null}>
      {/* <Plane rotation={[0, Math.PI * 1.25, 0]} /> */}gl
      {/* <Model /> */}
      {/* <Plane2 /> */}
      <Buggy />
    </Suspense>
    <OrbitControls />
    {/* <Stats /> */}
  </Canvas>
);

ReactDOM.render(<App />, document.getElementById("root"));
