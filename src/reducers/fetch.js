export default function fetch(state={fetching: false,
fetched: false,
data: [],
error: null},action){
	
	switch(action.type){
		case 'START_FETCH_DATA' : {
			return {...state, fetching: true}
		}
		case 'RECEIVE_DATA' : {
			return {...state, fetching:false, fetched:true, data: action.payload}

		}
		case 'START_FETCH_ERROR' : {
			return {...state, fetching:false, fetched:false, error: action.payload}
		}
		default: {
			return {...state}
		}
	}
}