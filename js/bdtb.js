var _open=window.open;//呵呵
window.open=function(a,b){}

function e(){
var list=document.getElementsByTagName('textarea')[0].
         value.split('\n');
if(list[0]==undefined){alert(1);return false;}
flag=true;
for(name in list){

setTimeout(function(){_open("http://alan-liang.github.io/qiandaoapi#"+list[name],"newwindow"+list[name]);},5500*name);

}
alert('签完了');
return false;
}
