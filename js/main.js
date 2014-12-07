var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");

const MAX_ITER = 1000;
const LIMIT_CIRCLE_DIAMETER = 4;
const IMG_WIDTH = canv.width;
const IMG_HEIGHT = canv.height;
const HALF_IMG_HEIGHT = canv.height / 2;
const HALF_IMG_WIDTH = canv.width / 2;


function putPixel(x, y, ctx, fillStyle){
	ctx.fillStyle = fillStyle;
	ctx.fillRect(x,y,1,1);
}

function getColourValue(x){
	var res = ((x + 256) & 0x1ff) - 256;
	if(res < 0)
		res *= -1;
	
	return res;
}

function drawMandelbrotFractal(){
	'use strict';
	var colours = [];
	var currColour;
	var red, green, blue;
	
	for(var i = 0; i < MAX_ITER; i++){
		red = getColourValue(i*7);
		green = getColourValue(i*5);
		blue = getColourValue(i*11);
		
		colours[i] = "rgb("+red+","+green+","+blue+")";
	}
	
	for(var row=0; row < IMG_HEIGHT; row++){
		for(var col=0; col < IMG_WIDTH; col++){
			currColour = getPixelColour(col, row, colours);
					
			putPixel(col, row, ctx, currColour);
		} 
	}
}

function getPixelColour(col, row, colours){
	'use strict';
	var currIteration = 0;
	var x = 0;
	var y = 0;
	var xNew;
	var cReal = (col - IMG_WIDTH/2)*4.0/IMG_WIDTH;
	var cImaginary = (row - IMG_HEIGHT/2)*4.0/IMG_WIDTH;
			
	while((x*x+y*y) < 4 && currIteration < MAX_ITER){
		xNew = (x*x - y*y) + cReal;
		y = 2*x*y + cImaginary;
		x = xNew;
				
		currIteration++;
	}
	
	if(currIteration < MAX_ITER)
		return colours[currIteration];
	else
		return "rgb(0,0,0)";		
}

drawMandelbrotFractal();