import React, { Component } from 'react';
import User from './User';

export default class UserList extends Component {
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