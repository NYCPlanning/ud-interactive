import React, {useState, useEffect} from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const FromGLTF = ({url, ...props}) => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load('streetlamp.glb', setModel)
  }, [setModel])

  return model ? <primitive {...props} object={model.scene} /> : null
}

// TODO: load model from server:
// url={'http://127.0.0.1:9000/blocks/streetlamp.glb?Content-Disposition=attachment%3B%20filename%3D%22streetlamp.glb%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20210520%2F%2Fs3%2Faws4_request&X-Amz-Date=20210520T185711Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=6e1d0c79f986bd65c5f0f6ec70f6ed14f62dd1a1bd7ecce10432997330db7944'}

  // if (data == undefined) return null

  // const loader = new BufferGeometryLoader()
  // const geom = loader.parse(data)
  // const material = new MeshStandardMaterial({ 
  //   color: color,
  //   // wireframe: true,
  // })

  // const [model, setModel] = useState(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.arrayBuffer())
  //     .then((buffer) => {
  //       console.log(buffer)
  //       const gltf = loader.parse({data: buffer, onLoad: setModel})
  //       console.log(gltf)
  //       // console.log(gltf)
  //     })
  // }, [model])

  // const { nodes, materials } = useGLTF('streetlamp.glb')

  export default FromGLTF
