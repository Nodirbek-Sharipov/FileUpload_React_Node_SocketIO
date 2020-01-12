import React, { useReducer, useEffect } from 'react'
import io from 'socket.io-client'
import { Button } from './FlatComponents'
import { moreData, doneUpload, allDoneUpload, onChange, startUpload, pauseUpload, resumeUpload, toggleExpand } from '../Actions'
import UploaderReducer from '../Reducers/index'
const	Waiting = 'Waiting',
		Paused = 'Paused',
		Uploading = 'Uploading',
		// Cancelled = 'Cancelled',
		Uploaded = 'Uploaded';

const FileUpload = props =>{

	const [ state, dispatch ] = useReducer(UploaderReducer, {
		filesList: [],
		uploadState: 'Waiting',
		uploadPercentage: 0,
		uploadSize: 0,
		isCollapsed: true,
		bufferSize: 524288, // 524288b === 64 KB of data per request
	})

	const socket = io.connect('http://127.0.0.1:8080')
	const FReader = new FileReader();
	const getCurrentFile = () => state.filesList.filter(file => !file.done)[0];

	const onchange = () => {
		let files = [...document.querySelector('.fileSelectInput').files]

		files.forEach(file => Object.assign(file, {
			uploadState: Waiting,
			uploadPercentage: 0,
			done: false,
		}))

		dispatch(onChange({
			filesList: files,
			uploadSize: files.reduce((a, x)=> a+x.size, 0),
		}))
	}

	const sizeCalc = size => {
		if (size < 1024) { // Bytes
			return Math.round(size*100)/100 + " B"
		}else if( (size >= 1024) && (size/1024 < 1024)){ // KiloBytes
			return Math.round( (size/1024)*100 )/100 + " KB"
		}else if( (size/1024 >= 1024) && (size/(1024*1024)) < 1024 ){ // MegaBytes
			return Math.round( (size/(1024*1024))*100 )/100 + " MB"
		}else if( ((size/(1024*1024)) >= 1024) && (size/(1024*1024*1024)) < 1024 ){ // GigaBytes
			return Math.round( (size/(1024*1024*1024))*100 )/100 +" GB"
		}
	}

	const StartUpload = () => {
		document.querySelector('.totalProgress').style.display = 'block';
		document.querySelector('.uploadBtn').style.display = 'none';
		document.querySelector('.selectFilesBtn').style.display = 'none';

		dispatch(startUpload({
			isCollapsed: false,
		}))
		//document.querySelector('.filesListUl').style.display = 'none';
		UploadFile();
	}

	const PauseResumeUpload = () => {

		const { bufferSize } = state;
		const { name, size } = getCurrentFile();

		if(state.uploadState === Paused){

			socket.emit('StartUpload', { 'Name' : name, 'Size' : size, 'BufferSize': bufferSize})
			FReader.onload = function(event){
				socket.emit('Upload', { 'Name' : name, Data : event.target.result, BufferSize: bufferSize });
			}
			// Resume the upload
			dispatch(resumeUpload({
				uploadState: Uploading,
			}))

		}else{
			// Pause the upload
			socket.emit('Pause', {});

			dispatch(pauseUpload({
				uploadState: Paused,
			}))

		}
	}

	const CancelUpload = () => {
		// nothingness for now 😐

	}

	const CollapsToggle = ()=>{
		const ulElement = document.querySelector('.filesListUl')
		if(state.isCollapsed){
			dispatch(toggleExpand({
				isCollapsed: false,
			}))

			ulElement.style.display = 'block'
		}else{
			dispatch(toggleExpand({
				isCollapsed: true,
			}))
			ulElement.style.display = 'none'
		}
	}

	const UploadFile = ({name, size} = getCurrentFile()) =>{
			const { bufferSize } = state;
			FReader.onload = function(event){
				socket.emit('Upload', { 'Name' : name, Data : event.target.result, BufferSize: bufferSize });
			}
			socket.emit('StartUpload', { 'Name' : name, 'Size' : size, 'BufferSize': bufferSize});
	}

	socket.on('MoreData', ({ Percent, Place })=>{

		let { uploadSize, bufferSize, filesList } = state
		const totalPercent = filesList.reduce((acc, x)=> ({...acc, u: (acc.u + (x.uploadPercentage * x.size)/100)}), {u: 0, p(){ return Math.floor(((this.u/uploadSize)*10000))/100 }}).p()
		const { name } = getCurrentFile()

		dispatch(moreData({
			filesList : filesList.map(x => x.name === name ? Object.assign(x, { uploadState: Uploading, uploadPercentage: Percent, done: false }) : x) || [],
			uploadState: Uploading,
			uploadPercentage: totalPercent,
		}))

		let place = Place * bufferSize
		let NewFile
		let file = getCurrentFile()
		if(file.webkitSlice){
			NewFile = file.webkitSlice(place, place + Math.min(bufferSize, (file.size-place)))
		}else if(file.mozSlice){
			NewFile = file.mozSlice(place, place + Math.min(bufferSize, (file.size-place)))
		}else{
			NewFile = file.slice(place, place + Math.min(bufferSize, (file.size-place)))
		}
		FReader.readAsBinaryString(NewFile);
	});

	socket.on('DoneUpload', ({Name, Percent})=>{
		const { filesList } = state
		dispatch(doneUpload({
			filesList: filesList.map(file => file.name === Name ? Object.assign(file, {done: true, uploadState: Uploaded, uploadPercentage: Percent}) : file),
			name: Name,
		}))

		if(getCurrentFile()){
			UploadFile()
		}else{
			dispatch(allDoneUpload({
				uploadState: Uploaded,
				uploadPercentage: 100,
			}))
		}
	});
	// ====================SOCKET.IO SETUP===================

	useEffect(() => {
		//effect
		console.log('Component mounted')

		return () => {
			// cleanup
			console.log('Component unmounted')
		};

	}, [state])


	const { style } = props;

	return (
		<div style={{...css.cardContainer, ...style}}>
			<Button
				className='selectFilesBtn'
				style={{
					height: '30px',
					fontSize: '12px',
					boxShadow: 'rgba(255, 47, 87, 0.4) 0px 10px 20px 1px',
					fontFamily: '"Segoe UI", Arial, sans-serif',
					letterSpacing: '1px',
					fontWeight: '600',
					width: '120px',}}
				onClick={
					()=>{
						document.querySelector('.fileSelectInput').click()
					}}>{state.filesList.length === 0 ? 'Select files' : 'Reselect files'} </Button>

			<input type='file' className='fileSelectInput hide' onChange={onchange} multiple/>
			<div className='row totalProgress' style={{display: 'none', marginTop: '20px'}}>
				<div className='col l8 m8 s12' style={css.TotalStatus}>
					{ state.uploadPercentage }% | { state.uploadState } { state.filesList.length } files...
					<div style={css.status}>{ sizeCalc((state.uploadPercentage * state.uploadSize)/100) } / { sizeCalc(state.uploadSize) }</div>
					<div style={css.loadingTrack}>
						<div style={{...css.loadingThumb, width: state.uploadPercentage+'%'}}></div>
					</div>
				</div>
				<div className='col l4 m4 s12' style={{textAlign: 'center'}}>
					<ul onSelectCapture={ e => e.preventDefault() }>
						<button
							style={css.uloadBtns}
							onClick={CollapsToggle}>
							<i className='material-icons' style={state.isCollapsed ? {transform: 'rotate(180deg)', transition: '0.3s'} : {transition: '0.3s'}}>keyboard_arrow_up</i>
						</button>
						<button style={css.uloadBtns} onClick={PauseResumeUpload}><i className='material-icons'>{state.uploadState === Paused ? 'play_arrow' : 'pause'}</i></button>
						<button style={css.uloadBtns}><i className='material-icons'>close</i></button>
					</ul>
				</div>
			</div>
			<ul className='filesListUl' style={state.filesList.length === 0 ? {display: 'none'} : {}}>
				{ state.filesList.map(file => {
					return (
						<li key={file.name} className='row' style={{...css.li, padding: 0}}>
							<div className='col l8 m8 s8'>{file.name}</div>
							<div className='col l4 m4 s4'>{sizeCalc(file.size)}</div>
							<div className='col l8 m8 s8' style={css.status}>
								<div style={css.loadingTrack}>
									<div style={{...css.loadingThumb, width: file.uploadPercentage+'%'}}></div>
								</div>
							</div>
							<div className='col l4 m4 s4' style={css.status}>{file.uploadPercentage}% {file.uploadState}</div>
						</li>
					)
				}) }
			</ul>
			<Button className='uploadBtn' style={state.filesList.length === 0 ? {width: '100%', display: 'none'} : {width: '100%'}} onClick={StartUpload} >Start uploading</Button>
		</div>
	)

}

