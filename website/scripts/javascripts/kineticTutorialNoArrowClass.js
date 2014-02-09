var arrowLayer = new Kinetic.Layer();
var clickCount = 0;
var drawingEnabled = false;
var layer = new Kinetic.Layer();
var CONTAINER_WIDTH = document.getElementById('container').offsetWidth;
var HORIZONTAL_LINE = {x: 0, y: -100};

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

layer.on('dblclick', function(){
	writeMessage("Double click anywhere to switch to " + (drawingEnabled ? "drawing" : "moving") + " mode");
	clickCount = 0;
	document.getElementById('draw').value = (drawingEnabled ? "Activate drawing" : "Deactivate drawing");
	drawingEnabled = (drawingEnabled ? false : true);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
});

function getMousePosition(event) {
	var canvas = document.getElementById('container');
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

//rename!
function click(packageGroup, event) {
	clickCount++;
	if (clickCount == 1){packages = [];}
	packages.push(packageGroup);
	if(clickCount == 2){
		var arrow = drawArrow(packages);
		arrowLayer.add(arrow);
		arrowLayer.draw();
		clickCount = 0;
	}
}

document.getElementById('draw').addEventListener('click', function(){
	clickCount = 0;
	this.value = (drawingEnabled ? "Activate drawing" : "Deactivate drawing");
	drawingEnabled = (drawingEnabled ? false : true);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
});

function drawArrow(packages) {
	var package1 = packages[0].find('.packageRect')[0];
	var center_x = Math.round(packages[0].getX() + package1.getWidth()/2);
	var center_y = Math.round(packages[0].getY() + package1.getHeight()/2);
	var center1 = {x: center_x, y: center_y};
	var package2 = packages[1].find('.packageRect')[0];
	center_x = Math.round(packages[1].getX() + package2.getWidth()/2);
	center_y = Math.round(packages[1].getY() + package2.getHeight()/2);
	var center2 = {x: center_x, y: center_y};

	var anchor1 = {x: (center1.x + xOffset(center1, center2, package1.getWidth())), y: (center1.y + yOffset(center1, center2, package1.getHeight()))};
	var anchor2 = {x: (center2.x + xOffset(center2, center1, package2.getWidth())), y: (center2.y + yOffset(center2, center1, package2.getHeight()))};
 
	var this_vektor = {x: anchor1.x - anchor2.x, y: anchor1.y - anchor2.y };
	
	var rotation = Math.acos((this_vektor.y * HORIZONTAL_LINE.y)/(Math.sqrt(Math.pow(this_vektor.x,2)+Math.pow(this_vektor.y,2))* Math.sqrt(Math.pow(HORIZONTAL_LINE.y,2))));
	//if the vektor points to the left I have to make the angle negative
	if (anchor1.x > anchor2.x){rotation = -rotation;}
	
	var line = new Kinetic.Line({
		points: [{x: anchor1.x, y: anchor1.y},{x: anchor2.x, y: anchor2.y}],
		stroke: 'black',
		strokeWidth: 2,
		name: 'arrowLine'
	});
	var norm = Math.sqrt(Math.pow(this_vektor.x,2) + Math.pow(this_vektor.y,2));
	var head = arrowHead({x: anchor2.x+(this_vektor.x*5/norm), y: anchor2.y+(this_vektor.y*5/norm)}, rotation);
	arrow = new Kinetic.Group({
		id: packages[0].getId() + "_" + packages[1].getId(),
		name: 'arrow'
	});
	arrow.add(line);
	arrow.add(head);
	return arrow;
}

function arrowHead(point, rotation) {
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

//some refactoring needed
function xOffset(center1, center2, center1_width) {
	return((isRightOf(center1, center2, center1_width)+isLeftOf(center1, center2, center1_width)));
}

function yOffset(center1, center2, center1_height) {
	return((isBellow(center1, center2, center1_height)+isAbove(center1, center2, center1_height)));
}

function isRightOf(center1, center2, center1_width) {
	return(center2.x > (center1.x + center1_width) ? (center1_width/2) : 0);
}
function isLeftOf(center1, center2, center1_width) {
	return(center2.x < (center1.x - center1_width) ? (-center1_width/2) : 0);
}
function isAbove(center1, center2, center1_height) {
	return(center2.y < (center1.y - center1_height) ? (-center1_height/2) : 0);
}
function isBellow(center1, center2, center1_height) {
	return(center2.y > (center1.y + center1_height) ? (center1_height/2) : 0);
}


function packageGroup(text) {
	var textField = packageText(text);
	var rect = packageRect(textField);

        //those values should be computed and not hardwired xD
        minX = 0;
        minY = 0;
        maxY = stage.getHeight()-rect.getHeight();

	var group = new Kinetic.Group({
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
	
	group.on('click', function (event) {
                //alert(this.attrs.id);
		if(drawingEnabled){click(this, event);}
        }, false);

	//redraw arrows whenever a package is dragged arround probably have to hook onto the layer draw event rather then dragstart
	group.on('dragstart dragmove', function(){
		arrows = arrowLayer.find('.arrow');
		for (var i = 0; i < arrows.length; i++){
			var packageIds = arrows[i].getId().split("_");
			packages = [layer.find('#'+packageIds[0])[0], layer.find('#'+packageIds[1])[0]]
			if(packages[0].getId() == this.getId() || packages[1].getId() == this.getId()){
				var from = layer.find('#'+packages[0])[0];
				var to = layer.find('#'+packages[1])[0];
				arrows[i].remove();
				/*
				var line = arrows[i].find('.arrowLine')[0];
				line.setX(100);
				line.setY(100);
				var head = arrows[i].find('.arrowHead');
				head.rotate(0.5);
				*/
				var arrow = drawArrow(packages);
				arrowLayer.add(arrow);
				arrowLayer.draw();
			}
		}
	});	

	layer.add(group);
	layer.draw();
}

function packageRect(text) {
	var rect = new Kinetic.Rect({
		width: text.getWidth()+10,
		height: 25,
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
        layer.draw();
 }
