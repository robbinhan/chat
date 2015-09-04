<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <script>document.write('<script src="http://' + (location.host || 'localhost')
.split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
        <link rel="stylesheet" type="text/css" href="[% asset('css/app.css') %]">
        <style type="text/css">
        .dropdown-menu {
            display: block;
        }

        #form  {
            position: fixed;
            bottom: 0px;
        }

        .pane {
            max-height: 50px;
            background-color: red;

        }

        .img-rounded {
            width: 40px;
            height: 25px;
        }
        .col-xs-3,.col-md-2 {
            padding-left: 0px;
            padding-right: 0px;
        }
        </style>
    </head>
    <body id="im">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-3 col-md-2">
                <div class="list-group">
                    <a v-repeat="user in userList" class="list-group-item active"
                        v-on="click:sendPrivateMessage(user)">{{ user.real_name }}
                    </a>
                </div>
            </div>
            <div class="col-xs-9 col-md-10">
                <div id="content">
                    <div v-repeat="messages" >
                        <div class="container">
                            <div class="row">
                                <img class="img-rounded" src="[% asset('img/cowboy-icon.png') %]">{{ user }}
                            </div>
                            <div>
                                {{ content }}
                                <div class="col-md-1">
                                    <div>{{ticketInfo.name}}</div>
                                    <div >{{ticketInfo.desc}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="form">
                    <form  v-on="submit:sendMessage">
                        <div class="input-group dropup">
                            <input v-model="postMessage"  class="form-control" id="postMessage">
                            <ul class="dropdown-menu" v-class="hidden : atUserUlHidden">
                                <li v-repeat="user in userList | filterBy atuser"><a href="#" v-on="click:sendPrivateMessage(user)">{{ user.real_name }}</a></li>
                            </ul>

                            <ul class="dropdown-menu" v-class="hidden : atUserTicketHidden">
                                <li v-repeat="ticket in userTickets | filterBy atticket"><a href="#" v-on="click:sendMessagebByTicket(ticket)">{{ ticket.name }}</a></li>
                            </ul>
                            <span class="input-group-btn">
                                <input class="btn btn-success" type="submit" value="发送" >
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript" src="[% asset('js/vendor.js') %]"></script>
    <script type="text/javascript" src="[% asset('js/im.js') %]"></script>
    </body>
</html>
