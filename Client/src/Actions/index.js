// action type enumerations 👇👇👇
export const MORE_DATA          = "MORE_DATA"
export const DONE_UPLOAD        = "DONE_UPLOAD"
export const ALL_DONE_UPLOAD    = "ALL_DONE_UPLOAD"
export const ON_CHANGE          = "ON_CHANGE"
export const START_UPLOAD       = "START_UPLOAD"
export const PAUSE_UPLOAD       = "PAUSE_UPLOAD"
export const RESUME_UPLOAD      = "RESUME_UPLOAD"
export const TOGGLE_EXPAND      = "TOGGLE_EXPAND"

// actions 👇👇👇
export const moreData = ({filesList, uploadState, uploadPercentage})=>({
	type: MORE_DATA,
	filesList,
	uploadState,
	uploadPercentage,
})

export const doneUpload = ({filesList, name})=>({
	type: DONE_UPLOAD,
	filesList,
	name,
})

export const allDoneUpload = ({uploadState, uploadPercentage})=>({
	type: ALL_DONE_UPLOAD,
	uploadState,
	uploadPercentage,
})

export const onChange = ({filesList, uploadSize})=>({
	type: ON_CHANGE,
	filesList,
	uploadSize,
})

export const startUpload = ({isCollapsed})=>({
	type: START_UPLOAD,
	isCollapsed,
})

export const pauseUpload = ({uploadState})=>({
	type: PAUSE_UPLOAD,
	uploadState,
})

export const resumeUpload = ({uploadState})=>({
	type: RESUME_UPLOAD,
	uploadState,
})

export const toggleExpand = ({isCollapsed})=>({
	type: TOGGLE_EXPAND,
	isCollapsed,
})

