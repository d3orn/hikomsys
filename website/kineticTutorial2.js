// Constants
var CONTAINER_WIDTH = document.getElementById('container').clientWidth;
var CONTAINER_HEIGHT = document.getElementById('container').clientHeight;
var PACKAGE_HEIGHT = 25;
var VERTICAL_VECTOR = {x: 0, y: -100};
var MAX_Y = CONTAINER_HEIGHT-PACKAGE_HEIGHT;
var MIN_X = 0;
var MIN_Y = 0;

// Variables. Alphabetically...not!
var arrowLayer = new Kinetic.Layer();
var altDown = false;
var arrows = [];

var background;

var clickCount = 0; // suspicious :) 

var drawingEnabled = false;

var layer = new Kinetic.Layer();

var moving = false; 

var notification;

var packages = [];

var stage;

var tmpArrow; //follows your mousE!


var notification = new Kinetic.Text({
	x: 10,
	y: 460,
	fontFamily: 'Calibri',
	fontSize: 24,
	text: '',
	fill: 'black'
});

var stage = new Kinetic.Stage({
    container: 'container',
	width: CONTAINER_WIDTH,
	height: CONTAINER_HEIGHT,
});

var background = new Kinetic.Rect({
	x: 0, 
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: 'white',
	stroke: "red",
    strokeWidth: 1
});

layer.add(background);
layer.draw();
layer.add(notification);
stage.add(layer);
stage.add(arrowLayer);
layer.setZIndex(2);
arrowLayer.setZIndex(1);

function findArrowById(id){
	for (var i = 0; i < arrows.length; i++){
			if(arrows[i].id == id){return i}
	}
	return -1;
}

function findPackageById(id){
	for (var i = 0; i < allPackages.length; i++){
		if(allPackages[i].text === id){return allPackages[i];}
	}
	return -1;
}

