//:js/math.js by Alan-Liang

function init(){
	document.getElementsByClassName("do-plugin-1")[0].onsubmit=function(e){
		doplugin1(
		Number(document.getElementsByClassName("do-in-1-alp")[0].value),
		Number(document.getElementsByClassName("do-in-1-n")[0].value));
		e.Cancel = true;
		return false;
	};
	
	document.getElementsByClassName("do-plugin-2")[0].onsubmit=function(e){
		doplugin2(
		Number(document.getElementsByClassName("do-in-2-alp")[0].value),
		Number(document.getElementsByClassName("do-in-2-i")[0].value),
		Number(document.getElementsByClassName("do-in-2-j")[0].value));
		return false;
	}
}

function doplugin1(alp,n){
	var out = document.getElementById("out");
	out.className="";
	if(alp>=180||alp<=0||n>=100||n<=0){
		out.classList.add("answer-no");
		out.innerHTML="<strong>错误：输入超限</strong>";
		return new Array(false,-1);
	}
	var sum = n*(n+1)/2*alp;
	var ret = 180-Math.abs((sum%360)-180);
	out.classList.add("answer-yes");
	out.innerHTML = "<strong>结果："+ret+"°</strong>";
	return new Array(true,ret);
}

function doplugin2(alp,i,j){
	var out = document.getElementById("out");
	out.className="";
	if((!doplugin1(alp,i)[0])||(!doplugin1(alp,j)[0])){
		out.classList.add("answer-no");
		out.innerHTML="<strong>错误：输入超限</strong>";
		return false;
	}
	var ret = 
		Math.abs(doplugin1(alp,i)[1]-
		         doplugin1(alp,j)[1]);
	out.classList.add("answer-yes");
	out.innerHTML = "<strong>结果："+ret+"°</strong>";
}
