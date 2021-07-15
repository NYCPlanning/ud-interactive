import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Triceratops from './components/triceratops-example';
import Next from './components/Next';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App(props) {
  const { nextPos } = props;
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10}>
            <Triceratops />
            <Next nextPos={nextPos} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
App.propTypes = {
  nextPos: PropTypes.func.isRequired,
};

export default App;
