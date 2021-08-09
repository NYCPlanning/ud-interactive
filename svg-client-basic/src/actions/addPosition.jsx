const addPosition = (position, duration) => {
  return {
    type: 'ADDMOVEMENT',
    payload: {
      position,
      duration,
    },
  };
};

export default addPosition;
