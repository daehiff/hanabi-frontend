(function(t){function e(e){for(var s,n,o=e[0],l=e[1],c=e[2],u=0,h=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&h.push(i[n][0]),i[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);d&&d(e);while(h.length)h.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,o=1;o<a.length;o++){var l=a[o];0!==i[l]&&(s=!1)}s&&(r.splice(e--,1),t=n(n.s=a[0]))}return t}var s={},i={app:0},r=[];function n(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=s,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(a,s,function(e){return t[e]}.bind(null,s));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/hanabi-frontend/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var d=l;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var s=a("85ec"),i=a.n(s);i.a},"0935":function(t,e,a){},"0ab0":function(t,e,a){"use strict";var s=a("c432"),i=a.n(s);i.a},"193f":function(t,e,a){},"28db":function(t,e,a){"use strict";var s=a("d454"),i=a.n(s);i.a},"322c":function(t,e,a){"use strict";var s=a("ddbd"),i=a.n(s);i.a},3738:function(t,e,a){},"43f3":function(t,e,a){t.exports=a.p+"img/hint.8446a9cf.png"},"4a48":function(t,e,a){"use strict";var s=a("bac9"),i=a.n(s);i.a},"4f88":function(t,e,a){"use strict";var s=a("3738"),i=a.n(s);i.a},5012:function(t,e,a){"use strict";var s=a("0935"),i=a.n(s);i.a},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("vs-popup",{attrs:{title:"Error","background-color":"danger",active:t.active},on:{"update:active":function(e){t.active=e}}},["LOGIN"==t.errorType?a("div",{staticClass:"errorPopup"},[a("p",{staticClass:"popupText"},[t._v("Invalid User: "+t._s(t.errorMsg))]),a("vs-button",{attrs:{color:"primary",type:"filled"},on:{click:t.backtoLogin}},[t._v("Back to Login")])],1):a("div",[a("p",[t._v(t._s(t.errorMsg))])])]),a("router-view",{staticClass:"view-wrapper"}),t._m(0)],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"view-footer"},[t._v(" Icons erstellt von "),a("a",{attrs:{href:"https://www.flaticon.com/de/autoren/smashicons",title:"Smashicons"}},[t._v("Smashicons")]),t._v(" from "),a("a",{attrs:{href:"https://www.flaticon.com/de/",title:"Flaticon"}},[t._v(" www.flaticon.com")])])}],n=a("2f62"),o={name:"App",data(){return{active:!1,errorMsg:"Internal Error",errorType:"INTERNAL"}},created(){this.initialize({errorCallback:this.showErrorPopup})},methods:{...Object(n["b"])(["initialize"]),showErrorPopup(t,e){console.error(e),this.active=!0,this.errorType=t,this.errorMsg=e},backtoLogin(){this.$router.push({name:"login"}),this.active=!1}}},l=o,c=(a("034f"),a("4a48"),a("2877")),d=Object(c["a"])(l,i,r,!1,null,"6caf32ae",null),u=d.exports,h=a("8c4f"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p",{staticClass:"loginHeader"},[t._v("Login")]),a("vs-input",{staticClass:"login-emailpw",attrs:{type:"email",disabled:t.loading,label:"Email",danger:t.errorLogin,"val-icon-danger":"clear"},model:{value:t.loginData.email,callback:function(e){t.$set(t.loginData,"email",e)},expression:"loginData.email"}}),a("vs-input",{staticClass:"login-emailpw",attrs:{type:"password",label:"Password",danger:t.errorLogin,"val-icon-danger":"clear",disabled:t.loading},model:{value:t.loginData.password,callback:function(e){t.$set(t.loginData,"password",e)},expression:"loginData.password"}}),t.errorLogin?a("p",{staticClass:"login-errormsg"},[t._v(t._s(t.errorLoginMsg))]):t._e(),a("vs-button",{staticClass:"login-loginbutton",attrs:{color:"primary",disabled:t.loading},on:{click:t.logInHandle}},[t._v("Login")]),a("vs-button",{staticClass:"login-loginbutton",attrs:{color:"primary",type:"border",disabled:t.loading},on:{click:function(e){return t.$router.push({name:"register"})}}},[t._v("Register")])],1)},p=[],g={name:"Login",created(){window.addEventListener("keydown",this.onEnter)},beforeRouteLeave(t,e,a){window.removeEventListener("keydown",this.onEnter),a()},data(){return{errorLoginMsg:"",errorLogin:!1,loading:!1,loginData:{email:"",password:""}}},methods:{onEnter(t){"Enter"==t.key&&this.logInHandle()},...Object(n["b"])(["logUserIn"]),async logInHandle(){this.loading=!0,this.errorLogin=!1;try{await this.logUserIn(this.loginData),this.$router.push({name:"lobbyBrowser"})}catch(t){this.errorLogin=!0,this.errorLoginMsg=t}this.loading=!1}}},y=g,v=(a("e4f9"),Object(c["a"])(y,b,p,!1,null,"1de0af51",null)),m=v.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p",[t._v("Register")]),a("vs-input",{staticClass:"register-emailpwuname",attrs:{type:"email",disabled:t.loading,label:"Email","val-icon-danger":"clear",danger:t.errorRegister},model:{value:t.registrationData.email,callback:function(e){t.$set(t.registrationData,"email",e)},expression:"registrationData.email"}}),a("vs-input",{staticClass:"register-emailpwuname",attrs:{type:"text",disabled:t.loading,label:"Username","val-icon-danger":"clear",danger:t.errorRegister},model:{value:t.registrationData.username,callback:function(e){t.$set(t.registrationData,"username",e)},expression:"registrationData.username"}}),a("vs-input",{staticClass:"register-emailpwuname",attrs:{type:"password",label:"Password","val-icon-danger":"clear",disabled:t.loading,danger:t.errorRegister},model:{value:t.registrationData.password,callback:function(e){t.$set(t.registrationData,"password",e)},expression:"registrationData.password"}}),t.errorRegister?a("p",{staticClass:"register-errormsg"},[t._v(" "+t._s(t.errorRegistrationMsg)+" ")]):t._e(),a("vs-button",{staticClass:"register-button",attrs:{color:"primary",disabled:t.loading},on:{click:t.registrationHandle}},[t._v("Register")]),a("vs-button",{staticClass:"register-button",attrs:{color:"primary",type:"border",disabled:t.loading},on:{click:function(e){return t.$router.push({name:"login"})}}},[t._v("Back to Login")])],1)},w=[],L={name:"Register",created(){window.addEventListener("keydown",this.onEnter)},beforeRouteLeave(t,e,a){window.removeEventListener("keydown",this.onEnter),a()},data(){return{loading:!1,errorRegistrationMsg:"",errorRegister:!1,registrationData:{email:"",username:"",password:""}}},methods:{onEnter(t){"Enter"==t.key&&this.registrationHandle()},...Object(n["b"])(["registerUser"]),async registrationHandle(){this.loading=!0,this.errorRegister=!1;try{await this.registerUser(this.registrationData),this.$router.push({name:"lobbyBrowser"})}catch(t){this.errorRegister=!0,this.errorRegistrationMsg=t}this.loading=!1}}},_=L,k=(a("5012"),Object(c["a"])(_,f,w,!1,null,"86038dee",null)),C=k.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("vs-popup",{attrs:{title:"Insert Lobby Salt",active:t.activateSaltPopup,"button-close-hidden":t.loading},on:{"update:active":function(e){t.activateSaltPopup=e}}},[a("div",{staticClass:"popup"},[a("vs-input",{staticClass:"button",attrs:{type:"text",label:"Salt","val-icon-danger":"clear",disabled:t.loading,danger:t.errorUnknownSalt},model:{value:t.lobbySalt,callback:function(e){t.lobbySalt=e},expression:"lobbySalt"}}),t.errorUnknownSalt?a("p",{staticClass:"login-errormsg"},[t._v(" "+t._s(t.errorLobbySalt)+" ")]):t._e(),a("vs-button",{staticClass:"button",attrs:{color:"success",disabled:t.loading},on:{click:function(e){return t.joinBySalt(t.lobbySalt)}}},[t._v("Join by Salt")])],1)]),a("p",{staticClass:"lobbyHeader"},[t._v("Lobbys")]),a("p",{staticClass:"publicDesciption"},[t._v("Public Lobbys:")]),a("div",{staticClass:"lobbyListWrapper"},[a("div",{staticClass:"lobbyList"},[0==t.avLobbys.length?a("span",{staticClass:"noPublicLobby"},[t._v("No public lobbys found")]):t._l(t.avLobbys,(function(e){return a("div",{key:e.lid,staticClass:"lobbyItem",on:{click:function(a){return t.joinBySalt(e.salt)}}},[a("span",{staticClass:"vs-button-text vs-button--text"},[t._v(t._s(e.salt))])])}))],2)]),a("vs-button",{staticClass:"button",attrs:{color:"success",disabled:t.loading},on:{click:t.createLobbyHandler}},[t._v("Create Lobby")]),a("vs-button",{staticClass:"button",attrs:{color:"primary",disabled:t.loading},on:{click:t.insertLobbySalt}},[t._v("Join by Salt")])],1)},P=[],E={name:"LobbyBrowse",created(){this.stopPoll=!1,this.findAllLobbies()},data(){return{stopPoll:!1,errorUnknownSalt:!1,activateSaltPopup:!1,loading:!1,lobbySalt:"",errorLobbySalt:""}},computed:{...Object(n["c"])({avLobbys:t=>t.availableLobbies})},methods:{...Object(n["b"])(["findLobbies","joinLobby","createLobby"]),async findAllLobbies(){if(!this.stopPoll)try{await this.findLobbies(),setTimeout(this.findAllLobbies,2e3)}catch(t){"LOGIN"==t?this.$router.push({name:"login"}):console.error("Lobbybrowser",t)}},async createLobbyHandler(){try{let t=await this.createLobby();this.stopPoll=!0,this.$router.push({name:"lobby",params:{lobbyId:t}})}catch(t){"LOGIN"==t?this.$router.push({name:"login"}):console.error("Lobbybrowser",t)}},insertLobbySalt(){this.errorUnknownSalt=!1,this.lobbySalt="",this.activateSaltPopup=!0,this.errorLobbySalt=""},async joinBySalt(t){if(!this.loading){this.loading=!0,this.errorUnknownSalt=!1;try{let e=await this.joinLobby(t);this.stopPoll=!0,this.$router.push({name:"lobby",params:{lobbyId:e}})}catch(e){"LOGIN"==e&&this.$router.push({name:"login"}),this.errorLobbySalt=e,this.errorUnknownSalt=!0}this.loading=!1}}}},x=E,I=(a("ad76"),Object(c["a"])(x,S,P,!1,null,"689722a7",null)),T=I.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("span",{staticClass:"header"},[t._v("Lobby")]),a("span",{staticClass:"lobbyText"},[t._v("Salt: "+t._s(t.joinedLobby.salt))]),a("div",{staticClass:"joinedPlayerWrapper"},[a("span",[t._v("Joined Player")]),a("div",{staticClass:"joinedPlayerList"},[null==t.joinedLobby.player||0==t.joinedLobby.player.length?a("span",{staticClass:"noPlayerSpan"},[t._v(" No Player joined")]):t._e(),t._l(t.joinedLobby.player,(function(e){return a("div",{key:e.uid,staticClass:"playerNameWarpper"},[a("span",{staticClass:"playerNameSpan"},[t._v(t._s(e.username))]),a("vs-button",{directives:[{name:"show",rawName:"v-show",value:t.joinedLobby.isHost,expression:"joinedLobby.isHost"}],staticClass:"kickPlayerButton",attrs:{color:"danger",type:"border",icon:"close"},on:{click:function(a){return t.kickPlayer(e.uid)}}})],1)}))],2)]),a("chat",{ref:"chat",staticClass:"chat",attrs:{id:"chat",chatData:t.joinedLobby.chat,currentPlayer:t.user.username},on:{sendMsg:t.sendMsgHandle}}),a("div",{staticClass:"settings"},[a("span",{staticClass:"lobbyText"},[t._v(" Settings")]),a("div",{staticClass:"settingsLayout"},[a("div",[a("p",[t._v("Rainbow")]),t._v(" "),a("vs-switch",{attrs:{disabled:!t.joinedLobby.isHost||t.loading,value:t.joinedLobby.gameSettings.isRainbow},on:{input:function(e){return t.updateSettings("RAINBOW",e)}}})],1),a("vs-input-number",{attrs:{disabled:!t.joinedLobby.isHost||t.loading,max:10,min:2,value:t.joinedLobby.gameSettings.amtHints,label:"Hints:"},on:{input:function(e){return t.updateSettings("HINT",e)}}}),a("vs-input-number",{attrs:{disabled:!t.joinedLobby.isHost||t.loading,max:4,min:2,value:t.joinedLobby.gameSettings.amtLives,label:"Lives:"},on:{input:function(e){return t.updateSettings("LIVE",e)}}}),a("vs-select",{attrs:{disabled:!t.joinedLobby.isHost||t.loading,placeholder:"Select Level",label:"Level",value:t.joinedLobby.gameSettings.level},on:{input:function(e){return t.updateSettings("LEVEL",e)}}},t._l(t.levels,(function(t,e){return a("vs-select-item",{key:e,attrs:{value:t,text:t}})})),1)],1)]),a("vs-button",{staticClass:"button",attrs:{disabled:!t.joinedLobby.isHost||t.loading,color:"success"},on:{click:t.launchGameHandle}},[t._v("Launch Game")]),t.joinedLobby.isHost?a("vs-button",{staticClass:"button",attrs:{disabled:t.loading,color:"danger"},on:{click:t.destroyLobbyHandle}},[t._v("Close Lobby")]):a("vs-button",{staticClass:"button",attrs:{disabled:t.loading,color:"danger"},on:{click:t.leaveLobbyHandle}},[t._v("Leave Lobby")])],1)},H=[],$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chat"},[a("p",[t._v("Chat")]),a("br"),a("div",{staticClass:"chatWrapper",attrs:{id:"chatBubbleID-2324"}},t._l(t.chatData,(function(e,s){return a("div",{key:s,class:{chatBubbleWrapper:!0,senderMsg:e.sender==t.currentPlayer,receiverMsg:e.sender!==t.currentPlayer}},[a("div",{staticClass:"chatBubble"},[a("p",{staticClass:"sender"},[t._v(" "+t._s(e.sender==t.currentPlayer?"You":e.sender)+" ")]),a("p",{staticClass:"message"},[t._v(t._s(e.message))])])])})),0),a("div",{staticClass:"chatTextArea"},[a("vs-textarea",{staticClass:"chatSendButton",model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),a("br"),a("vs-button",{staticClass:"chatSendButton",attrs:{color:"primary"},on:{click:t.emitMsg}},[t._v("Send")])],1)])},D=[],R={props:{chatData:{type:Array,default:()=>[]},currentPlayer:String},data(){return{text:"",isEscape:!0,prevElements:0}},watch:{text(t){"\n"==t&&(this.text="")}},created(){window.scrollChat=window.setInterval(function(){if(this.prevElements!=this.chatData.length){let t=document.getElementById("chatBubbleID-2324");t.scrollTop=t.scrollHeight}this.prevElements=this.chatData.length}.bind(this),500),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("keydown",this.onKeyDown)},methods:{onKeyUp(t){"Shift"==t.key&&(this.isEscape=!0)},onKeyDown(t){"Enter"==t.key?this.isEscape&&this.emitMsg():"Shift"==t.key&&(this.isEscape=!1)},emitMsg(){""!=this.text&&this.$emit("sendMsg",this.text),this.text=""}}},M=R,O=(a("cd15"),Object(c["a"])(M,$,D,!1,null,"c5c348e4",null)),B=O.exports,A={name:"Lobby",components:{chat:B},created(){this.stopPoll=!1,this.pollLobbyStatus()},async beforeRouteLeave(t,e,a){let s=this.$refs["chat"];if(window.removeEventListener("keyup",s.onKeyUp),window.removeEventListener("keydown",s.onKeyDown),window.scrollChat&&window.clearInterval(window.scrollChat),this.buttonCLicked)return void a();const i=window.confirm(this.leaveText);i?(this.loading=!0,this.joinedLobby.isHost?await this.destroyLobby():await this.leaveLobby(),this.stopPoll=!0,this.loading=!1,a()):a(!1)},data(){return{levels:["Hard","Easy","Middle","Beginner"],stopPoll:!1,loading:!1,buttonCLicked:!1}},methods:{async kickPlayer(t){this.loading=!0,await this.kickPlayer(t),this.loading=!1},async sendMsgHandle(t){await this.sendChatMsg(t)},updateSettings(t,e){this.settingsInputChange({type:t,input:e})},async destroyLobbyHandle(){this.buttonCLicked=!0,this.loading=!0,await this.destroyLobby(),this.stopPoll=!0,this.loading=!1,this.$router.push({name:"lobbyBrowser"})},async launchGameHandle(){this.loading=!0,this.buttonCLicked=!0;try{let t=await this.launchGame();this.$router.push({name:"game",params:{gameId:t.gameId}}),this.loading=!1,this.stopPoll=!0}catch(t){"LOGIN"==t?this.errorCallback("LOGIN","Pease Login Again"):this.errorCallback("INTERNAL",t),console.error(t),this.loading=!1}},async leaveLobbyHandle(){this.buttonCLicked=!0,this.loading=!0;try{await this.leaveLobby(),this.loading=!1,this.stopPoll=!0,this.$router.push({name:"lobbyBrowser"})}catch(t){"LOGIN"==t?this.errorCallback("LOGIN","Pease Login Again"):this.errorCallback("INTERNAL",t),console.error(t),this.loading=!1}},async pollLobbyStatus(){if(!this.stopPoll)try{let t=await this.getLobbyStatus(this.$route.params.lobbyId);t.launched&&(this.buttonCLicked=!0,this.stopPoll=!0,this.$router.push({name:"game",params:{gameId:t.gameId}})),setTimeout(this.pollLobbyStatus,2e3)}catch(t){console.error(t),"LOGIN"==t?this.$router.push({name:"login"}):"LOBBY_DESTROYED"==t?(this.buttonCLicked=!0,this.errorCallback("INTERNAL","Lobby has been closed"),this.$router.push({name:"lobbyBrowser"})):(this.buttonCLicked=!0,this.errorCallback("INTERNAL","Internal Error :( Sorry"),this.$router.push({name:"lobbyBrowser"}))}},...Object(n["b"])(["kickPlayer","getLobbyStatus","settingsInputChange","launchGame","leaveLobby","destroyLobby","sendChatMsg"])},computed:{...Object(n["c"])(["joinedLobby","errorCallback","user"]),leaveText(){return this.joinedLobby.isHost?"Do you really want to exit? You will close this lobby.":"Do you really want to exit? You will leave this lobby."}}},N=A,G=(a("4f88"),Object(c["a"])(N,j,H,!1,null,null,null)),U=G.exports,W=function(){var t=this,e=t.$createElement,s=t._self._c||e;return 0===Object.keys(t.gameToPlay).length?s("loader"):s("div",[s("vs-popup",{attrs:{active:t.showDiscardedCards,title:"Discard Pile"},on:{"update:active":function(e){t.showDiscardedCards=e}}},[s("div",{staticClass:"discardPile"},t._l(t.gameToPlay.discardPile,(function(t){return s("div",{key:t.cid,staticClass:"cardDiscarded"},[s("card",{attrs:{isStack:!0,card:t}})],1)})),0)]),s("vs-popup",{attrs:{"button-close-hidden":!0,title:t.wonLostTitle,active:t.showWonLost},on:{"update:active":function(e){t.showWonLost=e}}},[s("div",{staticClass:"wonLostPopup"},["Won"==t.gameToPlay.state?s("p",{staticClass:"wonLostText"},[t._v(" Congratulations you have won with : "+t._s(t.gameToPlay.points)+" Points ")]):s("p",{staticClass:"wonLostText"},[t._v("You Lost.")]),s("vs-button",{staticClass:"wonLostButton",on:{click:t.backtoMain}},[t._v("Back to Main Menu")])],1)]),s("firework",{ref:"firework",attrs:{id:"firework",boxHeight:"100%",boxWidth:"100%"}}),s("vs-popup",{attrs:{title:t.popupTitle,"button-close-hidden":t.loading,active:t.activatePopup},on:{"update:active":function(e){t.activatePopup=e}}},[t.isPlayAction?s("div",[s("div",[t._v(" "+t._s(t.cardData)+" ")]),null!=t.playError?s("p",{staticClass:"playError"},[t._v("Error: "+t._s(t.playError))]):t._e(),s("div",{staticClass:"cardButtons"},[s("vs-button",{attrs:{disabled:t.loading},on:{click:function(e){return t.cardMoveHandle("DiscardAction")}}},[t._v("Discard Card")]),s("vs-button",{attrs:{disabled:t.loading},on:{click:function(e){return t.cardMoveHandle("PlayAction")}}},[t._v("Play Card")])],1)]):s("div",[s("div",{staticClass:"hintWrapper"},[s("div",{staticClass:"hintSwitch"},[s("label",[t._v("Color Hint")]),t._v(" "),s("vs-switch",{attrs:{disabled:t.loading},model:{value:t.hintSettings.isColor,callback:function(e){t.$set(t.hintSettings,"isColor",e)},expression:"hintSettings.isColor"}})],1),s("div",[t.hintSettings.isColor?s("vs-select",{attrs:{disabled:t.loading,placeholder:"Select Color",label:"Color"},model:{value:t.hintSettings.color,callback:function(e){t.$set(t.hintSettings,"color",e)},expression:"hintSettings.color"}},t._l(t.colors,(function(t,e){return s("vs-select-item",{key:e,attrs:{value:t,text:t}})})),1):s("vs-input-number",{attrs:{disabled:t.loading,max:5,min:1,label:"Number:"},model:{value:t.hintSettings.number,callback:function(e){t.$set(t.hintSettings,"number",e)},expression:"hintSettings.number"}})],1)]),null!=t.playError?s("p",{staticClass:"playError"},[t._v("Error: "+t._s(t.playError))]):t._e(),s("div",{staticClass:"cardButtons"},[s("vs-button",{attrs:{disabled:t.loading},on:{click:t.giveHintHandle}},[t._v("Give Hint")])],1)])]),s("p",{staticClass:"gameHeading"},[t._v("Game")]),s("br"),s("div",{staticClass:"cardWrapper"},[s("div",{staticClass:"gameInfo"},[s("div",{staticClass:"gameInfoColumn"},[s("div",[t._v(" Lives: "),t._l(new Array(t.gameToPlay.lives),(function(t){return s("img",{key:t,staticClass:"hintLivesImg",attrs:{src:a("b19d")}})}))],2),s("div",[t._v(" Hints: "),t._l(new Array(t.gameToPlay.hints),(function(t){return s("img",{key:t,staticClass:"hintLivesImg",attrs:{src:a("43f3")}})}))],2),s("p",[t._v("Points "+t._s(t.gameToPlay.points))])]),s("div",{staticClass:"gameInfoColumn"},[s("p",[t._v(" Draw Pile: "+t._s(null!=t.gameToPlay.drawPile.length?t.gameToPlay.drawPile.length:0)+" ")]),s("div",{staticClass:"gameInfoButtons"},[s("p",[t._v(" Discard Pile: "+t._s(null!=t.gameToPlay.discardPile?t.gameToPlay.discardPile.length:0)+" ")]),s("br",{staticStyle:{width:"1em"}}),s("vs-button",{on:{click:function(e){t.showDiscardedCards=!0}}},[t._v("Show Discard Pile")])],1)])]),s("br"),s("br"),s("p",[t._v("Stacks")]),s("div",{staticClass:"playerCards"},t._l(t.gameToPlay.piles,(function(t){return s("card",{key:t[0],staticClass:"card",attrs:{isStack:!0,card:{color:t[0],number:t[1]}}})})),1)]),s("div",{staticClass:"cardWrapperWrapper"},[s("div",{staticClass:"cardWrapper"},[s("div",{class:["playerElement",t.user.uid==t.gameToPlay.currentPlayer?"activePlayer":""]},[s("p",[t._v(t._s(t.user.username)+" (me)")]),s("div",{staticClass:"playerCards"},t._l(t.gameToPlay.ownCards,(function(e){return s("action-card",{key:e.cid,class:["card"],attrs:{card:e},on:{cardMove:t.showCardMoveHandle}})})),1)])]),s("br"),s("div",{staticClass:"cardWrapper"},t._l(t.gameToPlay.players,(function(e){return s("div",{key:e.playerId,class:["playerElement",e.playerId==t.gameToPlay.currentPlayer?"activePlayer":""]},[s("p",[t._v(t._s(e.name)+":")]),s("div",{staticClass:"playerCards"},t._l(e.cards,(function(t){return s("card",{key:t.cid,staticClass:"card",attrs:{card:t,isStack:!1}})})),1),s("vs-button",{on:{click:function(a){return t.showGiveHintHandle(e)}}},[t._v("Give Hint")])],1)})),0)])],1)},q=[],Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"background",class:t.background,on:{click:t.clickedHandle}},[a("p",[t._v(t._s(0==t.card.number?"x":t.card.number))]),t.isStack?t._e():a("div",{staticClass:"cardhints"},[null!=t.card.hintColor||0!=t.card.hintColor.length?a("p",[t._v("Color")]):t._e(),t._l(t.card.hintColor,(function(e){return a("p",{key:e},[t._v(" "+t._s(e)+" ")])})),a("br"),a("p",[t._v("Number")]),null==t.card.hintNumber?a("p"):a("p",[t._v(t._s(t.card.hintNumber))])],2)])},F=[],K={name:"Card",props:{card:Object,isStack:Boolean},methods:{async clickedHandle(){this.$emit("cardMove",this.card)},computedColor(){return this.color.toLowerCase()}},computed:{background(){return null!=this.card&&null!=this.card.color?"background"+this.card.color:"background"}}},J=K,V=(a("0ab0"),Object(c["a"])(J,Y,F,!1,null,null,null)),z=V.exports,Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cardBackground",on:{click:t.clickedHandle}},[null==t.card.hintColor?a("p",[t._v("x")]):t._l(t.card.hintColor,(function(e){return a("p",{key:e},[t._v(t._s(e))])})),a("br"),null==t.card.hintNumber?a("p",[t._v("x")]):a("p",[t._v(t._s(t.card.hintNumber))])],2)},X=[],Z={name:"Card",props:{card:Object},methods:{clickedHandle(){this.$emit("cardMove",this.card)}}},tt=Z,et=(a("61ca"),Object(c["a"])(tt,Q,X,!1,null,"719041ea",null)),at=et.exports,st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:[t.active?"canvasBox":"canvasBoxDeactive"],style:"\n    height: "+t.canvasBoxHeight+";\n    width: "+t.canvasBoxWidth+";"},[a("canvas",{attrs:{id:"canvas"}})])},it=[],rt={props:["boxHeight","boxWidth"],data(){return{width:window.innerWidth,height:490,seedAmount:0,seeds:[],particles:[],auto:!1,active:!1,finished:!1}},computed:{canvas(){return document.getElementById("canvas")},ctx(){return void 0!==this.canvas?this.canvas.getContext("2d"):null},canvasBoxHeight(){return this.boxHeight||"100%"},canvasBoxWidth(){return this.boxWidth||"100%"}},methods:{wipeCanvas(){void 0!==this.ctx&&(this.canvas.style.display="none")},clearCanvas(){void 0!==this.ctx&&(this.ctx.fillStyle="rgba(0, 0, 0, 0.1)",this.ctx.fillRect(0,0,this.width,this.height))},circle(t,e,a){void 0!==this.ctx&&(this.ctx.beginPath(),this.ctx.arc(t,e,a,0,2*Math.PI),this.ctx.closePath())},loop(){if(void 0!==this.ctx){this.clearCanvas(),this.ctx.globalCompositeOperation="lighter";for(let t=0;t<this.seeds.length;t+=1)this.seeds[t].dead?this.seeds.splice(t,1):(this.seeds[t].move(),this.seeds[t].draw());for(let t=0;t<this.particles.length;t+=1)this.particles[t].dead?this.particles.splice(t,1):(this.particles[t].move(),this.particles[t].draw());0==this.seeds.length&&0==this.particles.length&&this.finished&&this.wipeCanvas(),this.ctx.globalCompositeOperation="destination-out",requestAnimationFrame(this.loop)}},Seed(t,e,a,s){const i=this,r=.05,n=3,o=s[0],l=s[1],c=s[2],d=`hsla(${o}, ${l}, ${c}, 1)`,u=!1,h={};let b=2;return h.x=t,h.y=e,h.move=()=>{h.y>i.randomInt(100,200)?(b+=r,h.x+=b*Math.sin(Math.PI/180*a),h.y+=b*Math.cos(Math.PI/180*a)):u||(h.explode(),h.dead=!0)},h.draw=()=>{i.ctx.fillStyle=d,i.circle(h.x,h.y,n),i.ctx.fill()},h.explode=()=>{for(let t=0;t<359;t+=4){const e=i.Firework(h.x,h.y,t+i.randomInt(-200,200)/100,[o,l,c]);i.particles.push(e)}},h.dead=u,h},Firework(t,e,a,s){const i=this,r={},n=i.randomInt(-20,20)/100,o=1,l=-.01,c=.01;let d=1,u=`hsla(${s[0]}, ${s[1]}, ${s[2]}, ${d})`,h=0,b=i.randomInt(195,205)/100,p=a,g=t,y=e;return r.dead=!1,r.move=()=>{d>0?(b>0&&(b+=l),p+=n,d-=.005,u=`hsla(${s[0]}, ${s[1]}, ${s[2]}, ${d})`,h+=c,g+=b*Math.sin(Math.PI/180*p),y+=b*Math.cos(Math.PI/180*p)+h):r.dead||(r.dead=!0)},r.draw=()=>{i.ctx.fillStyle=u,i.circle(g,y,o),i.ctx.fill()},r},randomInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)},init(){this.canvas.width=this.width,this.canvas.height=this.height},_fireWorkRatio(t,e){const a=1.3-1*e/t;return 2e3*a},createFireWork(t,e){this.active=!0;const a=()=>{const t=this.Seed(this.randomInt(0,this.width),this.height-20,this.randomInt(175,185),[this.randomInt(0,359),"100%","50%"]);this.seeds.push(t)};this.init(),this.loop();const s=window.setInterval(a.bind(this),this._fireWorkRatio(t,e));window.setTimeout((()=>{window.clearInterval(s),this.finished=!0}).bind(this),1e4)}}},nt=rt,ot=(a("a254"),Object(c["a"])(nt,st,it,!1,null,"27837502",null)),lt=ot.exports,ct=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},dt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"viewWrapper"},[a("div",{staticClass:"lds-roller"},[a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div")])])}],ut={name:"loader"},ht=ut,bt=(a("28db"),Object(c["a"])(ht,ct,dt,!1,null,"79f7ae78",null)),pt=bt.exports,gt={name:"Game",components:{card:z,"action-card":at,firework:lt,loader:pt},created(){this.pollGame()},data(){return{colors:["Red","Green","Yellow","Blue","White"],loading:!1,playError:null,popupTitle:"UNDEFINED",cardData:{},hintSettings:{isColor:!1,color:"Red",number:1},activatePopup:!1,isPlayAction:!1,stopPoll:!1,showWonLost:!1,wonLostTitle:"UNDEFINED",showDiscardedCards:!1}},computed:{...Object(n["c"])(["gameToPlay","user"])},methods:{backtoMain(){this.$router.push({name:"lobbyBrowser"}),this.stopPoll=!0},async cardMoveHandle(t){this.loading=!0,this.playError=null;let e={tag:t,cardId:this.cardData.cid};try{await this.makeMove(e),this.activatePopup=!1}catch(a){this.playError=a}this.loading=!1},async giveHintHandle(){this.loading=!0,this.playError=null;let t={tag:"HintAction",targetPlayer:this.hintSettings.pid,hint:this.hintSettings.isColor?{Left:this.hintSettings.color}:{Right:Number(this.hintSettings.number)}};try{await this.makeMove(t),this.activatePopup=!1}catch(e){this.playError=e}this.loading=!1},showCardMoveHandle(t){this.playError=null,this.gameToPlay.currentPlayer==this.user.uid&&(this.popupTitle="Play Card",this.isPlayAction=!0,this.activatePopup=!0,this.cardData=t)},showGiveHintHandle(t){this.playError=null,this.gameToPlay.currentPlayer==this.user.uid&&(this.hintSettings.pid=t.playerId,this.popupTitle="Give Hint",this.isPlayAction=!1,this.activatePopup=!0)},...Object(n["b"])(["getGameStatus","makeMove"]),async pollGame(){if(!this.stopPoll)try{await this.getGameStatus(this.$route.params.gameId),"Won"==this.gameToPlay.state?(this.stopPoll,this.$refs["firework"].createFireWork(this.gameToPlay.maxPoints,this.gameToPlay.points),this.showWonLost=!0,this.wonLostTitle="Won"):"Lost"==this.gameToPlay.state&&(this.stopPoll,this.showWonLost=!0,this.wonLostTitle="Lost"),setTimeout(this.pollGame,2e3)}catch(t){"LOGIN"==t?this.$router.push({name:"login"}):console.error("",t)}}}},yt=gt,vt=(a("322c"),Object(c["a"])(yt,W,q,!1,null,"1ca8c5b0",null)),mt=vt.exports,ft=a("bc3a"),wt=a.n(ft);const Lt=1,_t=6;class kt{constructor(t){this.baseURL=t,this.instance=wt.a.create({baseURL:t,headers:{auth:localStorage.getItem("hanabi-auth-token")}})}_updateToken(t){this.instance.defaults.headers.auth=t,localStorage.setItem("hanabi-auth-token",t)}_handleServerResponse(t){if(null!=t.response){let e=t.response;throw e.data.error.message}throw"INTERNAL"}_checkLobbyDestroyed(t){if(null!=t.response&&t.response.data.error.code==_t)throw"LOBBY_DESTROYED"}_checkAuthError(t){if(null!=t.response&&t.response.data.error.code==Lt)throw"LOGIN"}async login(t){try{let e=await wt.a.post(this.baseURL+"/auth/login",t);return this._updateToken(e.headers.auth),e.data.success.message}catch(e){console.log(e),this._handleServerResponse(e)}}async getUser(){try{let t=await this.instance.get("user/status");if(this._updateToken(t.headers.auth),200==t.status)return t.data.success.message}catch(t){this._checkAuthError(t),this._handleServerResponse(t)}}async register(t){try{let e=await wt.a.post(this.baseURL+"/auth/register",t);return this._updateToken(e.headers.auth),e.data.success.message}catch(e){this._handleServerResponse(e)}}async findLobbies(){try{let t=await this.instance.get("lobby/find");if(this._updateToken(t.headers.auth),200==t.status)return t.data.success.message}catch(t){this._checkAuthError(t),this._handleServerResponse(t)}}async joinLobby(t){try{let e=await this.instance.post("lobby/join/"+t);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async createLobby(t){try{let e=await this.instance.post("lobby/create",t);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async kickPlayer(t,e){try{let a=await this.instance.post(`lobby/${e}/kick/${t}`);if(this._updateToken(a.headers.auth),200==a.status)return a.data.success.message}catch(a){this._checkAuthError(a),this._handleServerResponse(a)}}async getLobbyStatus(t){try{let e=await this.instance.get(`lobby/${t}/status`);if(this._updateToken(e.headers.auth),200==e.status){let t=e.data.success.message,a=await Promise.all(t.player.map(async t=>this.getUserByID(t)));return t.player=a,e.data.success.message}}catch(e){this._checkAuthError(e),this._checkLobbyDestroyed(e),this._handleServerResponse(e)}}async getChat(t){try{let e=await this.instance.get(`chat/${t}/status`);if(this._updateToken(e.headers.auth),200==e.status){let t=e.data.success.message,a=Array.from(new Set(t.messages.map(t=>t.sender))),s=await Promise.all(a.map(async t=>this.getUserByID(t))),i=s.reduce((function(t,e){return t[e.uid]=e.username,t}),{});return t.messages=t.messages.map(t=>(t.sender=i[t.sender],t)),e.data.success.message}}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async getUserByID(t){try{let e=await this.instance.get(`user/${t}/status`);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async adjustSettings(t){try{let e=await this.instance.post(`lobby/${t.lid}/settings`,{settings:t.gameSettings});if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async launchGame(t){try{let e=await this.instance.post(`lobby/${t.lid}/launch`);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async leaveLobby(t){try{let e=await this.instance.post(`lobby/${t.lid}/leave`);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async destroyLobby(t){try{let e=await this.instance.post(`lobby/${t.lid}/remove`);if(this._updateToken(e.headers.auth),200==e.status)return e.data.success.message}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async gameStatus(t){try{let e=await this.instance.get(`game/${t}/status`),a=await this.instance.get(`game/${t}/cards`),s=await this.instance.get(`game/${t}/ownCards`);if(this._updateToken(e.headers.auth),200==e.status&&200==a.status&&200==s.status){let t=e.data.success.message,i=a.data.success.message,r=s.data.success.message;return t.discardPile=i.discardPile,t.players.forEach(t=>(t.cards=i[t.playerId],t)),t.ownCards=r,t}}catch(e){this._checkAuthError(e),this._handleServerResponse(e)}}async makeMove(t,e){try{let a=await this.instance.post(`game/${e}/move`,t);if(this._updateToken(a.headers.auth),200==a.status)return a.data.success.message}catch(a){this._checkAuthError(a),this._handleServerResponse(a)}}async sendMsg(t,e){try{let a=await this.instance.post(`chat/${t}/send`,{message:e});if(this._updateToken(a.headers.auth),200==a.status)return a.data.success.message}catch(a){this._checkAuthError(a),this._handleServerResponse(a)}}}s["default"].use(n["a"]);const Ct=new n["a"].Store({state:{errorCallback:(t,e)=>{console.error(t,e)},request:new kt("https://hanabi-backend.herokuapp.com/"),user:{},availableLobbies:[],joinedLobby:{gameSettings:{}},gameToPlay:{}},mutations:{setErrorCallback(t,e){t.errorCallback=e},setUser(t,e){t.user=e},setAvLobbies(t,e){t.availableLobbies=e},setLobby(t,e){t.joinedLobby=e},setGame(t,e){t.gameToPlay=e}},actions:{initialize({commit:t},{errorCallback:e}){t("setErrorCallback",e)},async logUserIn({state:t,commit:e},a){let s=await t.request.login(a);e("setUser",s)},async registerUser({state:t,commit:e},a){let s=await t.request.register(a);e("setUser",s)},async setUser({state:t,commit:e}){let a=await t.request.getUser();e("setUser",a)},async findLobbies({state:t,commit:e}){let a=await t.request.findLobbies();e("setAvLobbies",a)},async joinLobby({state:t,commit:e},a){let s=await t.request.joinLobby(a);return s.isHost=s.lobbyHost=t.user.uid,e("setLobby",s),s.lid},async createLobby({state:t,commit:e}){let a=await t.request.createLobby({public:!0,settings:{amtLives:2,amtHints:9,level:"Hard",isRainbow:!0}});return a.isHost=!0,e("setLobby",a),a.lid},async getLobbyStatus({state:t,commit:e},a){let s=await t.request.getLobbyStatus(a),i=await t.request.getChat(s.lobbyChatID);return s.chat=i.messages.reverse(),s.isHost=s.lobbyHost==t.user.uid,e("setLobby",s),s},async updateSettings({commit:t},e){t("setLobby",e)},async settingsInputChange({state:t,commit:e},{type:a,input:s}){let i=t.joinedLobby;if("RAINBOW"==a){if(t.joinedLobby.gameSettings.isRainbow==s)return;i.gameSettings.isRainbow=s}else if("HINT"==a){if(t.joinedLobby.gameSettings.amtHints==s)return;i.gameSettings.amtHints=Number(s)}else if("LIVE"==a){if(t.joinedLobby.gameSettings.amtLives==s)return;i.gameSettings.amtLives=Number(s)}else if("LEVEL"==a){if(t.joinedLobby.gameSettings.level==s)return;i.gameSettings.level=s}await t.request.adjustSettings(i),e("setLobby",i)},async kickPlayer({state:t,commit:e},a){let s=await t.request.kickPlayer(a,t.joinedLobby.lid);s.chat=t.joinedLobby.chat,e("setLobby",s)},async launchGame({state:t,commit:e}){let a=await t.request.launchGame(t.joinedLobby);return e("setLobby",a),a},async leaveLobby({state:t,commit:e}){await t.request.leaveLobby(t.joinedLobby),e("setLobby",{gameSettings:{}})},async destroyLobby({state:t,commit:e}){await t.request.destroyLobby(t.joinedLobby),e("setLobby",{gameSettings:{}})},async getGameStatus({state:t,commit:e},a=null){null==a&&(a=t.gameToPlay.gid);let s=await t.request.gameStatus(a);e("setGame",s)},async makeMove({state:t,commit:e},a){await t.request.makeMove(a,t.gameToPlay.gid);let s=await t.request.gameStatus(t.gameToPlay.gid);e("setGame",s)},async sendChatMsg({state:t,commit:e},a){await t.request.sendMsg(t.joinedLobby.lobbyChatID,a);let s=await t.request.getLobbyStatus(t.joinedLobby.lid),i=await t.request.getChat(s.lobbyChatID);s.chat=i.messages.reverse(),s.isHost=s.lobbyHost==t.user.uid,e("setLobby",s)}}});var St=Ct;const Pt=new h["a"]({mode:"hash",base:"/hanabi-frontend/",routes:[{name:"lobbyBrowser",path:"/",component:T,beforeEnter(t,e,a){let s=localStorage.getItem("hanabi-auth-token");null==s?a({name:"login"}):a()}},{name:"login",path:"/login",component:m},{name:"register",path:"/register",component:C},{name:"lobby",path:"/lobby/:lobbyId",component:U},{name:"game",path:"/game/:gameId",component:mt}]});Pt.beforeEach(async(t,e,a)=>{try{await St._actions.setUser[0](),a()}catch(s){"login"!=t.name&&"register"!=t.name?a({name:"login"}):a()}});var Et=Pt,xt=a("fb9a"),It=a.n(xt);a("04f2"),a("c789");s["default"].use(It.a,{theme:{colors:{primary:"#5b3cc4",success:"rgb(23, 201, 100)",danger:"rgb(242, 19, 93)",warning:"rgb(255, 130, 0)",dark:"rgb(36, 33, 69)"}}}),s["default"].use(n["a"]),s["default"].use(h["a"]),s["default"].mixin({beforeRouteUpdate(t,e,a){console.log("Mixin",t,e,a)}}),s["default"].config.productionTip=!1,new s["default"]({router:Et,store:St,render:t=>t(u)}).$mount("#app")},"61ca":function(t,e,a){"use strict";var s=a("8156"),i=a.n(s);i.a},7415:function(t,e,a){},8156:function(t,e,a){},"85ec":function(t,e,a){},a254:function(t,e,a){"use strict";var s=a("7415"),i=a.n(s);i.a},ad76:function(t,e,a){"use strict";var s=a("193f"),i=a.n(s);i.a},b19d:function(t,e,a){t.exports=a.p+"img/live.6e4b688a.png"},bac9:function(t,e,a){},c432:function(t,e,a){},c5ec:function(t,e,a){},cd15:function(t,e,a){"use strict";var s=a("c5ec"),i=a.n(s);i.a},d454:function(t,e,a){},ddbd:function(t,e,a){},e4f9:function(t,e,a){"use strict";var s=a("f3d7"),i=a.n(s);i.a},f3d7:function(t,e,a){}});
//# sourceMappingURL=app.a2acf1d9.js.map