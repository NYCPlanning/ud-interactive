/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import commercialView from '../assets/rhino-views/commercial-elevated.png';
import industrialView from '../assets/rhino-views/industrial.png';
import parkView from '../assets/rhino-views/park.png';
import residentialView from '../assets/rhino-views/residential.png';

const rhinoViews = [commercialView, industrialView, parkView, residentialView];

function getViewSRC(posNumber) {
  return rhinoViews[posNumber];
}

function positionText(camPositions, posNumber) {
  return JSON.stringify(camPositions[posNumber]);
}

function originalPositionText(rhinoStuff, posNumber) {
  return JSON.stringify(rhinoStuff[posNumber]);
}

export default function VisualDebugger(props) {
  const { posNumber, modelMode, camPositions, rhinoStuff } = props;
  return (
    <div>
      <img
        style={{ height: 200, width: 'auto' }}
        src={getViewSRC(posNumber)}
        alt="see from rhino"
      />
      <p style={{ fontWeight: 800 }}>MODE</p>
      <p style={{ display: 'inline-block' }}>
        {modelMode === 1
          ? 'regular'
          : modelMode === 2
          ? 'flipped lookAt'
          : modelMode === 3
          ? 'flipped and negative LookAt'
          : 'weird modelMode'}
      </p>
      <p style={{ fontWeight: 800 }}>CURRENTLY DISPLAYED:</p>
      <p style={{ display: 'inline-block' }}>{positionText(camPositions, posNumber)}</p>
      <p style={{ fontWeight: 800 }}>FROM RHINO:</p>
      <p>{originalPositionText(rhinoStuff, posNumber)}</p>
    </div>
  );
}

VisualDebugger.propTypes = {
  posNumber: PropTypes.number.isRequired,
  modelMode: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  camPositions: PropTypes.object.isRequired,
  rhinoStuff: PropTypes.number.isRequired,
};
