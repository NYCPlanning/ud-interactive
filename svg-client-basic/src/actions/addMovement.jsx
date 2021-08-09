const addMovement = (movement, dur) => {
  return {
    type: 'ADDMOVEMENT',
    payload: {
      newMovement: movement,
      newMovementDur: dur,
    },
  };
};

export default addMovement;
