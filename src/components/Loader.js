import React from 'react';

class Loader extends React.Component{
	render(){
		return(<div className="loading">
				  <div className="loading-bar"></div>
				  <div className="loading-bar"></div>
				  <div className="loading-bar"></div>
				  <div className="loading-bar"></div>
				</div>)
	}
}

export default Loader;