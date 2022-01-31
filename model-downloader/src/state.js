import { proxy } from 'valtio'
import axios from 'axios'

const serverUrl = process.env.REACT_APP_UDTOOLS_SERVER_URL
const endpoint = `${serverUrl}/model`

const state = proxy({
    boundary: null,
})

export const downloadModel = () => {
    const body = {
        bounds: `SRID=2263;${state.boundary}`,
        exclude: '',
	flatten: 'false',
    }
    axios.post(endpoint, body).then((response) => {
	const { data: { data }} = response
	const fileBody = `data:model/3dm;base64,${data}`;
	const link = document.createElement('a');
	link.href = fileBody;
	link.download = `${+new Date()}.3dm`;
	link.click();
    })
    return null
}

export default state
