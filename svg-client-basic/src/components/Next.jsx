import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Next(props) {
  const { nextPos, addPosition } = props;
  return (
    <div>
      <div>
        <Button variant="primary" onClick={() => addPosition(nextPos, 10)}>
          Next!
        </Button>
      </div>
    </div>
  );
}

Next.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  nextPos: PropTypes.object.isRequired,
  addPosition: PropTypes.func.isRequired,
};
