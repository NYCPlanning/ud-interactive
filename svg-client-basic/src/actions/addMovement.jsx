const addMovement = (movement, duration) => {
  return {
    type: 'ADDMOVEMENT',
    payload: {
      movement,
      duration,
    },
  };
};

export default addMovement;
