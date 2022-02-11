// provides remote procedure calls through GRPC for geometry processing

const pako = require('pako')

const {
  GroundSurfaceRequest,
  GroundTextureRequest,
  ExistingBuildingRequest,
} = require('./generated/scene_pb.js')
const {MakeScenarioRequest} = require('./generated/scenario_pb.js')
const {MakeSiteRequest} = require('./generated/site_pb.js')
const {MakeZoningLotRequest} = require('./generated/zoninglot_pb.js')
const {SceneServicePromiseClient} = require('./generated/scene_grpc_web_pb.js')
const {ZoningEnvelopeServiceClient} = require('./generated/zoninglot_grpc_web_pb.js')

const serviceUrl = 'http://0.0.0.0:8088'

const zoningEnvelopeClient = new ZoningEnvelopeServiceClient(serviceUrl)
const sceneClient = new SceneServicePromiseClient(serviceUrl)

const decompress = (payload) => {
  const bytes = pako.inflate(payload)
  const str = new TextDecoder().decode(bytes)
  const obj = JSON.parse(str)
  return obj
}

const existingBuildingRequest = ({id}) => {
  const r = new ExistingBuildingRequest()
  r.setId(id)
  return r
}

const groundSurfaceRequest = ({geom}) => {
  const r = new GroundSurfaceRequest()
  r.setGeom(geom)
  return r
}

const groundTextureRequest = ({geom}) => {
  const r = new GroundTextureRequest()
  r.setGeom(geom)
  return r
}

const siteRequest = ({id, bbls}) => {
  const s = new MakeSiteRequest()
  s.setId(id)
  s.setBblsList(bbls)
  return s
}

const scenarioRequest = ({id, buildYear}) => {
  const s = new MakeScenarioRequest()
  s.setId(id)
  s.setBuildYear(buildYear)
  return s
}

const zoningLotRequest = ({id, site, scenario, zone}) => {
  const z = new MakeZoningLotRequest()
  z.setId(id)
  z.setSite(site)
  z.setScenario(scenario)
  z.setZone(zone)
  return z
}

const makeZoningEnvelope = ({zoningLot, callback}) => {
  zoningEnvelopeClient.makeZoningEnvelope(zoningLot, {}, (err, response) => {
    const geom = response.getGeom()
    const decompressed = pako.inflate(geom)
    const geomString = new TextDecoder().decode(decompressed)
    const geomObject = JSON.parse(geomString)
    callback(geomObject)
  })
}

const getZoningLot = ({request, callback}) => {
  zoningEnvelopeClient.getZoningLot(request, {}, (err, response) => {
    const geom = response.getGeom()
    const geomObject = decompress(geom)
    callback(geomObject)
  })
}

const makeGroundSurface = async ({request}) => {
  try {
    const res = await sceneClient.makeGroundSurface(request, {})
    const geom = res.getGeom()
    const geomObject = decompress(geom)
    return geomObject
  } catch (error) {
    console.log(error)
    return null
  }
}

const getGroundTexture = async ({request}) => {
  try {
    const res = await sceneClient.getGroundTexture(request, {})
    const res_b64 = res.getJpg_asB64()
    const res_img = new Image()
    const img_content = "data:image/jpeg;base64," + res_b64
    res_img.src = img_content
    return res_img
  } catch (error) {
    console.log(error)
    return null
  }
}

const getExistingBuilding = async ({request}) => {
  try {
    const res = await sceneClient.getExistingBuilding(request, {})
    const geom = res.getGeom()
    const geomObject = decompress(geom)
    return geomObject
  } catch (error) {
    console.log(error)
    return null
  }
}

export {
  existingBuildingRequest,
  getExistingBuilding,
  getGroundTexture,
  getZoningLot,
  groundSurfaceRequest,
  groundTextureRequest,
  makeGroundSurface,
  makeZoningEnvelope,
  scenarioRequest,
  siteRequest,
  zoningLotRequest,
}
