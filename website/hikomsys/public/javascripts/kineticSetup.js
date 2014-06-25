// Constants
var CONTAINER_WIDTH = document.getElementById('container').clientWidth;
var CONTAINER_HEIGHT = document.getElementById('container').clientHeight;
var PACKAGE_HEIGHT = 25;
var VERTICAL_VECTOR = {x: 0, y: -100};
var MAX_Y = CONTAINER_HEIGHT-PACKAGE_HEIGHT;
var MIN_X = 0;
var MIN_Y = 0;

// Variables. Alphabetically...not!
var highlightLayer = new Kinetic.Layer();
var arrowLayer = new Kinetic.Layer();
var packageLayer = new Kinetic.Layer();
var infoLayer = new Kinetic.Layer();
var altDown = false;
var arrows = [];

var background;

var clickCount = 0; // suspicious :) 

var drawingEnabled = false;

var layer = new Kinetic.Layer();

var notification;

var packages = [];

var stage;

var tmpArrow; //follows your mouse!

Kinetic.angleDeg = false;

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
	height: CONTAINER_HEIGHT
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
layer.add(notification);
stage.add(layer);
stage.add(highlightLayer);
stage.add(arrowLayer);
stage.add(packageLayer);
stage.add(infoLayer);

function writeMessage(message) {
	notification.setText(message);
}