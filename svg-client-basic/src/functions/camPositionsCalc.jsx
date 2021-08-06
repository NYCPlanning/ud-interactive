import * as THREE from 'three';

const modelMode = 2;
const rhinoStuff = [
  {
    viewName: 'commercial elevated',
    lensLength: 30,
    x: 1089.69,
    y: 4242.88,
    z: 1003.49,
    lookAt: {
      x: 1240.5,
      y: 3298.8,
      z: 70.06,
    },
  },
  {
    viewName: 'residential view',
    lensLength: 44.73,
    x: 440.49,
    y: 5970.23,
    z: 4105.55,
    lookAt: {
      x: 666.25,
      y: 2370.21,
      z: 4105.55,
    },
  },
  {
    viewName: 'park',
    lensLength: 30,
    x: 2892.82,
    y: 691.15,
    z: 8.68,
    lookAt: {
      x: 2893.02,
      y: 631.28,
      z: 7.58,
    },
  },
  {
    viewName: 'industrial',
    lensLength: 23.16,
    x: 1165.08,
    y: 2741.85,
    z: 582,
    lookAt: {
      x: 1271.96,
      y: 4011.97,
      z: 582,
    },
  },
];
function getFOV(lensLength) {
  return THREE.MathUtils.lerp(73.7, 39.6, (lensLength - 23) / (50 - 23));
}
function convertToThree(position) {
  return {
    x: -position.x,
    y: position.z,
    z: position.y,
    fov: getFOV(position.lensLength),
    lookAt: {
      x: -position.lookAt.x,
      y: position.lookAt.z,
      z: position.lookAt.y,
    },
  };
}

function makeAllThree(positions) {
  const array = [];
  for (let i = 0; i < positions.length; i += 1) {
    array.push(convertToThree(positions[i]));
  }
  return array;
}

// not able to get showSample functionality up and working yet
export default function camPositionsCalc() {
  switch (modelMode) {
    case 1:
      return rhinoStuff;
    case 2:
      return makeAllThree(rhinoStuff);
    default:
      return rhinoStuff;
  }
}