function getMousePosition(event) {
	var canvas = document.getElementById('container');
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

//I have to check if mouseUp on same Package
function mouseDownOnPackage(packageGroup, event){
	clickCount++;
	var pack = findPackageById(packageGroup.getId());
	pack.highlightPackage("lightblue"); 
	if(clickCount == 1){
		packages.push(pack);
	}
}

function mouseUpOnPackage(packageGroup, event) {
	clickCount++;
	if(clickCount == 2){
		var firstPack = findPackageById(packages[0].text);
		var pack = findPackageById(packageGroup.getId());
		packages.push(pack);
		firstPack.highlight.remove();
		pack.highlight.remove();
		var id = packages[0].text + "_" + packages[1].text;
		if(findArrowById(id) === -1){
			var arrow = new Arrow(packages[0],packages[1],id);
			arrows.push(arrow);
			arrow.draw();
		}
		else {
			writeMessage("dependency allready drawn");
		}
		packages = [];
		clickCount = 0;

	}
	arrowLayer.draw();
	layer.draw();
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

function writeMessage(message) {
	notification.setText(message);
}

function switchMode(){
	if(packages.length > 0){
		packages[0].highlight.remove();
	}
	clickCount = 0;
	packages = [];

	drawingEnabled = !drawingEnabled;
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
}

/* ================================================================= Classes ================================================================= */

/* --------------------------------------------------------------- Arrow Class --------------------------------------------------------------- */
//refactoring HARD
function Arrow(from, to, id){
	this.from = from;
	this.to = to;
	this.id = id;
	this.center = function(packageGroup){
		var centerX = Math.round(packageGroup.group.getX() + packageGroup.group.getWidth()/2);
		var centerY = Math.round(packageGroup.group.getY() + PACKAGE_HEIGHT/2);
		return {x: centerX, y: centerY};
	};

	//Oman there is a big bug in here the packages.lenght has to be > 1 if i want to redraw the packages need to fix this
	this.draw = function(){
		var fromCenter = this.center(from);
		var toCenter = (packages.length > 1 ? this.center(to) : to);
	
		var anchor1 = this.calcAnchor(fromCenter, toCenter, this.from.group.getWidth());
		var anchor2 = (packages.length > 1 ? this.calcAnchor(toCenter, fromCenter, this.to.group.getWidth()) : to);

		this.createArrow(anchor1, anchor2);
	};

	//Draws an arrow from @anchor1 to @anchor2 with an arrowHead at @anchor2
	this.createArrow = function(anchor1, anchor2){
		var vektor = {x: anchor1.x - anchor2.x, y: anchor1.y - anchor2.y };

		var line = this.createLine(anchor1, anchor2);

		var rotation = Math.acos((vektor.y * VERTICAL_VECTOR.y)/(Math.sqrt(Math.pow(vektor.x,2)+Math.pow(vektor.y,2))* Math.sqrt(Math.pow(VERTICAL_VECTOR.y,2))));
		//if the vektor points to the left I have to make the angle negative
		if (anchor1.x > anchor2.x){rotation = -rotation;}
		var norm = Math.sqrt(Math.pow(vektor.x,2) + Math.pow(vektor.y,2));
		var head = this.createHead({x: anchor2.x+(vektor.x*5/norm), y: anchor2.y+(vektor.y*5/norm)}, rotation);
	
		this.line = line;
		this.head = head;
		this.arrowGroup = new Kinetic.Group({
			id: this.id
		});
		this.arrowGroup.add(this.line);
		this.arrowGroup.add(this.head);
		arrowLayer.add(this.arrowGroup);
		this.addEventListener();
	};

	this.createLine = function(point1, point2) {
		return new Kinetic.Line({
			points: [{x: point1.x, y: point1.y},{x: point2.x, y: point2.y}],
			stroke: 'black',
			strokeWidth: 2,
			name: 'arrowLine'
		});
	};

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
	};

	this.calcAnchor = function(from, to, width){
		return {x: (from.x + xOffset(from, to, width)), y: (from.y + yOffset(from, to, PACKAGE_HEIGHT))};
	};

	this.remove = function(){
		this.arrowGroup.remove();
	};

	this.deleteArrow = function(){
		this.arrowGroup.remove();
		delete this.from;
		delete this.to;
		delete this.id
	}

	this.addEventListener = function(){
		this.arrowGroup.on('click', function(){
			var index = findArrowById(this.getId());
			arrows[index].deleteArrow();
			arrows.remove(index); //prototype

			arrowLayer.draw();
		})
	}
}

/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text){
	this.text = text;
	this.isHighlightened = false;
	this.create = function(){
		this.createTextField();
		this.createContainer();
		this.createGroup();
		this.addEventListener();
	};

	this.createTextField = function() {
		this.textField = new Kinetic.Text({
			x: 5,
			y: 5,
			text: this.text,
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center',
			name: 'textField'
		});
	};

	this.createContainer = function(){
		this.rect = new Kinetic.Rect({
			width: this.textField.getWidth()+10,
			height: PACKAGE_HEIGHT,
			fill: 'white',
			stroke: 'black',
			name: 'packageRect'
		}); 
	};	

	this.createGroup = function(){
		var maxX = stage.getWidth()-this.rect.getWidth();
		this.group = new Kinetic.Group({
			width: this.rect.getWidth(),
			draggable: true,
			dragBoundFunc: function (pos) {
				var X = pos.x;
				var Y = pos.y;
				if (X < MIN_X) { X = MIN_X; }
				if (X > maxX) { X = maxX; }
				if (Y < MIN_Y) { Y = MIN_Y; }
				if (Y > MAX_Y) { Y = MAX_Y; }
				return ({ x: X, y: Y });	
			},
			id: this.textField.getText(),
			name: 'packageGroup'	
		});

		this.group.add(this.rect);
		this.group.add(this.textField);
		//need to check if to packages are overlapping, would not be nice
		this.group.move(1+Math.floor(Math.random() * (CONTAINER_WIDTH-this.rect.getWidth())), 1 + Math.floor(Math.random()*(480-this.rect.getHeight())));

		layer.add(this.group);
		this.group.moveToTop();
	};

	this.addEventListener = function(){
		this.group.on('mousedown', function (event) {
			if(drawingEnabled){
				mouseDownOnPackage(this,event);
			}
		}, false);
		this.group.on('mouseup', function (event) {
			if(drawingEnabled){
				mouseUpOnPackage(this, event);}
		}, false);

		//redraw arrows whenever a package is dragged arround probably have to hook onto the layer draw event rather then dragstart
		this.group.on('dragstart dragmove', function(){
			for (var i = 0; i < arrows.length; i++){
				var packageIds = arrows[i].id.split("_");
				//see the bug in Arrow.draw()
				packages = [layer.find('#'+packageIds[0])[0], layer.find('#'+packageIds[1])[0]];
				if(packages[0].getId() == this.getId() || packages[1].getId() == this.getId()){
					arrows[i].remove();
					arrows[i].draw();
				}
			}
			packages = [];
			arrowLayer.drawScene();
		});

		this.group.on('mouseenter', function(){
			if(drawingEnabled){
				var pack = findPackageById(this.getId());
				pack.highlightPackage("lightblue"); 
			}
		});

		this.group.on('mouseleave', function(){
			if(drawingEnabled){
				if(packages.length > 0 && this.getId() === packages[0].text){return;}
				var pack = findPackageById(this.getId());
				pack.highlight.remove(); 
				layer.draw();
			}
		});
	};

	this.highlightPackage = function(color){
		if(typeof this.highlight !== 'undefined'){this.highlight.remove();}
		var pos = this.rect.getAbsolutePosition();
		var x = pos.x-4;
		var y = pos.y-4;
		var width = this.rect.getWidth()+8;
		var height = this.rect.getHeight()+8;
		this.highlight = new Kinetic.Rect({
			width: width,
			height: height,
			fill: color,
			stroke: color,
			strokeWidth:2,
		});
		this.highlight.move(x,y);
		this.isHighlighted = true;
		layer.add(this.highlight);
		this.highlight.setZIndex(2);
		layer.draw();
	};	

}

