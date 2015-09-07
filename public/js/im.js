var socket = io('http://localhost:8080');

Vue.config.debug = true // 开启调试模式

var vm = new Vue({ 
	el: '#im',
	data: {
		username: 'h5k87VhUoR',//用户昵称
		postMessage: '',//输入框内容
	    messages: [],//展示的消息列表
	    userList: [],//联系人列表
	    privateUser: '',//私聊对象
	    atUserUlHidden:true,//是否隐藏@功能的用户列表
	    atuser:'',//@功能的filterby
	    atUserTicketHidden:true,
	    atticket:'',
	    userTickets:[]//用户关联的数据信息
	},
	methods: {
		sendMessage: function (e) {
			e.preventDefault();

			if (this.postMessage === '' || this.atUserUlHidden === false) {
				return false;
			};

			//将数据赋值到对象
			var message = {user:this.username,content:this.postMessage,ticketId:1};

			//清空postMessage
			this.postMessage = '';
			
			//请求服务端分发消息
			socket.emit('message', message);
		},
		/**
		 * 发私信
		 * @param  {[type]} user [发送的user对象]
		 * @return {[type]}      [description]
		 */
		sendPrivateMessage: function  (user) {
			this.postMessage = '@'+user.real_name+" ";
			this.atUserUlHidden = true;
			document.getElementById("postMessage").focus();
		},
		sendMessagebByTicket:function  (ticket) {
			console.log(ticket)
			this.postMessage = '#ht'+ticket.name+" ";
			this.atUserTicketHidden = true;
			document.getElementById("postMessage").focus();
		}
	},

	/**
	 * 初始化数据
	 * @return {[type]} [description]
	 */
	ready: function() {
      	// GET request
		this.$http.get('/users', function (data, status, request) {
			// set data on vm
			var userList = [];
			data.forEach(function(user){
				userList.push({real_name:user.real_name, status:0});
			});
			this.$set('userList', userList)
			console.log(userList)
			//随机选取username
			var rand = parseInt(Math.random()*10);
			this.username = this.userList[rand].real_name;
			//请求服务端发送上线通知
			socket.emit('online', {user:this.username});
		}).error(function (data, status, request) {
		  // handle error
		})

		// GET request
		this.$http.get('/user/tickets', function (data, status, request) {
		  // set data on vm
		  this.$set('userTickets', data)
		}).error(function (data, status, request) {
		  // handle error
		})

		// GET request
		this.$http.get('/messages', function (data, status, request) {
		  // set data on vm
		  var messages = [];
		  data.forEach(function (message) {
		  	messages.push({user:message.username,content:message.content});
		  })
		  this.$set('messages', messages)
		}).error(function (data, status, request) {
		  // handle error
		})
    }
});


vm.$watch('postMessage', function (newVal, oldVal) {
	//监听输入框，出现@符号显示联系人列表，直到出现空格，回车或输入框为空，列表隐藏
	if (newVal === ''|| newVal.indexOf(" ") != -1) {
		vm.atUserUlHidden = true;
		return true;
	};
	if (newVal.substring(0,1)==="@") {
		vm.atUserUlHidden = false;
		vm.atuser = newVal.substring(1);
	} else if (newVal.substring(0,3)==="#ht"){
		console.log(vm.userTickets);
		vm.atUserTicketHidden = false;
		vm.atticket = newVal.substring(4);
	}
})


//监听服务端，如果有推送消息，将消息放入messages
socket.on('message', function(msg){
	console.log(msg);
	//渲染显示消息内容在content里
  	vm.messages.push(msg);
});

//用户上线的通知
socket.on('online', function(msg){
	console.log('online',msg);
	vm.userList.forEach(function(user,index){
		if (user.real_name==msg.user) {
			vm.userList[index].status = 1;
		};
	})
	//渲染显示消息内容在content里
  	// vm.messages.push(msg);
});