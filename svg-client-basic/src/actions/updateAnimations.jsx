export default function saveAnimationStart(time, position) {
  return {
    type: 'SAVEANIM',
    payload: {
      time,
      position,
    },
  };
}
