const addAnimation = (animation) => {
  return {
    type: 'ADDANIM',
    payload: {
      animation,
    },
  };
};

export default addAnimation;
