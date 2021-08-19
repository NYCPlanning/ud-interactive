import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
// import Navigation from './components/Navigation/index';
import AltNavigation from './components/AltNavigation';


const App = () => (
  <>
    <AnimatedScene />
    <AltNavigation />
  </>
);


App.propTypes = {};


export default App;
