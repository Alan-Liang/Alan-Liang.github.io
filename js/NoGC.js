function NoGC(){
	 if ((navigator.userAgent.indexOf("Chrome") > -1)){
	alert('本系统使用chrome会出bug，请勿访问，欢迎帮我改正！');
	if(window.location.href.split("/")[4]!=undefined)
	window.location.href = "http://alan.liangcn.tk/fkGoCh/"+window.location.href.split("/")[4];
	else window.location.href="http://alan.liangcn.tk/fkGoCh/";
 	}
}
