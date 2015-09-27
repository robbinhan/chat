(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var UserBox = require('./userbox.js');

React.render(
  React.createElement(UserBox, {url: "/users"}),
  document.getElementById('im')
);

},{"./userbox.js":2}],2:[function(require,module,exports){
var User = React.createClass({displayName: "User",
  render: function() {
    return (
      React.createElement("a", {className: "list-group-item"}, this.props.name)
    );
  }
});

var UserList = React.createClass({displayName: "UserList",
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        React.createElement(User, {name: user.name})
      );
    });
    return (
      React.createElement("div", {className: "userList"}, 
        userNodes
      )
    );
  }
});

var UserBox = React.createClass({displayName: "UserBox",
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
      React.createElement("div", {className: "userBox"}, 
        React.createElement("h1", null, "用户列表"), 
        React.createElement(UserList, {data: this.state.data})
      )
    );
  }
});

module.exports = UserBox;

},{}]},{},[1]);
