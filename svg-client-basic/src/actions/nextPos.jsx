import Animation from '../classes/Animation';
import camPositionsCalc from '../functions/camPositionsCalc';

const camPositions = camPositionsCalc();

const nextPos = (step) => {
  return {
    type: 'ADDMOVEMENT',
    payload: {
      dur: 2,
      newMovement: Animation.calcMovement(camPositions[step], camPositions[step + 1]),
      stepNum: 1,
    },
  };
};

export default nextPos;
