import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Next(props) {
  const { nextPos } = props;
  return (
    <div>
      <div>
        <Button variant="primary" onClick={nextPos}>
          Next!
        </Button>
      </div>
    </div>
  );
}

Next.propTypes = {
  nextPos: PropTypes.func.isRequired,
};
