import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Previous(props) {
  const { previousPos, addPosition } = props;
  return (
    <div>
      <div>
        <Button variant="primary" onClick={() => addPosition(previousPos, 5)}>
          {' '}
          Previous!
        </Button>
      </div>
    </div>
  );
}

Previous.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  previousPos: PropTypes.object.isRequired,
  addPosition: PropTypes.func.isRequired,
};
