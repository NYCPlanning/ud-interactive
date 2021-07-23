const saveAnimationTime = (time) => {
  return {
    type: 'SAVEANIMATIONTIME',
    payload: {
      time,
    },
  };
};

export default saveAnimationTime;
