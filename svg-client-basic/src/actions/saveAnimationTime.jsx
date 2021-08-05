const saveAnimationTime = (time) => {
  // console.log(`animation time saved! ${time}`);
  return {
    type: 'SAVEANIMATIONTIME',
    payload: {
      time,
    },
  };
};

export default saveAnimationTime;