/* =============================================================== Eventhandler ============================================================== */
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
	if(drawingEnabled && packages.length > 0){
		packages[0].highlight.remove();
		clickCount = 0;
		packages = [];
	}
	if(typeof tmpArrow !== "undefined") {tmpArrow.remove();} //remove only if there is one, if arrow exists dont let it be there twice or more check id
	layer.draw();
	arrowLayer.draw();
});


/* ------  Buttons ------*/
$('#draw').click(function(){
	clicked($('#move'));
	switchMode();
});

$('#move').click(function(){
	clicked($('#draw'));
	switchMode();
});

$('#help').click(function(){
	$('#help_container').toggle();
});

$('#submit').click(function(){
	alert("sure?");
});

$('.buttonlike').click(function(){
	var currentId = $(this).attr('id');
	clicked($(this));
});

function clicked(object){
	if(object.hasClass("gradientBG")){
		object.removeClass("gradientBG");
		object.addClass("activatedIcon");
	}
	else{
		object.removeClass("activatedIcon");
		object.addClass("gradientBG");
	}
}

//ALT key soll temporär mode wechseln
/*$(window).on("keydown", function(event) {
    if (event.which === 18) {
        switchMode();
    }
}).on("keyup", function(event) {
	switchMode();
});*/

$(document).ready(function(){
    //writeMessage("Double click anywhere to switch to drawing mode");
	for(var i = 0; i < allPackages.length; i++){
		allPackages[i].create();
	}	
	layer.draw();
});

/* =============================================================== Prototype Methods ============================================================== */
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


//REFACTORING NEEDED
//save initial scale
var initialScale = {x: 1, y: 1};
var initialWidth = $("#container").innerWidth(); // initial width
var initialHeight = $("#container").innerHeight(); // initial height

/*window.onresize = function(event) { // listen for change
  var width = $("#container").innerWidth(); // new width of page
    var height = $("#container").innerHeight(); // new height of page
   console.log(width);
    console.log(height);
    var xScale =  (width  / initialWidth) * initialScale.x;  // percent change in width (Ex: 1000 - 400/1000 means the page scaled down 60%, you should play with this to get wanted results)
    var yScale = (height / initialHeight) * initialScale.y;
    var newScale = {x: xScale, y: yScale};
        console.log(newScale);
    stage.setAttr('width', width);
    stage.setAttr('height', height);    
    stage.setAttr('scale', newScale ); 
    stage = new Kinetic.Stage({
    	container: 'container',
		width: width,
		height: height
	});
    stage.add(layer);
    stage.draw();
}*/

$(window).on('resize',function(){
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function(){
        $(this).trigger('resizeEnd');
    },500);
});


//after resizing the draboundfunction fails need to update MaxX for every element
$(window).on('resizeEnd orientationchange',function(){
    var width = $("#container").innerWidth(); // new width of page
    var height = $("#container").innerHeight(); // new height of page
    background.setWidth(width);
    background.setHeight(height);
    stage.setWidth(width);
    stage.setHeight(height);
    var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		//alert(groups[i].maxX);
	}
});

