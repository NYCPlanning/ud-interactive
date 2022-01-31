//import logo from './logo.svg';
//import './App.css';
import MapPanel from './MapPanel';
import state, { downloadModel } from './state';

function App() {    
    return (
        <div className="App">
	    <h1>NYC 3D Model Downloader</h1>
	    <p>Draw an area of interest on the map below then choose either Download or View.</p>
            <button onClick={downloadModel}>Download Rhino .3dm</button>
	    <button>View</button>
	    <MapPanel />
	</div>
    );
}

export default App;
