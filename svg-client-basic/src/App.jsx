import React from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import './App.css';
import { ReactComponent as CityBlocks } from './assets/city-blocks.svg';
import CityBlocksPNG from './assets/city-blocks.png';

const style = {
  position: 'top',
  trigger: 'mouseenter',
};

const jsonForTooltips = [
  {
    x: 200,
    y: 30,
    textContent: 'test',
  },
];

function App() {
  return (
    <div className="App">
      {jsonForTooltips.map((tip) => {
        return (
          <div style={{ position: 'absolute', top: `${tip.y} vh`, right: `20vw` }}>
            <Tooltip title={tip.textContent} position={style.position} trigger={style.trigger}>
              <p>⬤</p>
            </Tooltip>
          </div>
        );
      })}
      <CityBlocks />
    </div>
  );
}

export default App;
