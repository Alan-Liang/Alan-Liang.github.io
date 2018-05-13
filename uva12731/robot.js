//@author Alan-Liang
var $=function(sel){return document.getElementById(sel);};
var $_=function(sel,parent){return (parent?parent:document).querySelectorAll(sel);};

var row=5;
var column=6;

var container=$("container");
var rows=[];
var cells=[];
var map=[];
//todo: generate map
map=[
	[0,0,0,0,1,1],
	[0,0,1,1,1,1],
	[1,1,1,[3,1],1,0],
	[1,[2,3],1,1,1,1],
	[1,1,1,1,1,1]];
var pos=[3,0];
function getDiv(){return document.createElement("div");}
var toggleState=function(cell){
	return function(){
		if(cell.state){cell.state=0;cell.className="td white";}
		else{cell.state=1;cell.className="td black";}
	};
};
for(var i=0;i<row;i++){
	var thisRow=getDiv();
	thisRow.className="row";
	rows.push(thisRow);
	cells[i]=[];
	for(var j=0;j<column;j++){
		var cell=getDiv();
		if(!map[i][j])cell.className="td grey";
		else{
			cell.className="td white";
			cell.onclick=toggleState(cell);
		}
		if(pos[0]==i&&pos[1]==j) cell.innerText="R";
		thisRow.appendChild(cell);
		cells[i].push(cell);
	}
	container.appendChild(thisRow);
}

var up=$("up"),down=$("down"),left=$("left"),right=$("right");
var result=$("result");
var steps=0;
var moves=$("moves");
moves.innerText="0";

function move(dir){
	steps++;
	switch(dir){
		case "up":
		if(pos[0]==0) return false; //upper bound
		if(!map[pos[0]-1][pos[1]]) return false; //hit
		if(typeof map[pos[0]-1][pos[1]]==typeof []){ //transport
			pos=map[pos[0]-1][pos[1]].slice();
		}
		pos[0]=pos[0]-1;
		break;
		
		case "down":
		if(pos[0]==row-1) return false; //bound
		if(!map[pos[0]+1][pos[1]]) return false; //hit
		if(typeof map[pos[0]+1][pos[1]]==typeof []){ //transport
			pos=map[pos[0]+1][pos[1]].slice();
		}
		pos[0]=pos[0]+1;
		break;
		
		case "left":
		if(pos[1]==0) return false; //bound
		if(!map[pos[0]][pos[1]-1]) return false; //hit
		if(typeof map[pos[0]][pos[1]-1]==typeof []){ //transport
			pos=map[pos[0]][pos[1]-1].slice();
		}
		pos[1]=pos[1]-1;
		break;
		
		case "right":
		if(pos[1]==column-1) return false; //bound
		if(!map[pos[0]][pos[1]+1]) return false; //hit
		if(typeof map[pos[0]][pos[1]+1]==typeof []){ //transport
			pos=map[pos[0]][pos[1]+1].slice();
		}
		pos[1]=pos[1]+1;
		break;
	}
	return true;
}

function makeOnclick(dir){
	return function(){
		//cells[pos[0]][pos[1]].innerText="";
		if(steps==0){
			cells[pos[0]][pos[1]].style.cssText="color:#aaa;";
		}
		var res=move(dir);
		result.innerText=res?1:0;
		moves.innerText=""+steps;
		//cells[pos[0]][pos[1]].innerText="R";
	};
}
up.onclick=makeOnclick("up");
down.onclick=makeOnclick("down");
left.onclick=makeOnclick("left");
right.onclick=makeOnclick("right");

var tries=0;
result.onclick=function(){
	tries++;
	var no=function(){
		result.innerText="x";
	};
	for(var i=0;i<row;i++){
		for(var j=0;j<column;j++){
			if(map[i][j]){
				if(map[i][j]==1){
					if(cells[i][j].state) return no();
				}else{
					if(!cells[i][j].state) return no();
				}
			}
		}
	}
	alert("You won in "+tries+" tries! moves: "+steps);
	return;
};
