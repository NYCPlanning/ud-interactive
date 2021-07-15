import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Triceratops from './components/Triceratops';
import Next from './components/Next';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App(props) {
  const { nextPos } = props;
  const { posNumber } = props;
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10}>
            <Triceratops posNumber={posNumber} />
            <Next nextPos={nextPos} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
App.propTypes = {
  nextPos: PropTypes.func.isRequired,
  posNumber: PropTypes.number.isRequired,
};

export default App;
