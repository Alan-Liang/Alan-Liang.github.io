//排序算法改进
//1秒干嘛去了(申请记录)
try{


	//debug code on/off
var debug = function ( str ){
	//alert( str );
	$( "#log" ).innerHTML = $( "#log" ).innerHTML +str+"\n";
}

function $(desc) {
	return document.querySelector(desc);
}

//pile tool
var pile = {};
pile.remain=[];
pile.has = [13,13];
for (var i = 0; i < 12; ++i) {
	pile.remain[( 2*i )] = [0,i];
	pile.remain[( 2*i+1 )] = [1,i];
}
pile.number = pile.remain.length;
//0 is black 1 is white
debug( "pile default "+pile.remain );
pile.take = function ( color ){
	if( !pile.has[color] )return null;
	var iscolor=[];
	for (var i = 0; i < pile.remain.length; ++i) {
		if ( pile.remain[i]&&pile.remain[i][0] == color ) {
			iscolor[iscolor.length] = pile.remain[i];
		}
	}
	debug( "iscolor"+ iscolor )
	if( iscolor.length ==0 ){
		return null;
	}
	pile.number--;
	if( iscolor.length  == 1 )pile.has[color] = false;
	else pile.has[color] = iscolor.length-1;
	var rnd = parseInt(Math.random()*iscolor.length);
	debug( "return "+iscolor[rnd] )
	for (var i = 0; i < pile.remain.length; ++i) {
		if( pile.remain[i]==iscolor[rnd] ){
			pile.remain[i] = undefined;
			pile.cleanRemain();
			return iscolor[rnd];
		}
	}
}
pile.cleanRemain = function (){
	var newrem = [];
	for (var i = 0; i < pile.remain.length; ++i) {
		if( pile.remain[i] ) newrem.push( pile.remain[i] );
	}
	debug( "remclean "+newrem );
	pile.remain = newrem;
};
window._pile = pile;
debug( "_pile "+_pile )

//desk tool
var desk = {};
desk.top = $( "#topdiv" );
desk.bottom = $( "#bottomdiv" );
desk.left = $( "#leftdiv" );
desk.right = $( "#rightdiv" );
desk.cards = [[],[],[],[]];
//0 is top 1 is bottom 2 is left 3 is right
debug( "desk"+[desk.top,desk.bottom,desk.left,desk.right] )
desk.push = function ( card,pos,cpos ){
	var posdiv;
	switch( pos ){
		case 0:
		posdiv = desk.top;
		break ;
		case 1:
		posdiv = desk.bottom;
		break ;
		case 2:
		posdiv = desk.left;
		break ;
		case 3:
		posdiv = desk.right;
		break ;
	}
	debug( "posdiv"+posdiv );
	if( !posdiv )return false;
	if( ( !card )||( (card[1]) ==undefined )||( (card[0])==undefined ) )return false;
	//desk.cards[pos].push( card );
	if( cpos&&((cpos[1])!=undefined) ){
		var cards = desk.cards[pos];
		var newstack = [];
		for( var i = 0;i<=cards.length;i++ ){
			if( i<cpos[1] )newstack.push( cards[i] );
			if( i == cpos[i] )newstack.push( card );
			if( i>cpos[1] )newstack.push( cards[i-1] );
		}
		desk.cards[pos] = newstack;
	}
	else{
		desk.cards[pos].push( card );
		cpos = desk.rearrange( pos );
	}
	return desk.displayCard( card,posdiv,cpos );
	
};

desk.rerender = function ( pos ){
	var posdiv;
	switch( pos ){
		case 0:
		posdiv = desk.top;
		break ;
		case 1:
		posdiv = desk.bottom;
		break ;
		case 2:
		posdiv = desk.left;
		break ;
		case 3:
		posdiv = desk.right;
		break ;
	}
	debug( "posdiv"+posdiv );
	if( !posdiv )return false;
	var cards = posdiv.getElementsByClassName( "card" );
	for( var i = 0;i<cards.length;i++ ){
		for( var j = 0;j<desk.cards[pos].length;j++ ){
			var color=desk.cards[pos][j][0];
			var number=desk.cards[pos][j][1];
			var flag=(
				(
				  (color&&cards[i].classList.contains("white"))||
				  ((!color)&&cards[i].classList.contains("black"))
				)&&(
				  (number+"")==cards[i].innerHTML
				));
		  if( flag )
		    cards[i].setAttribute( "data-cpos1",i );
		}
	}
};

desk.rearrange = function ( pos ){
	var cards = desk.cards[pos];
	var newcard = cards[cards.length-1];
	var newstack = [];
	var len = cards.length;
	for ( var i = 0; i<len;i++ ){
		var nowmin = cards[0];
		for ( var u = 0;u<cards.length;u++ ){
			var flag = ( ( nowmin[1]>cards[u][1] )||( (nowmin[1] == cards[u][1])&&( nowmin[0] == 1 ) ) );
			if( flag )nowmin = cards[u];
		}
		newstack.push( nowmin );
		var newrem = [];
		for (var y = 0; y < cards.length; ++y) {
			if( cards[y]!=nowmin ) newrem.push( cards[y] );
		} 
		cards = newrem;
	}
	cards = newstack;
	debug( "rearrange cards 	"+cards );
	desk.cards[pos] = cards;
	for( var i = 0;i<cards.length;i++ ){
		if( cards[i] == newcard )return [pos,i];
	}
};
desk.displayCard = function ( card,posdiv,cpos ){
	if( (!card)||( !posdiv )||( cpos==undefined ) )return false;	
	var cspan = document.createElement( "span" );
	var color = null;
	if( card[0]==0 )color = "black";
	if( card[0]==1 )color = "white";
	if( !color )return false;
	var posstr;	
	 switch( cpos[0] ){
		case 0:
		posstr = "top";
		break ;
		case 1:
		posstr = "bottom";
		break ;
		case 2:
		posstr = "left";
		break ;
		case 3:
		posstr = "right";
		break ;
	} 
	 debug( "color "+color+" posstr "+posstr ) 
	if( !posstr )return false;
	cspan.setAttribute( "data-cpos0",cpos[0]);
	cspan.setAttribute( "data-cpos1",cpos[1]); 
	cspan.className = "card newcard "+color+" "+posstr;
	if( !(card[2]) )cspan.innerHTML = card[1];
	var nextSibling = posdiv.getElementsByClassName( "card" )[cpos[1]];
	posdiv.insertBefore( cspan,nextSibling );
	//keyframes
	desk.rerender( cpos[0] );
	return cspan;
};
desk.hide = function( cpos ){
	var flag = (!(cpos))
			||( ( cpos[0] )==undefined )
			||( ( cpos[1] )==undefined );
	if( flag )return false;
	var posdiv;
	switch( cpos[0] ){
		case 0:
		posdiv = desk.top;
		break ;
		case 1:
		posdiv = desk.bottom;
		break ;
		case 2:
		posdiv = desk.left;
		break ;
		case 3:
		posdiv = desk.right;
		break ;
	}
	debug( "posdiv"+posdiv );
	if( !posdiv )return false;
	var cspan = posdiv.getElementsByClassName( "card" )[cpos[1]];
	if( !cspan )return false;
	var card = desk.cards[cpos[0]][cpos[1]];
	if( !card )return false;
	cspan.innerHTML = "";
	desk.cards[cpos[0]][cpos[1]][2] = true;
};
desk.show = function( cpos ){
	var flag = (!cpos)
			||( ( cpos[0] )==undefined )
			||( ( cpos[1] )==undefined );
	if( flag )return false;
	var posdiv;
	switch( cpos[0] ){
		case 0:
		posdiv = desk.top;
		break ;
		case 1:
		posdiv = desk.bottom;
		break ;
		case 2:
		posdiv = desk.left;
		break ;
		case 3:
		posdiv = desk.right;
		break ;
	}
	debug( "posdiv"+posdiv )
	if( !posdiv )return false;
	var cspan = posdiv.getElementsByClassName( "card" )[cpos[1]];
	if( !cspan )return false;
	var card = desk.cards[cpos[0]][cpos[1]];
	if( !card )return false;
	cspan.innerHTML = card[1];
	desk.cards[cpos[0]][cpos[1]][2] = false;
};
desk.getState = function( cpos ){
	var flag = (!cpos)
			||( ( cpos[0] )==undefined )
			||( ( cpos[1] )==undefined );
	if( flag )return false;
	var card = desk.cards[cpos[0]][cpos[1]];
	if( !card )return false;
	return card[2];
};

$( "button[data-id=submit]" ).onclick = function (  ){
	desk.push(
		[parseInt(
			$( "input[data-tf=color]" ).value),
		parseInt(
			$( "input[data-tf=number]" ).value),
		$( "input[data-tf=hid]" ).value],
		parseInt(	$( "input[data-tf=pos]" ).value) );
};

$( "#rw" ).onclick = function(  ){
	desk.push(pile.take( 1 ),
		 parseInt(	$( "input[data-tf=pos]" ).value) 
	);
};
$( "#rb" ).onclick = function(  ){
	desk.push(pile.take( 0 ),
		 parseInt(	$( "input[data-tf=pos]" ).value) 
	);
};

function rnd ( n ){
	return parseInt(Math.random(  )*( n+1 ));
}

var game={};
var flipcard = function(target){
	var csp = target;
	var cpos = [];
	cpos[0] = parseInt(csp.getAttribute( "data-cpos0" ));
	cpos[1] = parseInt(csp.getAttribute( "data-cpos1" ));
	debug( "cpos "+cpos+" clicked" );
	if(csp.innerHTML!=""){desk.hide( cpos );}
	else {desk.show( cpos );}
};

window.gamestarted=false;
game.start=function(num){
	window.gamestack = [];
	if(window.gamestarted)return;
	console.time("get");
	for( var i = 0;i<num;i++ ){
		for( var j = 0;j<5;j++ ){
			var rndColor = rnd( 1 );
			var rndCard = pile.take( rndColor );
			if( !rndCard ){
				rndCard = pile.take( Math.abs( rndColor-1 ) );
			}
			var cspan = desk.push( rndCard,i );
			cspan.onclick = function ( e ){
				var csp = e.currentTarget;
				if(csp.getAttribute("data-cpos0")==""+window.gameat){
					flipcard(csp);
					alert(csp.innerHTML);
					flipcard(csp);
				}else{
					if(csp.innerHTML)return;
					var ut=prompt("guess");
					flipcard(csp);
					if(csp.innerHTML==ut){
						//TODO: got it
					}else{
						flipcard(csp);
						game.fliplast();
						game.next();
					}
				}
			}
		}
	}
	
	for(var i=0;i<num;i++){
		for(var j=0;j<5;j++){
			desk.hide([i,j]);
		}
	}
	window.gamestack=desk.cards.concat();
	window.gamestarted=true;
	window.gamemax=num-1;
	window.gameat=0;
	console.timeEnd("get");
};
game.fliplast=function(){
	//todo
}
game.next=function(){
	//todo
	window.gameat=(++window.gameat)%(window.gamemax+1);
};
/*setTimeout(function(){
	
},2000);*/
document.getElementById("gs").onclick=function(){
	game.start(parseInt(prompt("people?")));
}

}catch( e ){
	alert( e )
}
