import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import information from './subcomponents/ViewControl/assets/information.svg';

import ViewControl from './subcomponents/ViewControl';

export default function Navigation(props) {
  const { setUntimedAnimation, stepNum, setStepNum, fromCamerasCamPositions } = props;
  return (
    <div id="toolbar" className="d-inline-block navigation">
      <Dropdown className="noSelect buttonElement d-inline-block bar-padding shadow-none">
        <Dropdown.Toggle
          className="div-inline dropdown buttonElement noSelect shadow-none"
          variant="success"
          id="dropdown-basic"
        >
          Residential View
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown " id="menu">
          <Dropdown.Item className="dropdown-item" href="#/action-1">
            Waterfront View
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="#/action-2">
            Industrial View
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="#/action-3">
            Park View
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button
        onClick={
          () =>
            setUntimedAnimation({
              isPosition: true,
              duration: 5,
              position: fromCamerasCamPositions[stepNum + 1],
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        // eslint-disable-next-line prettier/prettier
        id="next"
        className="buttonElement d-inline-block bar-padding noSelect shadow-none"
        type="button"
      >
        Next
      </Button>
      <div id="control-group" className="d-inline-block">
        <ViewControl
          // addMovement={addMovement}
          control="left"
          className="d-inline-block view-control"
        />
        <ViewControl
          // addMovement={addMovement}
          control="right"
          className="d-inline-block view-control"
        />
        <ViewControl
          // addMovement={addMovement}
          control="up"
          className="d-inline-block view-control"
        />
        <ViewControl
          // addMovement={addMovement}
          control="down"
          className="d-inline-block view-control"
        />
      </div>
      <h1 id="streetscapes-text">STREETSCAPES FOR WELLNESS</h1>
      <img id="information" className="d-inline-block" src={information} alt="information" />
    </div>
  );
}

Navigation.propTypes = {
  // // eslint-disable-next-line react/forbid-prop-types
  setUntimedAnimation: PropTypes.func.isRequired,
  stepNum: PropTypes.number.isRequired,
  // // eslint-disable-next-line react/forbid-prop-types
  // nextPos: PropTypes.object.isRequired,
  setStepNum: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  fromCamerasCamPositions: PropTypes.object.isRequired,
  // previousPos: PropTypes.object.isRequired,
};
