import React, { useRef } from 'react';
import { Tooltip } from 'react-svg-tooltip';
import './App.css';
import { ReactComponent as CityBlocks } from './assets/city-blocks.svg';

function App() {
  const circleRef1 = useRef(null);

  return (
    <div className="App">
      <svg viewBox="0 0 100 100">
        <CityBlocks />

        <circle ref={circleRef1} cx={72} cy={30} r={1} fill="red" />
        <Tooltip triggerRef={circleRef1}>
          <rect x={2} y={2} width={20} height={5} rx={0.5} ry={0.5} fill="black" />
          <text x={5} y={5} fontSize={2} fill="white">
            Building label
          </text>
        </Tooltip>

        <circle ref={circleRef1} cx={53} cy={44} r={1} fill="red" />
        <Tooltip triggerRef={circleRef1}>
          <rect x={2} y={2} width={15} height={5} rx={0.5} ry={0.5} fill="black" />
          <text x={5} y={5} fontSize={2} fill="white">
            Park label
          </text>
        </Tooltip>

        <circle ref={circleRef1} cx={35} cy={58} r={1} fill="red" />
        <Tooltip triggerRef={circleRef1}>
          <rect x={2} y={2} width={15} height={5} rx={0.5} ry={0.5} fill="black" />
          <text x={5} y={5} fontSize={2} fill="white">
            Street label
          </text>
        </Tooltip>
      </svg>
    </div>
  );
}

export default App;
