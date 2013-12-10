var drawingEnabled = false;
var container_width = document.getElementById('container').offsetWidth;
var layer = new Kinetic.Layer();

var stage = new Kinetic.Stage({
	container: 'container',
	width: container_width,
	height: 480
});

var background = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: 'white',
	stroke: 'black',
	strokeWidth: 5,
});

layer.add(background);
layer.draw();
stage.add(layer);

window.onload=function(){
	kineticTutorial();
}

function kineticTutorial(){
	
	var drawing = false;
	var newline;
	var points = [];
	
	var canvas = document.getElementById('container');

	canvas.addEventListener('mousedown', function (event) {
		onMouseDown(this, event)
	}, false);

	canvas.addEventListener('mouseup', function (event) {
		onMouseUp(this, event)
	}, false);

	canvas.addEventListener('mousemove', function (event) {
		onMouseMove(this, event)
	}, false);

function getMousePosition(canvas, event){
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

function onMouseDown(canvas, event){
	if(drawingEnabled){
		drawing = true;
		points = [];
		var pos = getMousePosition(canvas, event);
		
		points.push(pos);
		var line = new Kinetic.Line({
			points: points,
			stroke: 'red',
			strokeWidth: 5,
		});
		layer.add(line);
		newline = line; 
	}
}

function onMouseUp(canvas, event){
	if(drawingEnabled){drawing = false;}
}

function onMouseMove(canvas, event){
	if(drawingEnabled){
		if(!drawing){ return;}
		var pos = getMousePosition(canvas, event);
		points.push(pos);
		newline.setPoints(points);
		layer.drawScene();
	}
}

};

document.getElementById('draw').addEventListener('click', function(){
	this.value = (drawingEnabled ? "Activate drawing" : "Deactivate drawing");
	drawingEnabled = (drawingEnabled ? false : true);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled )
	}
});


function packageGroup(text){
	var textField = packageText(text);
	var rect = packageRect(textField);

        //those values should be computed and not hardwired xD
        minX = 0;
        minY = 0;
        maxY = 480-rect.getHeight();

	var group = new Kinetic.Group({
		draggable: true,
		dragBoundFunc: function (pos) {
			maxX = container_width-rect.getWidth();
			var X = pos.x;
			var Y = pos.y;
			if (X < minX) { X = minX; }
			if (X > maxX) { X = maxX; }
			if (Y < minY) { Y = minY; }
			if (Y > maxY) { Y = maxY; }
			return ({ x: X, y: Y });	
		},
		id: textField.getText(),
		name: 'package'	
	});
	group.add(rect);
	group.add(textField);
	group.move(1+Math.floor(Math.random() * (container_width-rect.getWidth())), 1 + Math.floor(Math.random()*(480-rect.getHeight())));
	layer.add(group);
	layer.draw();
}

function packageRect(text){
	var rect = new Kinetic.Rect({
		width: text.getWidth()+10,
		height: 25,
		fill: 'white',
		stroke: 'black'
	});
	return rect;
};


function packageText(pText){
	var simpleText = new Kinetic.Text({
      		x: 5,	
		y: 5,
		text: pText,
      		fontSize: 15,
      		fontFamily: 'Calibri',
      		fill: 'black',
		align: 'center'
	});
	return simpleText;
};
