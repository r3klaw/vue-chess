webpackJsonp([1,4],{230:function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(19),o=i(n),a=s(23),r=i(a),c=s(21),l=i(c),u=s(33),h=i(u),d=s(363),m=i(d),v=s(213),f=i(v),b=s(215),p=i(b),g=s(2),w=i(g),y=s(4),k=i(y),x=s(34),C=s(35),G=s(50),T=i(G),_=s(18),B=i(_),M={white:1,black:1},$={board:["light-wood-3d","blue","wood","marble"],pieces:["merida","staunton","pirouetti","cburnett"]};t.default={template:s(354),route:{canActivate:function(e){return!(!k.default.user_acces("authenticate")||!w.default.get("board")._id)||e.redirect("home")}},data:function(){return{chattext:"",mensjGame:[],userWhite:{},userBlack:{},user:k.default.getUser(),usersConnect:[],userconvert:w.default.get("userconvert",{}),ground:0,fen:"none",orientation:"white",history:[],styleboard:!0,active:!0,state:"",chess:new l.default,stylesBoard:$,styles:w.default.get("styleBoard",{board:1,pieces:0}),board:w.default.get("board"),dirServer:w.default.get("serverDir")}},mixins:[B.default],props:{},components:{UserCard:m.default,BoardHistory:f.default,BodyMen:p.default},vuex:{actions:{boardGameMove:x.boardGameMove,boardGameTurn:x.boardGameTurn,boardGameCountDown:x.boardGameCountDown},getters:{pgn:C.getGamePgn,turn:C.getGameTurn,time:C.getGameTimesUsers}},events:{move:function(e){this.active&&this.boardGameMove(e.pgn),this.changeStateGame(e.pgn,e.move),e.times&&(this.boardGameCountDown(e.times.black,"black"),this.boardGameCountDown(e.times.white,"white"))},gameFinish:function(e){this.stateFinishGame(e)},mensaje:function(e){this.recibeMensaje(e.men)}},methods:{selectUserToConversation:function(){var e={c:"chat",f:"username",data:{user:this.user}};setTimeout(function(){this.$socket.emit("event",e,function(){this.usersConnect=arguments.length<=1?void 0:arguments[1],this.$broadcast("modal::open","usersConnect")}.bind(this))}.bind(this),2)},userToConversation:function(e){this.userconvert=e,this.$broadcast("modal::close","some","usersConnect")},recibeMensaje:function(e){var t="chatConvertGame",s=document.getElementById(t),i=s.scrollTop>=s.scrollHeight-s.clientHeight;this.mensjGame.push(e),i&&setTimeout(function(){(0,T.default)("#"+t).animate({scrollTop:(0,T.default)("#"+t)[0].scrollHeight},"slow")},10)},loadUserConvert:function(e){var t={c:"chat",f:"loadUserConvert",data:e};this.$socket.emit("event",t,function(){var e=arguments.length<=1?void 0:arguments[1];this.mensjGame=e,setTimeout(function(){(0,T.default)("#chatConvertGame").animate({scrollTop:(0,T.default)("#chatConvertGame")[0].scrollHeight},"slow")},1e3)}.bind(this))},imageUrl:function(e){return w.default.get("serverDir")+"/uploads/"+e},loadOtherUser:function(e,t){"PC"!==e?k.default.get(this,e).then(function(e){t(e.data)},function(e){}):t({image:"50x50defaultAvatar.png"})},sendMensaje:function(){if(""!==this.chattext){var e=this.user.username,t=this.board.u1===e?this.board.u2:this.board.u1;if((this.userconvert.username||this.userconvert.nickname)&&(t=this.userconvert.username||this.userconvert.nickname),"PC"!==t){var s={body:this.chattext,type:"text",public:!1,send:e,recibe:t},i={c:"chat",f:"mensaje",data:{men:s}};this.$socket.emit("event",i,function(){}),this.chattext=""}}},countDown:function(){var e=0;if(e=this.time[this.turn]-1,e<=0&&(e=0,clearInterval(M[this.turn]),this.active)){var t={color:"black"===this.turn?"white":"black",motiv:"timeout"};this.gameFinish(t)}this.boardGameCountDown(e,this.turn)},countDownStart:function(){clearInterval(M[this.turn]),M[this.turn]=setInterval(function(){this.countDown()}.bind(this),1e3)},chessToDests:function(e){var t={};return e.SQUARES.forEach(function(s){var i=e.moves({square:s,verbose:!0});i.length&&(t[s]=i.map(function(e){return e.to}))}),t},chessToColor:function(e){var t=e.turn(),s="w"===t?"white":"black";return this.boardGameTurn(s),s=this.user.username===this.board.u2?"black":"white"},onMove:function(e,t){if(this.active){this.chess.move({from:e,to:t,promotion:"q"});var s="w"===this.chess.turn()?"white":"black",i={c:"board",f:"move",data:{event:"move",data:{pgn:this.chess.pgn(),idBoard:this.board._id,turn:s,times:{},move:{from:e,to:t}}}};this.$socket.emit("event",i,function(){})}},PcIngeniesMove:function(e){var t=255&e,s=e>>8&255,i=h.default.FormatSquare(t),n=h.default.FormatSquare(s);this.onMove(i,n)},pcMove:function(e){h.default.InitializeFromFen(e),h.default.Search(this.PcIngeniesMove,5,null)},isVsPc:function(e){("white"===e&&"PC"===this.board.u1||"black"===e&&"PC"===this.board.u2)&&setTimeout(function(){this.pcMove(this.chess.fen())}.bind(this),700)},isHumanVsPC:function(){return"PC"===this.board.u1||"PC"===this.board.u2},changeStateGame:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.from?(this.chess.move({from:t.from,to:t.to,promotion:"q"}),this.ground.move(t.from,t.to)):this.chess.load_pgn(e),this.ground.set({fen:this.chess.fen(),turnColor:this.chessToColor(this.chess),movable:{color:this.chessToColor(this.chess),dests:this.chessToDests(this.chess)}}),this.isVsPc(this.turn)},changeOrientation:function(){this.orientation="white"===this.orientation?"black":"white",this.ground.set({orientation:this.orientation})},changeStyle:function(e){this.styles[e]=this.styles[e]+1,this.styles[e]>$[e].length-1&&(this.styles[e]=0),this.styleAdapter(),w.default.set("styleBoard",this.styles)},styleAdapter:function(){"light-wood-3d"===this.stylesBoard.board[this.styles.board]?document.getElementById("tablerochess").style.height=document.getElementById("tablerochess").clientWidth-6.25*document.getElementById("tablerochess").clientWidth/100+"px":document.getElementById("tablerochess").style.height=document.getElementById("tablerochess").clientWidth+"px"},initGame:function(){this.boardGameMove("none");var e={c:"board",f:"getBoard",data:w.default.get("board")};this.$socket.emit("event",e,function(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];if(t[0])return w.default.del("board"),void this.$route.router.go("/");var i=t[1].board;this.boardGameCountDown(t[1].times.black,"black"),this.boardGameCountDown(t[1].times.white,"white"),this.changeStateGame(i.pgn),this.boardGameMove(i.pgn),this.board=i,this.styleAdapter()}.bind(this));var t=this.user.username,s=this.board.u1===t?this.board.u2:this.board.u1,i={user:s,range:{limit:10,skip:0}};this.loadUserConvert(i),this.loadOtherUser(s,function(e){this.userWhite=t===this.board.u1?this.user:e,this.userBlack=t===this.board.u2?this.user:e,!this.userconvert.username&&e.username&&(this.userconvert=e)}.bind(this))},gameState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e.motiv){var t="";return t=e.motiv+" "+o.default.t("game.wins")+" "+e.color,"timeout"===e.motiv&&this.boardGameCountDown(0,"white"===e.color?"black":"white"),t}var s=this.chess.game_over();if(this.chess.in_check()&&!s)return o.default.t("game.check")+" "+o.default.t("home.createPart."+this.turn);if(s){if(this.chess.in_checkmate()){var i={color:"white"===this.turn?"black":"white",motiv:"checkmate"};return void this.gameFinish(i)}if(this.chess.in_draw()){var n={color:"draw",motiv:"drawn_position"};return void this.gameFinish(n)}if(this.chess.in_stalemate()){var a={color:"white"===this.turn?"black":"white",motiv:"stalemate"};return void this.gameFinish(a)}if(this.chess.in_threefold_repetition()){var r={color:"draw",motiv:"threefold_repetition"};return void this.gameFinish(r)}if(this.chess.insufficient_material()){var c={color:"draw",motiv:"insufficient_material"};return void this.gameFinish(c)}}return o.default.t("game.turnColor")+" "+o.default.t("home.createPart."+this.turn)},rendir:function(){var e={color:this.board.u1===this.user.username?"black":"white",motiv:"rendicion"};this.gameFinish(e)},gameFinish:function(e){if(this.active){var t={c:"board",f:"gameFinish",data:{idBoard:this.board._id,result:e}};this.$socket.emit("event",t,function(){})}},stateFinishGame:function(e){this.active=!1,this.state=this.gameState(e.result),w.default.del("board"),w.default.del("userconvert"),this.ground.stop(),clearInterval(M.black),clearInterval(M.white)}},created:function(){h.default.ResetGame(),setTimeout(function(){this.orientation=this.user.username===this.board.u2?"black":"white",this.ground=(0,r.default)(document.getElementById("tablerochess"),{viewOnly:!1,turnColor:"white",animation:{duration:300},movable:{free:!1,premove:!0,dests:this.chessToDests(this.chess),events:{after:this.onMove}},drawable:{enabled:!0},showDests:!0,orientation:this.orientation}),this.styleAdapter(),this.initGame(),(0,T.default)("html, body").animate({scrollTop:(0,T.default)("#tablerochess").offset().top},500)}.bind(this),10)},watch:{turn:function(e,t){this.active&&(clearInterval(M[t]),this.countDownStart())},pgn:function(e,t){this.state=this.gameState(),this.history=this.chess.history({verbose:!0})},userconvert:function(e,t){w.default.set("userconvert",e)}}}},231:function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(2),o=i(n),a=s(35);t.default={name:"userCard",props:{color:{type:String},username:{type:Object}},vuex:{getters:{turn:a.getGameTurn,time:a.getGameTimesUsers}},methods:{pad:function(e,t){return("0"+e).slice(t)},imageUrl:function(e){return o.default.get("serverDir")+"/uploads/"+e}},filters:{boardTime:function(e){var t=parseInt(e/60),s=e%60;return this.pad(t,-2)+":"+this.pad(s,-2)}},watch:{},created:function(){}}},342:function(e,t){e.exports=' <div class="col s12 m12 l12 card-panel" v-bind:class="[turn === color ? \'userTurn\' : \'\']"> <div class="col s4 m4 l3"> <h4 class=flat-text-header>{{ time[color] | boardTime }}</h4> </div> <div class="col s4 m4 l6"> <p class=flat-text-header style="float: right">{{ username.username || \'PC\'}}</p> </div> <div class="col s4 m4 l3" v-show=username.image> <img alt="" v-bind:src=imageUrl(username.image) class="avatar avatar-50 photo avatar-default circle" height=60 width=60> </div> </div> '},354:function(e,t){e.exports='<div class="col s12"> <md-modal id=usersConnect> <h4 style="text-align: center">Usuarios conectados</h4> <md-input name=search :value.sync=finduser> Buscar usuario </md-input> <md-collection-list class="col s12 m12 l12"> <md-collection-list-item class=avatar v-if="user.username !== u.nickname" v-for="u in usersConnect | filterBy finduser" @click=userToConversation(u)> <img v-bind:src=imageUrl(u.image) alt="" class=circle> <span class=title>{{u.nickname}}</span> <a slot=secondary-content href=javascript:void(0)> <md-icon>grade</md-icon> </a> </md-collection-list-item> </md-collection-list> </md-modal> <div class="col s12 m12 l3"> <p style="text-align: center">{{ $t("game.chat") }}</p> <div style="height: 65vh;overflow: auto" id=chatConvertGame> <body-men :mens=mensjGame :dir-server=dirServer :user=user></body-men> </div> <form v-on:submit.prevent=sendMensaje()> <md-input name=text :value.sync=chattext class="col s9 m9 l10"> {{ $t("game.text") }} </md-input> <md-btn @mouseover="tooltip($event, \'Enviar Mensaje\', \'top\')" class="btn waves-effect waves-light col s3 m3 l2 send-btn" type=submit> S </md-btn> <md-collection-list class="col s12 m12 l12" @click=selectUserToConversation v-if="userconvert.username || userconvert.nickname"> <md-collection-list-item class=avatar> <img v-bind:src=imageUrl(userconvert.image) alt="" class=circle> <span class=title>{{userconvert.nickname || userconvert.username}}</span> <a slot=secondary-content href=javascript:void(0)> <md-icon>grade</md-icon> </a> </md-collection-list-item> </md-collection-list> <md-btn v-else @mouseover="tooltip($event, $t(\'game.chatConverTooltip\'), \'top\')" class="waves-effect waves-light col s12 m12 l12" @click=selectUserToConversation> {{ $t("game.chatConver") }} ... </md-btn> </form> </div> <div class="col s12 m12 l6"> <div id=tablerochess style="width: 100%;height: 600px" class="{{ stylesBoard[\'board\'][styles[\'board\']] }} chessground vuejs {{ stylesBoard[\'pieces\'][styles[\'pieces\']] }}"></div> </div> <div class="col s12 m12 l3"> <user-card :color="\'white\'" :username=userWhite v-if="this.orientation === \'black\'"></user-card> <user-card :color="\'black\'" :username=userBlack v-else></user-card> <h6 class="flat-text-header hello" style="text-align: center">{{ state }}</h6> <div class="col s12 m12 l12"> <board-history :history=history :active=active :humanvspc=isHumanVsPC></board-history> </div> <div class="col s12 m12 l12"> <md-btn @mouseover="tooltip($event, \'Pieces\', \'top\')" class="waves-effect waves-light col s2 m2 l2" @click="changeStyle(\'pieces\')"> P </md-btn> <md-btn @mouseover="tooltip($event, \'Board\', \'top\')" class="waves-effect waves-light col s2 m2 l2" @click="changeStyle(\'board\')"> B </md-btn> <md-btn @mouseover="tooltip($event, \'Rendirse\', \'top\')" class="waves-effect waves-light col s4 m4 l4" @click=rendir()> {{ $t("game.rend") }} </md-btn> <md-btn @mouseover="tooltip($event, \'Cambiar orientacion\', \'top\')" class="waves-effect waves-light col s4 m4 l4" @click=changeOrientation> {{ $t("game.invert") }} </md-btn> </div> <user-card :color="\'black\'" :username=userBlack v-if="this.orientation !== \'white\'"></user-card> <user-card :color="\'white\'" :username=userWhite v-else></user-card> </div> <style scoped> .menText p {\n            text-align: justify;\n            -moz-hyphens: auto;\n            word-wrap: break-word;\n        }\n\n        .userTurn {\n            background-color: #D8B980;\n        }\n\n        .send-btn {\n            height: 60px;\n        }\n\n        .chessground.tiny {\n            width: 225px;\n            height: 225px;\n        }\n\n        .chessground.small {\n            width: 300px;\n            height: 300px;\n        }\n\n        .chessground.normal {\n            width: 512px;\n            height: 512px;\n        }\n\n        .cg-board-wrap svg {\n            opacity: 0.6;\n            overflow: hidden;\n            position: relative;\n            top: 0px;\n            left: 0px;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n            z-index: 2;\n        }\n\n        .cg-board-wrap svg * {\n            transition: 0.35s;\n        } </style> </div>'},362:function(e,t,s){var i,n,o={};i=s(230),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var a="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(a.template=n),a.computed||(a.computed={}),Object.keys(o).forEach(function(e){var t=o[e];a.computed[e]=function(){return t}})},363:function(e,t,s){var i,n,o={};i=s(231),n=s(342),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var a="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(a.template=n),a.computed||(a.computed={}),Object.keys(o).forEach(function(e){var t=o[e];a.computed[e]=function(){return t}})}});
//# sourceMappingURL=1.97ed892978722e1d5222.js.map