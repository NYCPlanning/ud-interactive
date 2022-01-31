import React, { useRef, useState, useEffect } from 'react';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import {WKT} from 'ol/format';
import {Draw} from 'ol/interaction';
import 'ol/ol.css';
import proj4 from 'proj4';

import state from './state';

proj4.defs(
  'EPSG:2263',
  '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs');
register(proj4);

export default () => {
  //const setSiteBounds = useStore(state => state.setSiteBounds)
  const setSiteBounds = (wkt) => {
      state.boundary = wkt;
      console.log(wkt);
  };
    
  const [map, setMap] = useState(null)
  const [vectorSource, setVectorSource] = useState(null)
  const mapTarget = useRef()

  const rasterLayer = new TileLayer({source: new Stamen({layer: 'toner'})});
  let source = new VectorSource({wrapX: false});
  let vectorLayer = new VectorLayer({source: source});
  let draw; // global so we can remove it later
  const format = new WKT(); // formatter to make wkt strings

  const addInteraction = (m) => {
    var value = 'Polygon';

    if (value !== 'None') {
      draw = new Draw({
        source: source,
        type: value
      });
      
      draw.on('drawend', function(e) {
        const feature = e.feature.clone();
        let featureGeom = feature.getGeometry();
        featureGeom.transform('EPSG:3857', 'EPSG:2263');
        const wktText = format.writeFeature(feature);
        setSiteBounds(wktText)
      });

      m.addInteraction(draw);
    }
  }

  // create map on load
  useEffect(() => {
    let mapObj = new Map({
      target: mapTarget.current,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: fromLonLat([-74.010476, 40.708245]),
        zoom: 16
      })
    })
    setMap(mapObj)
    addInteraction(mapObj)
  }, [])

  return (
    <div className='mb-4 h-full'>
      <div className='w-full h-full square relative z-0'>
        <div className='absolute top-0 bottom-0 left-0 right-0 behind' 
          ref={mapTarget}
        />
      </div>
    </div>
  )
}
