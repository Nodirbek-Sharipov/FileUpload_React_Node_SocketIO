import React, { Component } from "react"
// import FlatDesign from './Components/FlatDesign'
// import Profile from './Components/Profile'
import FileUpload from './Components/FileUpload'
import {
	BrowserRouter as Router,
	// Route,
	// Link
} from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div className='container' style={{padding: 0}}>
						<FileUpload />
					</div>
					{/* <FlatDesign /> */}
				</Router>
			</div>
		);
	}
}

export default App;
