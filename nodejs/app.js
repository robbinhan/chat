var io = require('socket.io')(8080);
var sqlite3 = require('sqlite3').verbose();
var clients = [];

io.on('connection', function(socket) {
  var db = new sqlite3.Database('../storage/database.sqlite');
  //监听message事件
  socket.on('message', function(data) {
    //存储消息
    data.datetime = getDateTime();

    db.serialize(function() {
      var sql = "insert into messages values(null,'" + data.user + "','" + data.privateToUser + "','" + data.content + 
        "','" + data.datetime + "','" + data.datetime + "')";
      console.log("insert sql:", sql);
      db.run(sql);
    });

    //解析消息如果带#ht
    if (data.ticketId) {
      data.ticketInfo = {
        name: '合同1',
        date: '2015-09-04',
        desc: '瞎签的'
      }
    }

    //发送私聊信息
    if (data.privateToUser) {
      //自身客户端也需要响应显示
      socket.emit('message',data);

      var sendSocket = clients[data.privateToUser];
      sendSocket.emit('message', data);
    } else {
      //分发给所有其他客户端
      io.emit('message', data);
    }
  });

  socket.on('disconnect', function() {
    delete clients[socket.id];
    console.log('user disconnected');
    db.close();
  });


  //用户打开页面发送通知到服务端，有服务端转发通知其他客户端
  socket.on('online', function(data) {
    //记录所有链接的client
    clients[data.user] = socket;
    console.log('a user connected', data.user);
    //当用户连接后通知其他人
    socket.emit('online', 'me' + data.user); // Send message to sender
    socket.broadcast.emit('online', data); // Send message to everyone BUT sender
  });
});

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}