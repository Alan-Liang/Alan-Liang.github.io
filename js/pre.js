var where = window.location.href;
var what = where.split("#");
what = what[1];

var title_a;
var main_iframe;

function b(){
	title_a = document.getElementById("title_a");
	main_iframe = document.getElementById("main_iframe");
	
	title_a.innerHTML = what;

	main_iframe.src = 
	"https://view.officeapps.live.com/op/view.aspx?src="+
	"http%3A%2F%2Falan-liang.github.io%2Ffiles%2Fuploaded%2F"+
	what;
	main_iframe.style.cssText = "display:block;height:"+(window.innerHeight - 30)+"px;";
}
