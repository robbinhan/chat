var socket = io('http://localhost:8080');

Vue.config.debug = true // 开启调试模式


/**
 * @todo 联系人列表 done
 * @todo  发送私信 done
 * @todo 上线下线提醒 delay
 * @todo 输入时添加命令支持，关联用户个人的流程单
 * @todo  arvater
 */

var vm = new Vue({ 
	el: '#im',
	data: {
		username: '匿名',//用户昵称
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
			
			// this.messages.push(message);
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

	ready: function() {

      	// GET request
		this.$http.get('/user', function (data, status, request) {
		  // set data on vm
		  this.$set('userList', data)
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