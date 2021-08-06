export default function logTime(elapsedTime) {
  return {
    type: 'LOG',
    payload: {
      elapsedTime,
    },
  };
}
