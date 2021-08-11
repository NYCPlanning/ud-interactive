function convertCameras(cameras) {
  const camPositions = [];
  let currentCameraPosition = null;
  let currentCamera = null;
  for (let i = 0; i < cameras.length; i += 1) {
    currentCamera = cameras[i];
    currentCameraPosition = {
      x: currentCamera.parent.position.x,
      y: currentCamera.parent.position.y,
      z: currentCamera.parent.position.z,
      rotate: {
        // eslint-disable-next-line no-underscore-dangle
        x: currentCamera.rotation._x,
        // eslint-disable-next-line no-underscore-dangle
        y: currentCamera.rotation._y,
        // eslint-disable-next-line no-underscore-dangle
        z: currentCamera.rotation._z,
      },
      fov: currentCamera.fov,
      near: currentCamera.near,
      far: currentCamera.far,
    };
    camPositions.push(currentCameraPosition);
  }
  return camPositions;
}

export default function savePositions(cameras) {
  console.log(JSON.stringify(convertCameras(cameras)));
  return {
    type: 'SAVE_POSITIONS',
    payload: {
      camPositions: convertCameras(cameras),
    },
  };
}
