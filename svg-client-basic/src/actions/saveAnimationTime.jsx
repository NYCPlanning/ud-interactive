const saveAnimationTime = (time) => {
  return {
    type: 'SAVETIME',
    payload: {
      time,
    },
  };
};

export default saveAnimationTime;
