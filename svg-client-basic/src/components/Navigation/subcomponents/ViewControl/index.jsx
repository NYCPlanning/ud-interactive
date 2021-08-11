import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import left from './assets/left.png';
import right from './assets/right.png';
import up from './assets/up.png';
import down from './assets/down.png';

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