const css = {
	cardContainer: {
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '1px',
		fontWeight: '300',
		width: '100%',
		background: 'linear-gradient(45deg, rgb(24, 27, 44), rgb(59, 64, 86))',
		borderRadius: '5px',
		boxShadow: '-10px 10px 15px 1px rgba(0, 0, 0, 0.4)',
		padding: '15px 30px',
		margin: '10px 0',
		color: '#fff',
	},
	li: {
		margin: '0',
		fontSize: '12px',
		fontWeight: '500',
		padding: '5px 0',
	},
	status: {
		fontSize: '10px',
		color: 'rgba(255,255,255,0.4)',
	},
	TotalStatus: {
		fontSize: '15px',
		color: '#fff',
		fontWeight: '500',
	},
	loadingTrack: {
		background: 'rgba(255,255,255,0.4)',
		borderRadius: '10px',
		height: '5px',
		width: '100%',
		marginTop: '5px',
	},
	loadingThumb: {
		height: 'inherit',
		width: '50%',
		borderRadius: 'inherit',
		background: 'linear-gradient(45deg, rgb(255, 47, 87), rgb(255, 125, 134))',
		boxShadow: '0 10px 20px 1px rgba(255, 47, 87, 0.4)',
	},
	uloadBtns: {
		border: 'none',
		color: '#fff',
		background: 'rgba(255,255,255,0.1)',
		display: 'inline-block',
		marginRight: '8px',
		borderRadius: '50%',
		padding: '5px 5px 2px 5px',
		cursor: 'pointer',
	},
}

export default FileUpload;