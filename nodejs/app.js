var io = require('socket.io')(8080);

io.on('connection', function (socket) {

  console.log('a user connected',socket.id);
  //监听message事件
  socket.on('message', function (data) {
    //存储消息
    data.datetime = getDateTime();
    //解析消息如果带#ht
    if (data.ticketId) {
      data.ticketInfo = {
        name: '合同1',
        date: '2015-09-04',
        desc: '瞎签的'
      }
    }
      
    //分发给其他客户端
    io.emit('message', data);
  });


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}