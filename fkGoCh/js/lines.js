var untangle = (function() {
	var kTime = 0.15;
	if (/iPhone/.test(navigator.userAgent)) {
		kTime = 1;
	}

	function win() {


		var z = timer.getValue();
		alert("您的成绩是" + z + "秒。分享您的成绩或刷新页面以继续游戏！");
		document.title="我的成绩是" + z + "秒，你也试一试？";
		score++;
		flicker(5);
		if (z < fastest) {
			fastest = z;
		}


		while (fdisp.childNodes.length) {
			fdisp.removeChild(fdisp.childNodes[0]);
		}
		fdisp.appendChild(document.createTextNode("Fastest: " + fastest + " seconds."));
		fdisp.appendChild(document.createElement("br"));
		fdisp.appendChild(document.createTextNode(score + " game" + (score > 1 ? "s" : "") + " won"));

	}

	function lose() {}
	var score = 0;
	var p = {};
	var c = 12;
	var d = 3;
	var vt = [];
	var avt = [];
	var fastest = Infinity;
	var pt_c = 0;
	var fdisp = document.getElementById("fdisp");
	var theta = 0;
	document.getElementById("ngbtn").onclick = function() {

		timer.reset();
	};

	function random_point() {
		var t = Math.random() * 2.0 * Math.PI;
		return {
			"x": 0.5 + 0.45 * Math.sin(t),
			"y": 0.5 + 0.45 * Math.cos(t)
		};
	};

	function new_point(n) {
		pt_c++;
		//vt.push({"x":0.5+0.3*n/d*Math.sin(theta),"y":0.5+0.3*n/d*Math.cos(theta+=0.006*d*d*d)});
		//vt.push({"x":Math.random(),"y":Math.random()});

		vt.push(random_point());
		while (avt.length < vt.length) {
			avt.push({
				"x": 0.5,
				"y": 0.5
			});
		}
		return pt_c - 1;
	}

	function createNode(n) {
		if (n > d) {
			return {
				"p": new_point(n),
				"childNodes": []
			};
		}
		return {
			"p": new_point(n),
			"childNodes": [createNode(n + 1), createNode(n + 1)]
		};
	}
	var ingame = false;

	function newgame() {
		moves = 0;
		ingame = true;
		for (var i = 0; i < pt_c; i++) {
			vt[i] = random_point();
		}

		draw(30);

	}


	p = createNode(1);
	
	join(0, 1);


	p.childNodes[0].childNodes[0].childNodes[0].childNodes.push({
		"p": p.childNodes[0].childNodes[0].childNodes[1].p,
		"childNodes": []
	});

	p.childNodes[0].childNodes[0].childNodes[1].childNodes.push({
		"p": p.childNodes[0].childNodes[1].childNodes[0].p,
		"childNodes": []
	});


	p.childNodes[0].childNodes[1].childNodes[0].childNodes.push({
		"p": p.childNodes[0].childNodes[1].childNodes[1].p,
		"childNodes": []
	});


	p.childNodes[0].childNodes[1].childNodes[1].childNodes.push({
		"p": p.childNodes[1].childNodes[0].childNodes[0].p,
		"childNodes": []
	});


	p.childNodes[1].childNodes[0].childNodes[0].childNodes.push({
		"p": p.childNodes[1].childNodes[0].childNodes[1].p,
		"childNodes": []
	});

	p.childNodes[1].childNodes[0].childNodes[1].childNodes.push({
		"p": p.childNodes[1].childNodes[1].childNodes[0].p,
		"childNodes": []
	});


	p.childNodes[1].childNodes[1].childNodes[0].childNodes.push({
		"p": p.childNodes[1].childNodes[1].childNodes[1].p,
		"childNodes": []
	});


	p.childNodes[1].childNodes[1].childNodes[1].childNodes.push({
		"p": 0,
		"childNodes": []
	});


	p.childNodes.push({
		"p": p.childNodes[0].childNodes[0].childNodes[0].p,
		"childNodes": []
	});


	function join(a, b) {


	}
	var lines = [];

	function lineNode(node) {

		for (i in node.childNodes) {
			if (node.childNodes[i].p < vt.length) {

				lines.push({
					"x1": vt[node.p].x,
					"y1": vt[node.p].y,
					"x2": vt[node.childNodes[i].p].x,
					"y2": vt[node.childNodes[i].p].y
				});
				lineNode(node.childNodes[i]);
			} else {

			}
		}

	}

	var timer = (function() {
		var moves = 0;
		var time = 0;
		var interval;
		var that = this;
		var tickRate = 100;
		var begin = new Date();

		function tick() {
			time = new Date() - begin;
			if (onchange) {
				onchange(time / 1000);
			}
			if (time <= 0) {
				clearInterval(interval);
			}
		}
		var onchange;

		function reset() {
			clearInterval(interval);
			interval = setInterval(tick, tickRate);
			time = 0;
			begin = new Date();
			newgame();
		}
		return {
			"attachTimeListener": function(func) {
				onchange = func;
			},
			"getValue": function() {
				return time / 1000;聽聽
			},
			"reset": function() {
				reset();
			}


		};

	})();

	function countMove() {
		moves++;

	}

	function drawNode(node) {
		ctx.beginPath();
		for (i in node.childNodes) {
			if (node.childNodes.hasOwnProperty(i)) {
				if (node.childNodes[i].p < vt.length) {
					ctx.beginPath();
					ctx.moveTo(avt[node.p].x, avt[node.p].y);
					ctx.lineTo(avt[node.childNodes[i].p].x, avt[node.childNodes[i].p].y);
					ctx.stroke();
					drawNode(node.childNodes[i]);
				} else {

				}
			}
		}

	}
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;

	function draw(animationFrame) {



		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "#07c";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 0.003;
		ctx.scale(height, height);

		drawNode(p);

		for (var i = 0; i < pt_c; i++) {


			avt[i].x += (vt[i].x - avt[i].x) * kTime;
			avt[i].y += (vt[i].y - avt[i].y) * kTime;


		}
		for (var i = 0; i < pt_c; i++) {



			ctx.fillStyle = (selected == i) ? "#0af" : "#07c";
			ctx.beginPath();

			ctx.arc(avt[i].x, avt[i].y, 0.02, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

		}

		ctx.scale(1 / height, 1 / height);

		if (animationFrame > 1) {

			setTimeout(function() {
				draw(animationFrame - 1);
			}, 0);

		} else if (animationFrame === 1) {
			setTimeout(draw, 0);
		}
	}
	var selected = undefined;
	var dragging = false;
	canvas.onmousemove = function(e) {


		canvas.style.cursor = (selected === undefined) ? "default" : "pointer";


		if (!ingame) {
			timer.reset();
			return;
		}
		var x = (e.layerX === undefined) ? ((e.offsetX === undefined) ? e.x : e.offsetX) : e.layerX;
		var y = (e.layerY === undefined) ? ((e.offsetY === undefined) ? e.y : e.offsetY) : e.layerY;
		if (dragging && !(selected === undefined)) {
			avt[selected].x = vt[selected].x = x / width;
			avt[selected].y = vt[selected].y = y / width;
			draw();
		} else {
			var lastselected = selected;
			selected = undefined;
			var r2max = 0.02 * width * 0.02 * width;
			for (var i = pt_c - 1; i != -1; i--) {
				var dx = x - avt[i].x * height;
				var dy = y - avt[i].y * height;
				var r2 = (dx * dx) + (dy * dy);
				if (r2 < r2max) {
					selected = i;
					break;
				}
			}

			if (lastselected != selected) {

				draw();
			}


		}

	}
	canvas.onmousedown = function(e) {
		canvas.onmousemove(e);
		dragging = true;
	}
	var wb = false;

	function flicker(n) {
		canvas.style.background = (wb = !wb) ? "#888" : "white";
		if (n > 0) {
			setTimeout(function() {
				flicker(n - 1);
			}, 100);
		} else {
			canvas.style.background = "white";
		}

	}

	function interceptTest() {
		lines = [];
		lineNode(p);

		for (var u = 0; u < lines.length; u++) {

			for (var v = 0; v < lines.length; v++) {
				if (u != v) {
					/*
		U_x= ux1 + t*(ux2-ux1)
		U_y= uy1 + t*(uy2-uy1)		
		
		V_x= vx1 + s*(vx2-vx1)
		V_y= vy1 + s*(vy2-vy1)
		
		U_x = V_x
		U_y = V_y
		
		t*(ux2-ux1) + s*(vx1-vx2) = vx1 - ux1
		t*(uy2-uy1) + s*(vy1-vy2) = vy1 - uy1
		
		[ ux2-ux1  vx1-vx2 ]   [ t ]   [ vx1-ux1 ]
		[ uy2-uy1  vy1-vy2 ] x [ s ] = [ vy1-uy1 ]
		
		AB = C
		det A	= ad - bc
				= (ux2-ux1)*(vy1-vy2) - (vx1-vx2)*(uy2-uy1)
		
		B = A^-1 * A * B
                   [ vy1-vy2  vx2-vx1 ]   [ vx1-ux1 ]
		B = 1/detA [ uy1-uy2  ux2-ux1 ] x [ vy1-uy1 ]
		
		B = 1/detA [ (vy1-vy2)*(vx1-ux1) + (vx2-vx1)*(vy1-uy1) ]
		           [ (uy1-uy2)*(vx1-ux1) + (ux2-ux1)*(vy1-uy1) ]
		           
		t =  ((vy1-vy2)*(vx1-ux1) + (vx2-vx1)*(vy1-uy1))/((ux2-ux1)*(vy1-vy2) - (vx1-vx2)*(uy2-uy1))
		s =  ((uy1-uy2)*(vx1-ux1) + (ux2-ux1)*(vy1-uy1))/((ux2-ux1)*(vy1-vy2) - (vx1-vx2)*(uy2-uy1))
    
		//solve for t and s
		
		
		
		//solve for t, and make sure 0鈮鈮�and maybe make sure there's no division by zero

	*/
					var ux1 = lines[u].x1;
					var uy1 = lines[u].y1;
					var ux2 = lines[u].x2;
					var uy2 = lines[u].y2;

					var vx1 = lines[v].x1;
					var vy1 = lines[v].y1;
					var vx2 = lines[v].x2;
					var vy2 = lines[v].y2;


					var detA = (ux2 - ux1) * (vy1 - vy2) - (vx1 - vx2) * (uy2 - uy1);
					if (!(detA === 0.0)) {
						var t = ((vy1 - vy2) * (vx1 - ux1) + (vx2 - vx1) * (vy1 - uy1)) / detA;
						var s = ((uy1 - uy2) * (vx1 - ux1) + (ux2 - ux1) * (vy1 - uy1)) / detA;

						if (t > 0.001 && t < 0.999) { //the ends touch
							if (s > 0.001 && s < 0.999) {
								return true;
							}
						}
					}
				}
			}

		}
		return false;
	}

	function mup() {

		if (!ingame) {
			return;
		}
		dragging = false;
		countMove();
		if (!interceptTest()) {
			for (var i = 0; i < pt_c; i++) {
				vt[i] = {
					"x": 0.5,
					"y": 0.5
				};
			}
			win();
			draw(30);
			ingame = false;
		}
	}
	document.body.onmouseup = function(e) {
		mup();
	};
	var tdisp = document.getElementById("tdisp");
	timer.attachTimeListener(function(t) {
		var ts = t.toFixed(1);
		tdisp.childNodes[0].nodeValue = ts + " seconds";
	});

	timer.reset();



	function publishScore(service) {
		if (service == "twitter") {
			window.location = 'http://twitter.com/?status=' + encodeURIComponent((fastest === Infinity) ? "Untangle - HTML5 Game http://url3.tk/untangle/" : "My fastest time in UntangleJS: " + fastest + " s. Play it here: http://url3.tk/untangle/");
		} else if (service == "facebook") {
			window.location = 'http://www.facebook.com/sharer.php?u=http%3A%2F%2Furl3.tk%2Funtangle%2F&t=' + encodeURIComponent('Untangle HTML5 Game')


		} else {
			throw ("Error: Service Not Implemented.");
		}

	}


	function tmove(event) {
		event.preventDefault();
		var tk = event.changedTouches;
		canvas.onmousemove({
			"layerX": tk[0].pageX,
			"layerY": tk[0].pageY
		});
	}

	function tend(event) {
		dragging = false;
		mup();
		event.preventDefault();
	}

	function tstart(event) {
		event.preventDefault();
		dragging = true;
		var tk = event.changedTouches;
		for (var i = 0; i < tk.length; i++) {
			var touch = tk[i];
			mmx = touch.pageX;
			mmy = touch.pageY;
			canvas.onmousemove({
				"layerX": touch.pageX,
				"layerY": touch.pageY
			});
			return;
		}
	}

	function nodef(event) {
		event.preventDefault();
	}
	if (false) {
		document.body.addEventListener("touchstart", tstart, false);
		document.body.addEventListener("gesturechanged", nodef, false);
		document.body.addEventListener("touchend", tend, false);
		document.body.addEventListener("mousedown", nodef, false);
		document.body.addEventListener("mousemove", nodef, false);
		document.body.addEventListener("mouseup", nodef, false);
		document.body.addEventListener("touchmove", tmove, false);

	}

	return {
		"save": function() {
			save();
		},
		"toString": function() {
			return score.toString();
		},
		"score": function() {
			return score;
		},
		"fastest": function() {
			return fastest;
		},
		"newGame": function() {
			timer.reset();
		},
		"publishScore": function(service) {
			return publishScore(service);
		}
	};
})();