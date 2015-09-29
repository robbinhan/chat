import React, { Component,PropTypes } from 'react';
import UserList from '../components/UserList';
import { connect } from 'react-redux';
import { setVisibilityFilter,setShowActive } from '../actions/user';
import axios from 'axios';

export default class UserBox extends Component {

	constructor() {
    super();
    this.state = { data: [] }
  }

	/**
	 * render方法之后再执行此方法
	 * @return {[type]} [description]
	 */
	componentDidMount() {
    var that = this;
    axios.get(that.props.url)
    .then(function(response) {
    	console.log("rep Object",response)
    	console.log('rep data json',response.data);
      that.setState({data: response.data});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    console.log("call render once")
    console.log("state",this.state)
    return (
      <div className="userBox">
        <h1>用户列表</h1>
        <UserList data={this.state.data} />
      </div>
    );
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    url: '/users'
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    // onActive: () => dispatch(setVisibilityFilter('SHOW_ACTIVE'))
  };
}

export default connect(   // Line 20
  mapStateToProps,
  mapDispatchToProps
)(UserBox);