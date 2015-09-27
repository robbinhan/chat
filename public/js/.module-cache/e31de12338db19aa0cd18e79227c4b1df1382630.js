var UserBox = require('./userbox.js');
console.log(UserBox);

React.render(
  React.createElement(UserBox, {url: "/users"}),
  document.getElementById('im')
);