const addPosition = (position, duration) => {
  return {
    type: 'ADDPOSITION',
    payload: {
      position,
      duration,
    },
  };
};

export default addPosition;
