import React, { Component } from 'react';
import '../css/style.css';
import Loader from './Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData} from '../actions/reduxAction';
import kickstarter from '../img/kickstarter-logo-color.png';
import kickstarter1 from '../img/kickstarter-default.png';

function GetSortOrderLow(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

function GetSortOrderHigh(prop) {  
    return function(a, b) {  
        if (a[prop] < b[prop]) {  
            return 1;  
        } else if (a[prop] > b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

const mapStateToProps = (state) => {
	return{
		fetched: state.fetch.fetching,
		data: state.fetch.data,
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		...bindActionCreators({fetchData},dispatch)
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {focus:false,currentEvent : '',sort:''}
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onValueChange = this.onValueChange.bind(this);	
		this.handleChange = this.handleChange.bind(this);

	}
	componentDidMount(){
		this.props.fetchData();
	}
	  handleChange(items) {
    this.setState({sort:items});
  }
	onValueChange(e){
   this.setState({currentEvent: e.target.value});
}
	onFocus(){
		document.getElementById('auto_complete').style.display = "block";
		this.setState({focus:true});
	}
	onBlur(){
		document.getElementById('auto_complete').style.display = "none";
		this.setState({focus:false});
	}
  render() {
  	 const value = this.state.currentEvent;
  	if(this.props.fetched){
  		return (
        <Loader />
    );
  	}
  	  if (this.state.sort === 'Percenatge Funded: Low'){
    this.props.data.sort(GetSortOrderLow("amt.pledged"));
  }

   if (this.state.sort === 'Percenatge Funded: High'){
    this.props.data.sort(GetSortOrderHigh("amt.pledged"));
  }

 if (this.state.sort === 'Old-To-New'){
    this.props.data.sort(GetSortOrderLow("end.time"));
  }

   if (this.state.sort === 'New-To-Old'){
    this.props.data.sort(GetSortOrderHigh("end.time"));
  }
  	let match= false;
  	const map_search = this.props.data.map((items,i)=>{
  		if (items.title.toLowerCase().includes(value.toLowerCase()) && this.state.focus && value!==''){
  		return(
  			<a href={'https://www.kickstarter.com'+ items.url} key={'kick_'+i} target="_blank">
  				<div className="auto_complete_content">{items.title}</div>
  			</a>
  			);
  		match = true;
  	}
  	});
  	const map_data = this.props.data.map((items,i)=>{
  		return(
  			<a href={'https://www.kickstarter.com'+ items.url} key={'kick_'+i} target="_blank">
  			<div className="outer-box" >
	        	<div className="inner-box">
	        		<img src={kickstarter1} alt="Kickstarter" />
	        		<div className="box-content">
	        			<div className="title">{items.title}</div>
	        			<div className="author">by {items.by}</div>
	        			<div className="pledged"><span className="darkcolorbold"><span className="currency">{items.currency}</span>&nbsp;{items["amt.pledged"]}</span> pledged of <span className="currency">{items.currency}</span> {(items["amt.pledged"]*105)/100} goal</div>
	        			<div className="backers">{items["num.backers"]} <span className="normalfontcolor">backers</span></div>
	        			
	        			<div className="clearfix"></div>
	        			<div className="desc">{items.blurb}</div>
	        		</div>
	        	</div>
	        </div>
	        </a>);
  	})
  	const sort = ['Percenatge Funded: Low','Percenatge Funded: High','Old-To-New','New-To-Old'];
     const cat_sort = sort.map((items,index) => {
      return (
        <li key={'sort' + index} className="items" onClick={this.handleChange.bind(this, items)} >{items}</li>
      )
    });


    return (
      <div className="main-container">
      	<header>
      		<div className="logo">
      			<a href="https://www.kickstarter.com" target="_blank"><img src={kickstarter} alt="Kickstarter" /></a>
      		</div>
      	</header>
        <div className="container">
        <div className="search-sort-container">
        <div className="search-bar">
			<input type="search" placeholder="Search" onFocus={ this.onFocus} onBlur={this.onBlur}  onChange={this.onValueChange}/>
			<div id="auto_complete" className="auto_complete">
				{map_search}
			</div>
		</div>
		<div className="sort">
            <div className="container">
              <div className="sort_text">Sort By</div>
              <div className="sort_icon"><i className="icon ion-chevron-down"></i></div>
              <div className="clearfix"></div>
            </div>
            <ul className="list">{cat_sort}</ul>
          </div>
         </div>
        	{map_data}

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


/* <div className="days"><span className="normalfontcolor">days to go : </span>{items["end.time"]}</div> */
