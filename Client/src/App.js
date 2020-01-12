import React, { useState } from 'react'
import { connect } from 'react-redux'
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link
// } from 'react-router-dom'

import FlatDesign from './Components/FlatDesign'
import FileUpload from './Components/FileUpload'
import Profile from './Components/Profile'
import {
    moreData,
    doneUpload,
    allDoneUpload,
    onChange,
    startUpload,
    pauseUpload,
    resumeUpload,
    toggleExpand,
} from './Actions'

const App = ({ store }) => {

	// const [state, setState] = useState(store.getState());

	return (
		<div className="App">
			<div className='container' style={{padding: 0}}>
				<FileUpload />
			</div>
			<FlatDesign />
			<Profile />
		</div>
	);
}

function mapStateToProps() {
	return {
		filesList: [],
		uploadState: 'Waiting',
		uploadPercentage: 0,
		uploadSize: 0,
		isCollapsed: false,
		bufferSize: 524288, // 524288b === 64 KB of data per request
	}
}

function mapDispatchToProps(dispatch) {
	return {
		moreData: (data) => dispatch(moreData(data)),
		doneUpload: (data) => dispatch(doneUpload(data)),
    	allDoneUpload: (data) => dispatch(allDoneUpload(data)),
    	onChange: (data) => dispatch(onChange(data)),
    	startUpload: (data) => dispatch(startUpload(data)),
    	pauseUpload: (data) => dispatch(pauseUpload(data)),
    	resumeUpload: (data) => dispatch(resumeUpload(data)),
    	toggleExpand: (data) => dispatch(toggleExpand(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
