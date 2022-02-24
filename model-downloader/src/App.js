import MapPanel from './MapPanel';
import { downloadModel } from './state';

function App() {    
    return (
        <div className="App">
	    <div className="controls">
		<h1>NYC 3D Model Download</h1>
		<p>
		    Draw an area of interest on the map and choose an option below:
		</p>
		<button onClick={() => downloadModel('rhino')}>
		    Download Rhino (.3dm)
		</button>
		<button onClick={() => downloadModel('collada')}>
		    Download COLLADA (.dae)
		</button>
		<button disabled>View</button>
	    </div>
	    <MapPanel />
	</div>
    );
}

export default App;
