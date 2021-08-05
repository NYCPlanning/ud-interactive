/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

export default function DollyDebugger(props) {
  const { oldPositions, newPositions, oldLookAt, newLookAt, currentPositions, currentLookAt } =
    props;
  return (
    <div>
      <p style={{ fontWeight: 800 }}>OLD POSITIONS</p>
      <p style={{ display: 'inline-block' }}>{oldPositions}</p>
      <p style={{ fontWeight: 800 }}>CURRENT POSITIONS</p>
      <p style={{ display: 'inline-block' }}>{currentPositions}</p>
      <p style={{ fontWeight: 800 }}>NEW POSITIONS</p>
      <p style={{ display: 'inline-block' }}>{newPositions}</p>
      <br />
      <br />
      <p style={{ fontWeight: 800 }}>OLD LOOKAT</p>
      <p style={{ display: 'inline-block' }}>{oldLookAt}</p>
      <p style={{ fontWeight: 800 }}>CURRENT LOOKAT</p>
      <p style={{ display: 'inline-block' }}>{currentLookAt}</p>
      <p style={{ fontWeight: 800 }}>NEW LOOKAT</p>
      <p style={{ display: 'inline-block' }}>{newLookAt}</p>
    </div>
  );
}

DollyDebugger.propTypes = {
  oldPositions: PropTypes.object.isRequired,
  newPositions: PropTypes.object.isRequired,
  oldLookAt: PropTypes.object.isRequired,
  newLookAt: PropTypes.object.isRequired,
  currentPositions: PropTypes.object.isRequired,
  currentLookAt: PropTypes.object.isRequired,
};
