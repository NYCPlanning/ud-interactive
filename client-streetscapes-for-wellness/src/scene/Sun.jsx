import React, { useRef, useEffect, useState } from 'react';
// import { useSnapshot } from 'valtio';

// import { state } from '../state';

const Sun = () => {
  // const { sunPosition: pos } = useSnapshot(state);
  // const lightRef = useRef(null)
  // const [helperCamera, setHelperCamera] = useState(null)

  // useEffect(() => {
  //   if (lightRef.current) setHelperCamera(lightRef.current.shadow.camera)
  // }, [lightRef])

  return (
    <>
      {/* {helperCamera && <cameraHelper args={helperCamera} /> } */}
      <spotLight
        position={[0, 100, 30]}
        intensity={1.5} 
        castShadow
        shadow-mapSize-height={1028}
        shadow-mapSize-width={1028}
        shadow-camera-near={100}
        shadow-camera-far={200}
        shadow-camera-top={50}
        shadow-radius={1}
        color={0xfffaeb}
      />
    </>
  )
}

export default Sun;
