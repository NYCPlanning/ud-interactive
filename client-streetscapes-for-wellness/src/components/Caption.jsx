import React from 'react';
import PropTypes from 'prop-types';

const style = {
  width: 400,
  height: 250,
  fontSize: 18,
  fontFamily: 'Helvetica',
  fontWeight: 100,
  borderRadius: 10,
  border: 1,
  padding: 20,
  margin: 5,
  borderColor: 'black',
  textAlign: 'left',
  backgroundColor: '#ededed',
  color: 'black',
};

const captions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet sem sed risus lacinia laoreet sit amet et ligula. Donec convallis condimentum scelerisque. Cras laoreet quis ligula id tempus. Ut a ornare eros.',
  'Fusce accumsan at dui ac ullamcorper. Aliquam quis ultrices nulla. Morbi in dolor vel urna volutpat vehicula eget eu odio. Cras facilisis risus vel tortor vulputate,  ',
  'Proin at iaculis augue. Suspendisse sodales ligula sed nibh aliquet, feugiat suscipit felis interdum. Sed elementum vestibulum elit, in semper erat lobortis at. Suspendisse finibus.',
  'Vestibulum ut porta urna, a ultrices orci. Donec at sapien maximus, blandit nisl non, pellentesque magna. Aenean interdum varius libero, sed tempor lacus consectetur aliquet.',
  'Ut hendrerit nisi eget magna ornare, at varius ipsum varius. Mauris fermentum nisi nec turpis euismod vulputate. Ut sit amet sodales urna, posuere vulputate est. Etiam iaculis elementum malesuada.',
];

export default function Caption(props) {
  const { posNumber } = props;
  return (
    <div style={style}>
      <p>{posNumber < captions.length ? captions[posNumber] : 'ruh roh'}</p>
    </div>
  );
}

Caption.propTypes = {
  posNumber: PropTypes.number.isRequired,
};
