import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Navigation from './components/Navigation/index';

// const camPositions = camPositionsCalc();

function App() {
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  return (
    <div className="App">
      <AnimatedScene />
      <Navigation />
    </div>
  );
}
App.propTypes = {};

export default App;
