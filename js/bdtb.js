var _open=window.open;//呵呵
window.open=function(a,b){}

function e(){
var list=document.getElementsByTagName('textarea')[0].
         value.split('\n');
if(list[0]==undefined){alert(1);return false;}
for(name in list){
_open("alan/redir.html?qiandaoapi#"+list[name],"newwindow"+list[name]);}
return false;
}