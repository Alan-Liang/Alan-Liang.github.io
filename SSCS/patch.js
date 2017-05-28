tpl=function(chatmsg,str,idn){
	var st=/{{[a-zA-Z]*}}/gi;
	var res="";
	var comp;
	var last=0;
	var flag=false;
	while(comp=st.exec(str)){
		res+=str.substring(last,comp.index);
		flag=true;
		last=comp.index+comp[0].length;
		var pps=str.substring(comp.index+2,last-2);
		var val;
		if(pps=="time")chatmsg[idn][pps]=new Date(chatmsg[idn][pps]).toString();
		if(pps=="text" && (chatmsg[idn][pps].indexOf("@"+uname)>-1))
			chatmsg[idn][pps]="<font class=\"atme\">"+chatmsg[idn][pps]+"</font>";
/*		if(pps=="text"&&/\[Code:.*\]/.test(chatmsg[idn][pps])){
			/\[Code:.*\]/gi.exec(chatmsg[idn][pps]).index;
		}*/
		if((val=chatmsg[idn][pps])!=undefined)res+=val;
		else res+=("{{"+pps+"}}");
	}
	res+=str.substring(last,str.length);
	return res;
}
