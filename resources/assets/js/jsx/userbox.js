var User = React.createClass({
  render: function() {
    return (
      <a className="list-group-item">{this.props.name}</a>
    );
  }
});

var UserList = React.createClass({
  render: function() {
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
});

var UserBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var that = this;
    fetch(that.props.url)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      that.setState({data: json});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  },
  render: function() {
    return (
      <div className="userBox">
        <h1>用户列表</h1>
        <UserList data={this.state.data} />
      </div>
    );
  }
});

module.exports = UserBox;