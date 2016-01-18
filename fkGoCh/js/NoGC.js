function NoGC(){
	 if (navigator.userAgent.indexOf("Chrome") > -1){
	alert('本系统使用chrome会出bug，请更换浏览器！');
	window.close();
	document.write('');
	return;
 	}
}