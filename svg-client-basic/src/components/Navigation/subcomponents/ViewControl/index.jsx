import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import left from './assets/left.png';
import right from './assets/right.png';
import up from './assets/up.png';
import down from './assets/down.png';

const movementObject = {
  x: 0,
  y: 0,
  z: 0,
  rotate: { x: 0, y: 0, z: 0 },
  fov: 30,
  near: 10,
  far: 1000,
};

// need to come up with way in reducer to deal with movements that don't have all of the info! maybe this is just separate

export default function ViewControl(props) {
  const arrows = [left, right, up, down];
  const { control } = props;
  let image = null;
  switch (control) {
    case 'left':
      image = left;
      break;
    case 'right':
      image = right;
      break;
    case 'up':
      image = up;
      break;
    case 'down':
      image = down;
      break;
    default:
      image = null;
  }
  return (
    <Button className="viewcontrol-button shadow-none">
      <img src={image} alt={`arrow pointing ${control}`} />
    </Button>
  );
}

ViewControl.propTypes = {
  control: PropTypes.string.isRequired,
};
