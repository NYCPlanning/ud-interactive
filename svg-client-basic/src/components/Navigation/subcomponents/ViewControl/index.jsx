/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import left from './assets/left.png';
import right from './assets/right.png';
import up from './assets/up.png';
import down from './assets/down.png';

const movementObject = [
  {
    x: 0,
    y: 0,
    z: 0,
    rotate: { x: -0.5, y: 0, z: 0 },
  },
  {
    x: 0,
    y: 0,
    z: 0,
    rotate: { x: 0.5, y: 0, z: 0 },
  },
  {
    x: 0,
    y: 0,
    z: 0,
    rotate: { x: 0, y: 0.5, z: 0 },
  },
  {
    x: 0,
    y: 0,
    z: 0,
    rotate: { x: 0, y: -0.5, z: 0 },
  },
];

// need to come up with way in reducer to deal with movements that don't have all of the info! maybe this is just separate

export default function ViewControl(props) {
  const arrows = [left, right, up, down];
  let movement = null;
  const { control } = props;
  let image = null;
  switch (control) {
    case 'left':
      image = left;
      movement = movementObject[0];
      break;
    case 'right':
      image = right;
      movement = movementObject[1];
      break;
    case 'up':
      image = up;
      movement = movementObject[2];
      break;
    case 'down':
      image = down;
      movement = movementObject[3];
      break;
    default:
      image = null;
  }
  // onClick={() => addMovement(movement, 2)}
  return (
    <Button className="viewcontrol-button shadow-none">
      <img src={image} alt={`arrow pointing ${control}`} />
    </Button>
  );
}

ViewControl.propTypes = {
  control: PropTypes.string.isRequired,
  // addMovement: PropTypes.func.isRequired,
};
