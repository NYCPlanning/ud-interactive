import * as THREE from 'three';
import earcut from 'earcut';
import _ from 'lodash';
var xml2js = require('xml2js');

export default class X3DLoader extends THREE.Loader {
  load( xmlString, onLoad ) {
    // container for geometry to be build up from xml contents
    let geom = new THREE.Geometry();

    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true
    });

    parser.parseStringPromise(xmlString)
    .then((result) => {

      const { 
        IndexedFaceSet: { 
          Coordinate: { 
            point: vertices 
          }, 
          coordIndex: faceIndices 
        }
      } = result;

      // populate container geometry vertices
      let re = /(([\d.-]+)\s([\d.-]+)\s([\d.-]+))/gu;
      vertices.match(re)
        .forEach((s) => {
          const [x, y, z] = s.split(' ').map( Number );
          geom.vertices.push(new THREE.Vector3( x, y, z ));
        })

      // build container geometry faces from vertices
      re = /([\d\s]+)(-1|$)/gu
      faceIndices.match(re)
        .map((s) => ( s.trim().split(' ').map( Number ).filter((i) => i !== -1) ))
        .forEach((f) => {
          // if vertex count is 3
          if (f.length === 3) {
            geom.faces.push( new THREE.Face3( f[0], f[1], f[2] ))
          }
          // if vertex count is 4
          else if (f.length === 4) {
            geom.faces.push( new THREE.Face3( f[0], f[1], f[2] ))
            geom.faces.push( new THREE.Face3( f[2], f[3], f[0] ))
          } 
          // otherwise attempt to triangulate from the list of vertices and merge
          else {
            let triangulatedSurface = new THREE.Geometry();
            
            f.forEach((v) => { triangulatedSurface.vertices.push(geom.vertices[v]) });
            let vertsToTriangulate = triangulatedSurface.vertices.map((v) => ([v.x, v.y, v.z])).flat();
            let triangulatedIndices = earcut(vertsToTriangulate, null, 3);
            _.chunk(triangulatedIndices, 3).forEach((i) => {
              triangulatedSurface.faces.push( new THREE.Face3( i[0], i[1], i[2] ))
            })

            geom.merge(triangulatedSurface);
          }
        })

      geom.mergeVertices();
      geom.computeFaceNormals();
      geom.computeBoundingBox();

      onLoad(geom);
    })
    .catch((err) => {
      console.log(err)
    });
  }
}
