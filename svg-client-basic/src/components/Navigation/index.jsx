import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import ViewsDropdown from './subcomponents/ViewsDropdown';

export default function Navigation() {
  return (
    <div id="toolbar">
      <Button id="next" className="buttonElement" type="button">
        Next
      </Button>
      <ViewsDropdown />
    </div>
  );
}
