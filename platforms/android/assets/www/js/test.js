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
    	$(document).ready(function(){
    		var loc = location.href;
    		var n1 = loc.length;//地址的总长度
    		var n2 = loc.indexOf("=");//取得=号的位置
    		var loginName = loc.substr(n2+1, n1-n2);//从=号后面的内容
    		$("#hello").html($("#hello").html()+decodeURIComponent(loginName)); 
    		ready(decodeURIComponent(loginName));
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
function ready(loginName){
	//
	$("#mainBack").click(function(){//退出
		window.location.href="index.html?"+"loginName="+encodeURIComponent(loginName);
    });
	$("#myPluginTestb").click(function(){//插件测试按钮
		var str =$("#myPluginTesti").val();
		var str2 =$("#myPluginTesti2").val();
		callMyTestActivityPlugin(str ,str2, function(data) {  
			alert(data);  
	    }); 
    });
/*	$(document).on("scrollstart",function(){//滚屏开始
		alert("scrollstart!");
	}); 
	$(document).on("scrollstop",function(){//滚屏结束
		alert("scrollstop!");
	}); */ 
	$("p").on("swipe",function(){//滑动
		$("span").text("swipe");
	});
	$("p").on("swipeleft",function(){//左滑
		$("span").text("swipe left");
	});  
	$("p").on("swiperight",function(){//右滑
		$("span").text("swipe right");
	});
	$("p").on("taphold",function(){//长按
	    $(this).hide();
	}); 
	$("#ajaxTest").click(function(){//ajax
		httpPostMyTestActivityPlugin("" ,"", function(data) {  
			alert("http post success:"+data);
	    });
	});
	
	$(window).on("orientationchange",function(){//方向改变事件
	    if(window.orientation == 0)
	    {
	      $("#h11").html("now is portrait!").css({"background-color":"yellow","font-size":"300%"});
	    }
	    else
	    {
	      $("#h11").text("now is landscape!").css({"background-color":"pink","font-size":"200%"});
	    }
 	 });   
	
};
callMyTestActivityPlugin = function(str,str2,callback) {  
	   cordova.exec(callback, pluginFailed, "CallActivityPlugin", "call", [ str,str2]);  
};  
httpPostMyTestActivityPlugin = function(str,str2,callback) {  
	   cordova.exec(callback, pluginFailed, "CallActivityPlugin", "httpPost", [ str,str2]);  
}; 

//必须定义	 
var pluginFailed = function(message) {  
	alert("failed>>" + message);  
}
app.initialize();