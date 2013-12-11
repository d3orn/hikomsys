var arrowLayer = new Kinetic.Layer();
var tmpArrow;
var clickCount = 0;
var drawingEnabled = false;
var layer = new Kinetic.Layer();
var CONTAINER_WIDTH = document.getElementById('container').offsetWidth;
var HORIZONTAL_LINE = {x: 0, y: -100};
var arrows = [];
var PACKAGE_HEIGHT = 25;
var packages = [];
var group, moving = false;

var stage = new Kinetic.Stage({
    container: 'container',
	width: CONTAINER_WIDTH,
	height: 480
});

var background = new Kinetic.Rect({
	x: 0, 
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: 'white',
	stroke: 'black',
	strokeWidth: 5                                           
});

var notification = new Kinetic.Text({
	x: 10,
	y: 10,
	fontFamily: 'Calibri',
	fontSize: 24,
	text: '',
	fill: 'black'
});

layer.add(background);
layer.draw();
layer.add(notification);
stage.add(layer);
stage.add(arrowLayer);
stage.add(arrowLayer);

/*layer.on('dblclick', function(){
	writeMessage("Double click anywhere to switch to " + (drawingEnabled ? "drawing" : "moving") + " mode");
	clickCount = 0;
	document.getElementById('draw').value = (drawingEnabled ? "Activate drawing" : "Deactivate drawing");
	drawingEnabled = (drawingEnabled ? false : true);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
});*/

