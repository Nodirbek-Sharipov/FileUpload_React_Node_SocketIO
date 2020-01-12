import {
    MORE_DATA,
    DONE_UPLOAD,
    ALL_DONE_UPLOAD,
    ON_CHANGE,
    START_UPLOAD,
    PAUSE_UPLOAD,
    RESUME_UPLOAD,
    TOGGLE_EXPAND,
} from '../Actions'

const initialState = {
    filesList: [],
    uploadState: 'Waiting',
    uploadPercentage: 0,
    uploadSize: 0,
    isCollapsed: false,
    bufferSize: 524288, // 524288b === 64 KB of data per request
}

function UploaderReducer(state = initialState, action){
    const {
        type,
        filesList,
        uploadState,
        uploadPercentage,
        uploadSize,
        isCollapsed,
    } = action

    switch(type){
        case MORE_DATA:
            return{
                ...state,
				filesList,
                uploadState,
                uploadPercentage,
            }
        case DONE_UPLOAD:
            return{
                ...state,
				filesList,
			}
        case ALL_DONE_UPLOAD:
            return{
                ...state,
				uploadState,
				uploadPercentage,
            }
        case ON_CHANGE:
            return{
				...state,
				filesList,
				uploadSize,
			}
        case START_UPLOAD:
            return{
				...state,
				isCollapsed,
			}
        case PAUSE_UPLOAD:
            return{
				...state,
				uploadState,
			}
        case RESUME_UPLOAD:
            return{
				...state,
				uploadState,
			}
        case TOGGLE_EXPAND:
            return{
				...state,
				isCollapsed,
			}
        default:
            return state
    }
}

export default UploaderReducer;