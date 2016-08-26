/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	//
    	document.addEventListener("backbutton", eventBackButton, false); //返回键解决按返回键时返回上一个html页面的问题
    	//
    	$(document).ready(function(){
    		console.log("console.log works well");
    		console.log("navigator.camera:"+navigator.camera);
    		console.log("deviceInfo:"+device.model+","+device.version);
    		var usernameLogin=$("#usernameLogin").val();
    		var loc = location.href;
    		if(loc.indexOf("=") != -1){//有其他页面退出而来
	    		var n1 = loc.length;//地址的总长度
	    		var n2 = loc.indexOf("=");//取得=号的位置
	    		usernameLogin = decodeURIComponent(loc.substr(n2+1, n1-n2));//从=号后面的内容
    		}
    		$("#usernameLogin").val(usernameLogin);
    		ready(usernameLogin);
		 });
//        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function ready(usernameLogin){
	$("#registNow").click(function(){//立即注册
		alert("no regist function Now");
//		var emailRegist = $("#emailRegist").val();
//		var passwordRegist = $("#passwordRegist").val();
//		var nickyRegist = $("#nickyRegist").val();
//		registActivityPlugin(emailRegist ,passwordRegist,nickyRegist, function(data) {  
//			alert(data);  
//	    });
    });
	$("#registPhone").click(function(){//手机号注册
		alert("no regist function with Phone Now");
    });
	$("#toLogin").click(function(){//登录
		usernameLogin=$("#usernameLogin").val();
		window.location.href="main.html?"+"usernameLogin="+encodeURIComponent(usernameLogin);
    });
};
function eventBackButton(){
	//如果是在index页面识别到返回键就退出APP
	if (window.location.href.indexOf("index") != -1) {//登录首页
		backActivityPlugin("" ,"", function(data) {  
			alert(data);  
	    }); 
    }else if(window.location.href.indexOf("main") != -1){//主页
    	window.location.href="index.html?"+"loginName="+encodeURIComponent(loginName);
    } else {
    	alert("other:"+window.location.href);
    	window.history.back();
    }
};
backActivityPlugin = function(str,str2,callback) {  
	   cordova.exec(callback, pluginFailed, "CallActivityPlugin", "back", [ str,str2]);  
}; 
registActivityPlugin = function(str,str2,str3,callback) {  
	   cordova.exec(callback, pluginFailed, "CallActivityPlugin", "regist", [ str,str2,str3]);  
}; 
//必须定义	 
var pluginFailed = function(message) {  
	console.log("failed>>" + message);  
}
app.initialize();