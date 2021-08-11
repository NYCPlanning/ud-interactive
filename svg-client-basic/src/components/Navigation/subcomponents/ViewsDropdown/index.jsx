import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import React from 'react';

export default function ViewsDropdown() {
  return (
    <div>
      <Dropdown className="noSelect buttonElement d-inline-block">
        <Dropdown.Toggle
          className="div-inline dropdown buttonElement"
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
    </div>
  );
}
