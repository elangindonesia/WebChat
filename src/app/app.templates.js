angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<!doctype html>\n<html  ng-app="webSMS" lang="en">\n<head>\n    <title>WebSMS</title>    \n    <!-- downloads all styles for the fonts - think customization later -->\n    <link href="//fonts.googleapis.com/css?family=Lato|Source+Sans+Pro" rel="stylesheet">  \n    <link rel="stylesheet" href="app.css">\n    <script src="./main.js"></script>\n</head>\n\n<body>\n    <div class="wrapper">\n        <authenticate></authenticate>\n    </div>\n</body>\n<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>\n<script src="./socket.io/socket.io.js"></script>\n</html>\n');
$templateCache.put('server/phone-simulator.html','<!doctype html>\n<html  ng-app="webSMS" lang="en">\n<head>\n    <title>Phone client simulator</title>  \n</head>\n\n<body>\n<h2>The client is running in the bg, view in console</h2>\n<script src="./socket.io/socket.io.js"></script>\n<script>\n// initializing socket, connection to server\nvar socket = io.connect(window.location.origin);\nvar authToken = "";\nsocket.on(\'connect\', function (data) {\n    console.log("emulator: connected to server");\n    // request token\n    socket.emit(\'tokenRequest\',window.deviceId + "-emulator");\n\n    // receive token, wait a moment and send validation request\n    socket.on(\'token\', (tk) => {\n        console.log("emulator: recieved token", tk)\n        authToken = tk;\n        setTimeout(()=> {\n            socket.emit(\'tokenValidate\', {\n                auth: { authToken: authToken},\n                message: "Pi94BXqogmJlqyeEAAAA"\n            });\n        },2000);\n\n        socket.on(\'latestDataRequest\', (req) => {\n            socket.emit(\'latestConversations\', {\n                auth: {authToken: authToken},\n                message: [\n                    {\n                        "text": "hello world",\n                        "sender": "Nelson Mandela"\n                    }\n                ]\n            })\n        })\n    });\n\n});\n\n// listener for \'thread\' event, which updates messages\nsocket.on(\'thread\', function (data) {\n    $(\'#thread\').append(\'<li>\' + data + \'</li>\');\n});\n\n// prevents form from submitting and sends a message to server\n/*$(\'form\').submit(function () {\n    var message = $(\'#message\').val();\n    socket.emit(\'messages\', message);\n    this.reset();\n    return false;\n});*/\n</script>\n\n</body>\n</html>');
$templateCache.put('app/authenticate/authenticate.html','<div class="auth container-fluid">\n    <div class="row">\n        <div class="left col col-xs-5 no-padding">\n            Info here\n        </div>\n        <div class="right col col-xs-7 no-padding">\n            <div class="qr-container">\n                 <div class=\'loader\'>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--dot\'></div>\n                    <div class=\'loader--text\'></div>\n                </div>\n                <img alt="" ng-src="{{ $ctrl.imgUrl }}">\n            </div>\n        </div>\n    </div>\n    <div class="progress">\n        <div class="done"></div>\n    </div>\n</div>');
$templateCache.put('app/conversations/conversations.html','<div class="conversations container-fluid">\n    <div class="row">\n        <div class="left col col-xs-4 no-padding">\n            <div class="list-group-item section-header">\n                <div class="section-menu btn-toolbar" role="toolbar" aria-label="...">\n                    <button class="btn btn-icon btn-group" role="group" aria-label="..."><i class="icons icon-speech" aria-hidden="true"></i></button>\n                    <div class="btn-group" role="group">\n                            <button type="button" class="btn btn-icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                                <i class="icons icon-options-vertical" aria-hidden="true"></i>\n                            </button>\n                            <ul class="dropdown-menu dropdown-menu-right">\n                                <li><a href="#">New group</a></li>\n                                <li><a href="#">Profile</a></li>\n                                <li><a href="#">Archived</a></li>\n                                <li><a href="#">Settings</a></li>\n                                <li><a href="#">Sign out</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                <div class="section-head-text">\n                    <img class="img-circle" src="https://s13.postimg.org/ih41k9tqr/img1.jpg" />\n                </div>\n            </div>\n            <div class="list-group-item search">\n                <span class="icons icon-magnifier"></span>\n                <input type="search" class="form-control" placeholder="Search" />\n            </div>\n            <div class="people list-group">\n                <a class="person list-group-item" ng-click="$ctrl.select(convo)" ng-class="{\'active\': convo.isActive, \'unread\': convo.unread}" data-chat="{{ person + convo.id }}" ng-repeat="convo in $ctrl.conversations">\n                    <div class="media">\n                        <div class="media-left media-middle">\n                            <img class="media-object img-circle" ng-src="{{convo.avatarUrl}}" alt="" />\n                        </div>\n                        <div class="media-body">\n                            <span class="time badge" ng-bind="convo.time">2:09 PM</span>\n                            <p class="list-group-item-heading" ng-bind="convo.name">Thomas Bangalter</p>\n                            <p class="list-group-item-text"><small ng-bind="convo.body">I was wondering...</small></p>\n                        </div>\n                    </div>\n                </a>\n            </div>\n        </div>\n        <div class="right col col-xs-8 no-padding">            \n            <div class="list-group-item section-header">\n                <div class="section-menu btn-toolbar" role="toolbar" aria-label="...">\n                    <button class="btn btn-icon btn-group" role="group" aria-label="..."><i class="icons icon-magnifier" aria-hidden="true"></i></button>\n                    <button class="btn btn-icon btn-group" role="group" aria-label="..."><i class="icons icon-volume-off" aria-hidden="true"></i></button>\n                    <button class="btn btn-icon btn-group" role="group" aria-label="..."><i class="icons icon-paper-clip" aria-hidden="true"></i></button>             \n                    <div class="btn-group" role="group">\n                        <button type="button" class="btn btn-icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                        <i class="icons icon-options-vertical" aria-hidden="true"></i>\n                        </button>\n                        <ul class="dropdown-menu dropdown-menu-right">\n                            <li><a href="#">Contact info</a></li>\n                            <li><a href="#">Select messages</a></li>\n                            <li><a href="#">Mute</a></li>\n                            <li><a href="#">Clear messages</a></li>\n                            <li><a href="#">Delete chat</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class="section-head-text">\n                    <h4>Current user name</h4>\n                </div>\n            </div>\n            <div class="messages-wrapper">\n                <ul class="messages list-group">\n                    <li class="message list-group-item" ng-repeat="message in $ctrl.conversations">\n                        <div class="media-body">\n                            <span class="time badge" ng-bind="message.time">2:09 PM</span>\n                            <h6 class="list-group-item-heading" ng-bind="message.name">Thomas Bangalter</h6>\n                            <p class="list-group-item-text" ng-bind="message.body">I was wondering...</p>\n                        </div>\n                    </li>\n                    <li class="message message-start list-group-item">\n                        <div class="media-body">\n                            <p class="list-group-item-text">Today 2:23 PM</p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item me">\n                        <div class="media-body">\n                            <p class="list-group-item-text">Just me sending a message\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item you">\n                        <div class="media-body">\n                            <p class="list-group-item-text">Okay got the message, did you get mine?\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item me">\n                        <div class="media-body">\n                            <p class="list-group-item-text">Yep\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item you">\n                        <div class="media-body">\n                            <p class="list-group-item-text">I\'m about to send two messages in succession\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item you">\n                        <div class="media-body">\n                            <p class="list-group-item-text">here it comes\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item you">\n                        <div class="media-body">\n                            <p class="list-group-item-text">and another one to make it sweeter\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n                    <li class="message list-group-item me">\n                        <div class="media-body">\n                            <p class="list-group-item-text">followed by mine which happens to be really long.Lorem ipsum dolor sit amet, consectetur adipiscing\n                                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f\n                                <span class="time">2:09 PM</span>\n                            </p>\n                        </div>\n                    </li>\n\n                </ul>\n            </div>\n            <div class="list-group-item sms-input">\n                <input type="search" class="form-control" placeholder="Enter message here" />\n            </div>\n        </div>\n    </div>\n    <!-- ./row -->\n    <div class="progress">\n        <div class="done"></div>\n        <!-- todo: use different colors green, yellow, red to display connection state \n            todo: expand to allow displaying error in this bar\n            todo: clicking on this bar should retry the last request\n            -->\n    </div>\n</div>\n<!-- ./container -->\n<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" crossorigin="anonymous">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css" />');
$templateCache.put('app/smoke-test/test-view.html','<p>{{ $ctrl.sample }}</p>');}]);