import axios from 'axios';

export function fetchData(){
	return function(dispatch){
		dispatch({type:'START_FETCH_DATA'})
		axios.get('http://starlord.hackerearth.com/kickstarter')
		.then(res => {
			dispatch({type:'RECEIVE_DATA', payload: res.data})
		})
		.catch(err => {
			dispatch({type:'START_FETCH_ERROR', payload: err})
		})
	}
}