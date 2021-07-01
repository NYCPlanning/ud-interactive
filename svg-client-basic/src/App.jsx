import React from 'react';
import { Tooltip } from 'react-svg-tooltip';
import './App.css';
import { ReactComponent as CityBlocks } from './assets/city-blocks.svg';
import CityBlocksPNG from './assets/city-blocks.png';

const style = {
  r: 1,
  fill: 'red',
  rectX: 2,
  rectY: 2,
  rx: 0.5,
  ry: 0.5,
  rectFill: 'black',
  textX: 5,
  textY: 5,
  fontSize: 2,
  textFill: 'white',
};

const jsonForTooltips = [
  {
    cx: 72,
    cy: 30,
    rectWidth: 20,
    rectHeight: 5,
    textContent: 'Building label',
  },
  {
    cx: 35,
    cy: 58,
    rectWidth: 15,
    rectHeight: 5,
    textContent: 'Street label',
  },
  {
    cx: 53,
    cy: 44,
    rectWidth: 15,
    rectHeight: 5,
    textContent: 'Park label',
  },
  {
    cx: 10,
    cy: 30,
    rectWidth: 15,
    rectHeight: 5,
    textContent: 'test',
  },
];

function App() {
  return (
    <div className="App">
      <svg viewBox="0 0 100 100">
        <g>
          <image href={CityBlocksPNG} width="100%" height="100%" x="0" y="0" />
          {jsonForTooltips.map((tip) => {
            const newRef = React.createRef();
            return (
              <g>
                <circle ref={newRef} cx={tip.cx} cy={tip.cy} r={style.r} fill={style.fill} />
                <Tooltip triggerRef={newRef}>
                  <rect
                    x={style.rectX}
                    y={style.rectY}
                    width={tip.rectWidth}
                    height={tip.rectHeight}
                    rx={style.rx}
                    ry={style.ry}
                    fill={style.rectFill}
                  />
                  <text
                    x={style.textX}
                    y={style.textY}
                    fontSize={style.fontSize}
                    fill={style.textFill}
                  >
                    {tip.textContent}
                  </text>
                </Tooltip>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
