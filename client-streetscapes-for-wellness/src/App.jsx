import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Navigation from './components/Navigation/index';

function App() {
  return (
    <div className="App">
      <AnimatedScene />
      <Navigation />
    </div>
  );
}
App.propTypes = {};

export default App;
