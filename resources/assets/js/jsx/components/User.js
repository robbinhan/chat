import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <a className="list-group-item" onClick={this.props.onActive}>{this.props.name}</a>
    );
  }
}