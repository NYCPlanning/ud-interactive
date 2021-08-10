export default function logTime(elapsedTime, position) {
  return {
    type: 'LOG',
    payload: {
      elapsedTime,
      position,
    },
  };
}
