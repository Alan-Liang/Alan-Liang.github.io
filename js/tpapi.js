var loc = window.location.href;
var data = loc.split("#");data = data[1];

var em = document.getElementsByTagName("a")[0];
var but = document.getElementsByTagName("button")[0];

var em_tsy = "如有疑问，请email我：yalun_liang@sina.com";

if(data == undefined || (data=data.split("&")) == undefined){
	alert('请勿直接访问');
	window.opener=null;
	window.open("","_self");
	window.close();
}

if(data[1] == "f"){
	em.innerHTML = em_tsy;
}

but.onclick=function(){
	window.opener=null;
	window.open("","_self");
	window.close();
}

//cnzz count
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1257139152'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/stat.php%3Fid%3D1257139152%26online%3D1%26show%3Dline' type='text/javascript'%3E%3C/script%3E"));
