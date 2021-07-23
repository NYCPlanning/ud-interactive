import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Previous(props) {
  const { previousPos } = props;
  return (
    <div>
      <div>
        <Button variant="primary" onClick={previousPos}>
          Previous!
        </Button>
      </div>
    </div>
  );
}

Previous.propTypes = {
  previousPos: PropTypes.func.isRequired,
};