function getMousePosition(event) {
	var canvas = document.getElementById('container');
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

//rename!
function mouseDownOnPackage(packageGroup, event){
	clickCount++;
	if(clickCount == 1){
		packages.push(packageGroup);
		packages[0].find('.packageRect')[0].setFill('red');
	}
	arrowLayer.draw();
	layer.draw();
}
function mouseUpOnPackage(packageGroup, event) {
	clickCount++;
	if(clickCount == 2){
		packages.push(packageGroup);
		packages[0].find('.packageRect')[0].setFill('white');
		var arrow = new Arrow(packages[0],packages[1],packages[0].getId() + "_" + packages[1].getId());
		arrows.push(arrow);
		arrow.draw();

		packages = [];
		clickCount = 0;
	}
	arrowLayer.draw();
	layer.draw();
}

//refactoring HARD
function Arrow(from, to, id){
	this.from = from;
	this.to = to;
	this.id = id;
	this.center = function(packageGroup){
		var centerX = Math.round(packageGroup.getX() + packageGroup.getWidth()/2);
		var centerY = Math.round(packageGroup.getY() + PACKAGE_HEIGHT/2);
		return {x: centerX, y: centerY};
	}

	this.draw = function(){
		var fromCenter = this.center(from);
		var toCenter = (packages.length > 1 ? this.center(to) : to);
	
		var anchor1 = this.calcAnchor(fromCenter, toCenter, this.from.getWidth())
		var anchor2 = (packages.length > 1 ? this.calcAnchor(toCenter, fromCenter, this.to.getWidth()) : to);
 
		this.createArrow(anchor1, anchor2);
	};

	//Draws an arrow from @anchor1 to @anchor2 with an arrowHead at @anchor2
	this.createArrow = function(anchor1, anchor2){
		var vektor = {x: anchor1.x - anchor2.x, y: anchor1.y - anchor2.y };

		var line = this.createLine(anchor1, anchor2);

		var rotation = Math.acos((vektor.y * HORIZONTAL_LINE.y)/(Math.sqrt(Math.pow(vektor.x,2)+Math.pow(vektor.y,2))* Math.sqrt(Math.pow(HORIZONTAL_LINE.y,2))));
		//if the vektor points to the left I have to make the angle negative
		if (anchor1.x > anchor2.x){rotation = -rotation;}
		var norm = Math.sqrt(Math.pow(vektor.x,2) + Math.pow(vektor.y,2));
		var head = this.createHead({x: anchor2.x+(vektor.x*5/norm), y: anchor2.y+(vektor.y*5/norm)}, rotation);
	
		this.line = line;
		this.head = head;

		arrowLayer.add(this.line);
		arrowLayer.add(this.head);
	}

	this.createLine = function(point1, point2) {
		return new Kinetic.Line({
			points: [{x: point1.x, y: point1.y},{x: point2.x, y: point2.y}],
			stroke: 'black',
			strokeWidth: 2,
			name: 'arrowLine'
		});
	}

	this.createHead = function(point, rotation) {
		return (new Kinetic.RegularPolygon({
			x: point.x,
			y: point.y,
			sides: 3,
			radius: 5,
			stroke: 'black',
			strokeWidth: 2,
			fill: 'black',
			name: 'arrowHead',
			rotation: Math.PI-rotation
		}));
	}

	this.calcAnchor = function(from, to, width){
		return {x: (from.x + xOffset(from, to, width)), y: (from.y + yOffset(from, to, PACKAGE_HEIGHT))};
	}

	this.remove = function(){
		this.line.remove();
		this.head.remove();
	};
}

//some refactoring needed
function xOffset(center1, center2, center1_width) {
	if (isRightOf(center1, center2, center1_width)) {return center1_width/2;}
	if (isLeftOf(center1, center2, center1_width)) {return -center1_width/2;}
	return(0);
}

function yOffset(center1, center2, center1_height) {
	if (isBellow(center1, center2, center1_height)) {return center1_height/2;}
	if (isAbove(center1, center2, center1_height)) {return -center1_height/2;}
	return(0);
}

function isRightOf(center1, center2, center1_width) {
	return center2.x > (center1.x + center1_width/2);
}
function isLeftOf(center1, center2, center1_width) {
	return center2.x < (center1.x - center1_width/2);
}
function isAbove(center1, center2, center1_height) {
	return center2.y < (center1.y - center1_height/2);
}
function isBellow(center1, center2, center1_height) {
	return center2.y > (center1.y + center1_height/2);
}


function packageGroup(text) {
	var textField = packageText(text);
	var rect = packageRect(textField);

        minX = 0;
        minY = 0;
        maxY = stage.getHeight()-rect.getHeight();

	var group = new Kinetic.Group({
		width: rect.getWidth(),
		draggable: true,
		dragBoundFunc: function (pos) {
			maxX = stage.getWidth()-rect.getWidth();
			var X = pos.x;
			var Y = pos.y;
			if (X < minX) { X = minX; }
			if (X > maxX) { X = maxX; }
			if (Y < minY) { Y = minY; }
			if (Y > maxY) { Y = maxY; }
			return ({ x: X, y: Y });	
		},
		id: textField.getText(),
		name: 'packageGroup'	
	});
	group.add(rect);
	group.add(textField);

	//need to check if to packages are overlapping, would not be nice
	group.move(1+Math.floor(Math.random() * (CONTAINER_WIDTH-rect.getWidth())), 1 + Math.floor(Math.random()*(480-rect.getHeight())));

	layer.add(group);
	layer.draw();

	group.on('mousedown', function (event) {
		if(drawingEnabled){
			mouseDownOnPackage(this,event);
		}
	}, false);
	group.on('mouseup', function (event) {
		if(drawingEnabled){
			mouseUpOnPackage(this, event);}
	}, false);

	//redraw arrows whenever a package is dragged arround probably have to hook onto the layer draw event rather then dragstart
	group.on('dragstart dragmove', function(){
		for (var i = 0; i < arrows.length; i++){
			var packageIds = arrows[i].id.split("_");
			packages = [layer.find('#'+packageIds[0])[0], layer.find('#'+packageIds[1])[0]];
			if(packages[0].getId() == this.getId() || packages[1].getId() == this.getId()){
				arrows[i].remove();
				arrows[i].draw();
			}
		}
		arrowLayer.draw();
	});
}

function packageRect(text) {
	this.isHighlightened = false;
	this.highlight = null;
	var rect = new Kinetic.Rect({
		width: text.getWidth()+10,
		height: PACKAGE_HEIGHT,
		fill: 'white',
		stroke: 'black',
		name: 'packageRect'
	});
	return rect;
}


function packageText(pText) {
	var simpleText = new Kinetic.Text({
		x: 5,	
		y: 5,
		text: pText,
		fontSize: 15,
		fontFamily: 'Calibri',
		fill: 'black',
		align: 'center',
		name: 'packageText'
	});
	return simpleText;
}

function writeMessage(message) {
	notification.setText(message);
}
 
/* ============================================================ Eventhandler ============================================================ */

layer.on("mousedown", function (e) {
	if(clickCount === 0) return;
	if (moving) {
		moving = false;
		arrowLayer.drawScene();
	} else {
		var mousePos = getMousePosition(e);
		tmpArrow = new Arrow(packages[0], mousePos, "tmpArrow");
		tmpArrow.draw();
		moving = true;
	}
});

layer.on("mousemove", function (e) {
	if (moving) {
		tmpArrow.remove();
		var mousePos = getMousePosition(e);
		tmpArrow = new Arrow(packages[0], mousePos, "tmpArrow");
		tmpArrow.draw();

		moving = true;
		arrowLayer.drawScene();
	}
});

layer.on("mouseup", function (e) {
	moving = false;
	if(packages.length > 0){
		packages[0].find('.packageRect')[0].setFill('white');
		clickCount = 0;
		packages = [];
	}
	if(typeof tmpArrow !== "undefined") {tmpArrow.remove();} //remove only if there is one, if arrow exists dont let it be there twice or more check id
	layer.draw();
	arrowLayer.draw();
});

document.getElementById('draw').addEventListener('click', function(){
	this.value = (drawingEnabled ? "Activate drawing" : "Deactivate drawing");
	drawingEnabled = (drawingEnabled ? false : true);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
});

$(document).ready(function(){
    writeMessage("Double click anywhere to switch to drawing mode");
});
