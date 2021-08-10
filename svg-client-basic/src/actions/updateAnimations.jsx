export default function updateAnimations(time, currentPosition) {
  return {
    type: 'UPDATE_ANIMATIONS',
    payload: {
      time,
      currentPosition,
    },
  };
}
