import { Component } from 'react';

class User extends Component {
  render() {
    return (
      <a className="list-group-item">{this.props.name}</a>
    );
  }
}

class UserList extends Component {
  render() {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User name={user.name} />
      );
    });
    return (
      <div className="userList">
        {userNodes}
      </div>
    );
  }
}

class UserBox extends Component {

  componentDidMount() {
    console.log("props",this.props)
    var that = this;
    fetch(that.props.url)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      that.setState({data: json});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    console.log("render props",this.props)
    return (
      <div className="userBox">
        <h1>用户列表</h1>
        // <UserList data={this.state.data} />
      </div>
    );
  }
}

export default UserBox;