var User = React.createClass({
  render: function() {
    return (
      <a className="list-group-item">{this.props.name}</a>
    );
  }
});

var MessageList = React.createClass({
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

var ContentBox = React.createClass({
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
      <div className="contentBox">
        <h1>消息列表</h1>
        <MessageList data={this.state.data} />
      </div>
    );
  }
});

module.exports = ContentBox;