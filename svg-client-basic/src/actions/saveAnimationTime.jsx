/* eslint-disable  */

const saveAnimationTime = (time) => {
  // console.log('action called! ' + time);
  return {
    type: 'SAVEANIMATIONTIME',
    payload: {
      time: time,
    },
  };
};

export default saveAnimationTime;
