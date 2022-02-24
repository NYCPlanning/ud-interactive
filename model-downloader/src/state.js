import { proxy } from 'valtio'
import axios from 'axios'

const serverUrl = process.env.REACT_APP_UDTOOLS_SERVER_URL
const endpoint = `${serverUrl}/model`

const state = proxy({
    boundary: null,
})

export const downloadModel = (format) => {
    const formats = {
	'rhino': {
	    'ext': '3dm',
	    'mime': 'model/3dm;base64'
	},
	'collada': {
	    'ext': 'dae',
	    'mime': 'application/collada+xml'
	}
    };
    const requestUrl = `${endpoint}?format=${format}`;
    const body = {
        bounds: `SRID=2263;${state.boundary}`,
        exclude: '',
	flatten: 'false',
    };
    axios.post(requestUrl, body).then((response) => {
	let { data: { data }} = response
	if (format === 'collada') data = escape(data);
	const fileBody = `data:${formats[format].mime},${data}`;
	const link = document.createElement('a');
	link.href = fileBody;
	link.download = `${+new Date()}.${formats[format].ext}`;
	link.click();
    })
    return null
}

export default state
