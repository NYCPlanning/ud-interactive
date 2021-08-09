export default function updateAnimations(time) {
  console.log(time);
  return {
    type: 'UPDATE_ANIMATIONS',
    payload: {
      time,
    },
  };
}
